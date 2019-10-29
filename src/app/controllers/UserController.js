/* eslint-disable camelcase */
import User from '../models/User';
import UserRole from '../models/UserRole';

import Mail from '../../lib/Mail';

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

    const userRole = await UserRole.create({
      user_id: id,
      role_id: req.body.role_id,
    });

    if (!userRole) {
      return res.status(400).json({
        message: 'Erro ao definir o perfil para este usuário.',
        code: 'ERROR_BAD_REQUEST',
      });
    }

    Mail.sendMail({
      from: '"Imaria Design" <noreply@imariasobrancelhas.com>',
      to: `${email}`,
      subject: 'Seja Bem-vindo',
      template: 'subscription',
      context: {
        user: `${name}`,
      },
    });

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const { flag } = req.params;
    const user = await User.findByPk(req.userId);

    if (flag === 'userPassword') {
      const { oldPassword, password } = req.body;

      if (!oldPassword || !password) {
        return res.status(400).json({
          message:
            'Você não pode deixar os campos de Senha atual, Nova senha e Confirma nova senha vazios.',
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
    } else if (flag === 'userInfomation') {
      const { name, phone, date_birth } = req.body;

      if (!name || !phone || !date_birth) {
        return res.status(400).json({
          message:
            'Você não pode deixar os campos de nome, telefone ou data de nascimento vazios.',
          code: 'ERROR_BAD_REQUEST',
        });
      }

      await user.update(req.body);
    } else {
      return res.status(400).json({
        message: 'Houve um erro ao processar flag informada',
        code: 'ERROR_BAD_REQUEST',
      });
    }

    const { id, name, email, date_birth, phone } = await User.findByPk(
      req.userId
    );

    return res.json({
      id,
      name,
      email,
      date_birth,
      phone,
    });
  }
}

export default new UserController();
