import { Router } from 'express';

// import authenticatedMiddleware from '../middlewares/AuthenticatedMiddleware';

import usersRoutes from '@modules/users/infra/http/routes/usersRoutes';

const routes = Router();

routes.use('/users', usersRoutes);

export default routes;
