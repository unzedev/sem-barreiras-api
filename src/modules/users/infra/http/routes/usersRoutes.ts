import { Router } from 'express';

import Authenticated from '@shared/infra/http/middlewares/AuthenticatedMiddleware';
import UserValidations from '../middlewares/UserValidations';
import UsersController from '../controllers/UsersController';
import UserSessionController from '../controllers/UserSessionController';
import UserSessionValidations from '../middlewares/UserSessionValidations';

const usersRoute = Router();

const usersController = new UsersController();
const userSessionController = new UserSessionController();

const userValidations = new UserValidations();
const userSessionValidation = new UserSessionValidations();

usersRoute.post('/', userValidations.post(), usersController.create);

usersRoute.post(
  '/login',
  userSessionValidation.post(),
  userSessionController.create,
);

usersRoute.use(Authenticated);

usersRoute.get('/me', usersController.get);

export default usersRoute;
