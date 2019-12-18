import jwt from 'jsonwebtoken';
import User from '../models/User';
import jwtConfig from '../../config/jwt';
import SignUpSchema from '../../validators/signup';

class UserController {
  async show(req, res) {
    const { userId: _id } = req;

    const user = await User.findById({ _id });

    return res.json(user.sanitize());
  }

  async store(req, res) {
    try {
      await SignUpSchema.validate(req.body);
    } catch (error) {
      return res.status(400).json({ mensagem: error.message });
    }

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
