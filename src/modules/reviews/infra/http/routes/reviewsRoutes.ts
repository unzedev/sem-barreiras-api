import { Router } from 'express';

import Authenticated from '@shared/infra/http/middlewares/AuthenticatedMiddleware';
import ReviewsController from '../controllers/ReviewsController';
import ReviewValidations from '../middlewares/ReviewValidations';

const reviewsRoute = Router();

const reviewsController = new ReviewsController();
const reviewValidations = new ReviewValidations();

reviewsRoute.get('/:id', reviewsController.get);

reviewsRoute.use(Authenticated);

reviewsRoute.post('/', reviewValidations.post(), reviewsController.create);

export default reviewsRoute;
