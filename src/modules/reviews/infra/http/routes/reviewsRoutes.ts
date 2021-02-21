import { Router } from 'express';

import Authenticated from '@shared/infra/http/middlewares/AuthenticatedMiddleware';
import ReviewsController from '../controllers/ReviewsController';
import ReviewsApprovalController from '../controllers/ReviewApprovalController';
import ReviewValidations from '../middlewares/ReviewValidations';

const reviewsRoute = Router();

const reviewsController = new ReviewsController();
const reviewsApprovalController = new ReviewsApprovalController();
const reviewValidations = new ReviewValidations();

reviewsRoute.get('/', reviewValidations.list(), reviewsController.index);

reviewsRoute.get('/:id', reviewsController.get);

reviewsRoute.use(Authenticated);

reviewsRoute.post('/', reviewValidations.post(), reviewsController.create);

reviewsRoute.post('/:id/approval', reviewsApprovalController.post);

reviewsRoute.delete('/:id', reviewsController.delete);

export default reviewsRoute;
