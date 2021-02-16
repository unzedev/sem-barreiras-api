import { Router } from 'express';
import multer from 'multer';

import UploadConfig from '@config/UploadConfig';
import Authenticated from '@shared/infra/http/middlewares/AuthenticatedMiddleware';

import EstablishmentsController from '../controllers/EstablishmentsController';
import EstablishmentPictureController from '../controllers/EstablishmentPicController';
import EstablishmentValidations from '../middlewares/EstablishmentValidations';

const establishmentsRoute = Router();

const establishmentsController = new EstablishmentsController();
const establishmentPictureController = new EstablishmentPictureController();
const establishmentValidations = new EstablishmentValidations();

const upload = multer(UploadConfig.multer);

establishmentsRoute.get('/:id', establishmentsController.get);

establishmentsRoute.use(Authenticated);

establishmentsRoute.post(
  '/',
  establishmentValidations.post(),
  establishmentsController.create,
);

establishmentsRoute.patch(
  '/:id/picture',
  upload.single('picture'),
  establishmentPictureController.update,
);

export default establishmentsRoute;
