import jwt from 'jsonwebtoken';
import User from '../models/User';
import jwtConfig from '../../config/jwt';

class UserController {
  async store(req, res) {
    const { nome, email, senha, telefones } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ mensagem: 'E-mail já existente' });
    }

    const user = await User.create({
      nome,
      email,
      senha,
      telefones,
      ultimo_login: Date.now(),
    });

    // eslint-disable-next-line no-underscore-dangle
    const token = jwt.sign({ id: user._id }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });

    return res.status(200).json(user.sanitize(token));
  }
}

export default new UserController();
