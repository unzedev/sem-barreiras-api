import { Router } from 'express';

// import authenticatedMiddleware from '../middlewares/AuthenticatedMiddleware';

import usersRoutes from '@modules/users/infra/http/routes/usersRoutes';
import establishmentsRoutes from '@modules/establishments/infra/http/routes/establishmentsRoutes';
import reviewsRoutes from '@modules/reviews/infra/http/routes/reviewsRoutes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/establishments', establishmentsRoutes);
routes.use('/reviews', reviewsRoutes);

export default routes;
