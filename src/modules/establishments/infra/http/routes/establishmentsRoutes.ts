import { Router } from 'express';

import Authenticated from '@shared/infra/http/middlewares/AuthenticatedMiddleware';
import EstablishmentsController from '../controllers/EstablishmentsController';
import EstablishmentValidations from '../middlewares/EstablishmentValidations';

const establishmentsRoute = Router();

const establishmentsController = new EstablishmentsController();
const establishmentValidations = new EstablishmentValidations();

establishmentsRoute.get('/:id', establishmentsController.get);

establishmentsRoute.use(Authenticated);

establishmentsRoute.post(
  '/',
  establishmentValidations.post(),
  establishmentsController.create,
);

export default establishmentsRoute;
