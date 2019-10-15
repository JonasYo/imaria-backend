import User from '../models/User';

class UserController {
  async create(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({
        message: 'Usuário com este email já está cadastrado.',
        code: 'ERROR_BAD_REQUEST',
      });
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const { name: oldName, email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (!email || !oldName || oldPassword) {
      return res.status(400).json({
        message:
          'Você não pode deixar os campos de nome, email ou senha antiga vazios.',
        code: 'ERROR_BAD_REQUEST',
      });
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({
        message: 'A senha sua senha antiga parece estar incorreta.',
        code: 'ERROR_BAD_REQUEST',
      });
    }

    await user.update(req.body);

    const { id, name, avatar } = await User.findByPk(req.userId);

    return res.json({
      id,
      name,
      email,
      avatar,
    });
  }
}

export default new UserController();
