import { Router } from 'express';

import UserController from './controllers/UserController';

const routes = new Router();

routes.post('/signup', UserController.store);

routes.get('/', (req, res) => {
  res.json({ mensagem: 'hello world' });
});

export default routes;
