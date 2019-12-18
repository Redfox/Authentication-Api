import User from '../models/User';

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

    return res.status(200).json(user);
  }
}

export default new UserController();
