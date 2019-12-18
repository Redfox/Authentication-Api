import { Router } from 'express';

const routes = new Router();

routes.post('/signup', (req, res) => {
  return res.json({ ok: 'ok' });
});

routes.get('/', (req, res) => {
  res.json({ mensagem: 'hello world' });
});

export default routes;
