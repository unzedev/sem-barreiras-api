import 'reflect-metadata';
import 'express-async-errors';
import 'dotenv/config';
import cors from 'cors';

import express, { Request, Response, NextFunction } from 'express';
import { errors } from 'celebrate';

import AppError from '@shared/errors/AppError';
import routes from '@shared/infra/http/routes';
import '@shared/infra/mongoose';
import '@shared/container';
import UploadConfig from '@config/UploadConfig';

const app = express();
const normalizeOrigin = (value: string): string => {
  const origin = value.trim();

  if (!origin) {
    return '';
  }

  try {
    return new URL(origin).origin;
  } catch {
    return origin.replace(/\/+$/, '');
  }
};

const allowedOrigins = (process.env.APP_URI || '')
  .split(',')
  .map(normalizeOrigin)
  .filter(Boolean);

console.log(
  `[BOOT] APP_URI raw="${process.env.APP_URI || ''}" allowedOrigins=${JSON.stringify(
    allowedOrigins,
  )}`,
);

app.use((request: Request, _response: Response, next: NextFunction) => {
  console.log(
    `[HTTP] ${request.method} ${request.originalUrl} origin="${
      request.headers.origin || ''
    }" userAgent="${request.headers['user-agent'] || ''}"`,
  );
  return next();
});

app.use(
  cors({
    origin: (
      origin: string | undefined,
      callback: (error: Error | null, allow?: boolean) => void,
    ) => {
      if (!origin) {
        console.log('[CORS] allow request without origin header');
        return callback(null, true);
      }

      const normalizedOrigin = normalizeOrigin(origin);

      if (allowedOrigins.includes(normalizedOrigin)) {
        console.log(`[CORS] allow origin="${origin}" normalized="${normalizedOrigin}"`);
        return callback(null, true);
      }

      console.log(
        `[CORS] reject origin="${origin}" normalized="${normalizedOrigin}" allowedOrigins=${JSON.stringify(
          allowedOrigins,
        )}`,
      );
      return callback(new Error('Origin not allowed by CORS'));
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use('/files', express.static(UploadConfig.uploadsFolder));
app.use(routes);
app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    console.log(
      `[ERROR] ${request.method} ${request.originalUrl} origin="${
        request.headers.origin || ''
      }" message="${error.message}"`,
    );

    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    console.log(error);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on PORT ${process.env.PORT}`);
});
