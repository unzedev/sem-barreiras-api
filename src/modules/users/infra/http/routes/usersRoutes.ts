import { Router } from 'express';

import Authenticated from '@shared/infra/http/middlewares/AuthenticatedMiddleware';
import UserValidations from '../middlewares/UserValidations';
import UsersController from '../controllers/UsersController';
import UserSessionController from '../controllers/UserSessionController';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';
import UserSessionValidations from '../middlewares/UserSessionValidations';
import ForgotPasswordValidations from '../middlewares/ForgotPasswordValidations';
import ResetPasswordValidations from '../middlewares/ResetPasswordValidations';

const usersRoute = Router();

const usersController = new UsersController();
const userSessionController = new UserSessionController();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

const userValidations = new UserValidations();
const userSessionValidation = new UserSessionValidations();
const forgotPasswordValidation = new ForgotPasswordValidations();
const resetPasswordValidation = new ResetPasswordValidations();

usersRoute.post('/', userValidations.post(), usersController.create);

usersRoute.post(
  '/login',
  userSessionValidation.post(),
  userSessionController.create,
);

usersRoute.post(
  '/password/forgot',
  forgotPasswordValidation.post(),
  forgotPasswordController.create,
);

usersRoute.post(
  '/password/reset',
  resetPasswordValidation.post(),
  resetPasswordController.create,
);

usersRoute.use(Authenticated);

usersRoute.get('/me', usersController.get);

export default usersRoute;
