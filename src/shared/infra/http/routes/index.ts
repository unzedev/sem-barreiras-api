import { Router } from 'express';

import authenticatedMiddleware from '../middlewares/AuthenticatedMiddleware';

const routes = Router();

routes.use('/', (req, res) => res.json({ message: 'Hello World' }));
routes.use(authenticatedMiddleware);

export default routes;
