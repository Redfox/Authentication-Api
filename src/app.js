import './config/envfile';
import 'dotenv/config';

import express from 'express';
import Youch from 'youch';
import 'express-async-errors';
import routes from './routes';

import './config/database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json({ mensagem: errors });
      }

      return res
        .status(500)
        .json({ mensagem: 'Ocorreu um erro, tente novamente mais tarde.' });
    });
  }
}

export default new App().server;
