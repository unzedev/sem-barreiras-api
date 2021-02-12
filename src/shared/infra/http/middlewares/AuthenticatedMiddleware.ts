import { Request, Response, NextFunction } from 'express';
import { TokenExpiredError, verify } from 'jsonwebtoken';

import authConfig from '@config/AuthConfig';

import AppError from '@shared/errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function AuthMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError('JWT token is missing', 401);
    }

    const [, token] = authHeader.split(' ');

    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    request.clientId = sub;

    return next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new AppError('Token expired', 401);
    }

    throw new AppError('Authentication failed', 401);
  }
}
