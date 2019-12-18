import jwt from 'jsonwebtoken';
import User from '../models/User';
import jwtConfig from '../../config/jwt';

class AuthController {
  async store(req, res) {
    const { email, senha } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await user.checkPassword(senha))) {
      return res.status(401).json({ mensagem: 'Usuário e/ou senha inválidos' });
    }

    const { _id: id } = user;

    const token = jwt.sign({ id }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });

    await User.updateOne({ _id: id }, { $set: { ultimo_login: Date.now() } });

    return res.status(200).json(user.sanitize(token));
  }
}

export default new AuthController();
