import { Router } from 'express';

import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';

const routes = new Router();

routes.post('/signup', UserController.store);

routes.post('/signin', AuthController.store);

routes.get('/', (req, res) => {
  res.json({ mensagem: 'hello world' });
});

export default routes;
