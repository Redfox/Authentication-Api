import { Router } from 'express';

import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/signup', UserController.store);
routes.post('/signin', AuthController.store);

routes.use(authMiddleware);

routes.get('/user', UserController.show);

export default routes;
