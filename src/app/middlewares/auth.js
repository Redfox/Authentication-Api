import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import jwtConfig from '../../config/jwt';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ mensagem: 'Token não informado' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = promisify(jwt.verify)(token, jwtConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ mensagem: 'Sessão inválid' });
  }
};
