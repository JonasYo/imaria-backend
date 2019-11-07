/* eslint-disable camelcase */
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';
import Mail from '../../lib/Mail';

import User from '../models/User';

import Tokens from '../models/Tokens';
import UserController from './UserController';

class AuthController {
  async singin(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: { association: 'userRoles' },
    });

    if (!user) {
      return res.status(401).json({
        message: `Usuário com email ${email} não foi encontrado.`,
        code: 'ERROR_USER_NOT_FOUND',
      });
    }

    const passwordMatch = await user.checkPassword(password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: 'Senha incorreta, tente novamente.',
        code: 'ERROR_UNATHORIZED',
      });
    }

    const { id, name, phone, date_birth, createdAt, userRoles } = user;

    const { expiresIn, secret } = authConfig;

    return res.json({
      user: {
        id,
        name,
        email,
        phone,
        date_birth,
        createdAt,
        userRoles,
      },
      token: jwt.sign({ id }, secret, {
        expiresIn,
      }),
    });
  }

  async singinAlternative(req, res) {
    const user = await UserController.createAlternative(req);

    if (!user) {
      return res.status(401).json({
        message: `Não foi possivel realizar o login com ${req.body.alias}.`,
        code: 'ERROR_LOGIN_ALIAS',
      });
    }

    const { id, name, email, phone, date_birth, createdAt, userRoles } = user;

    const { expiresIn, secret } = authConfig;

    return res.json({
      user: {
        id,
        name,
        email,
        phone,
        date_birth,
        createdAt,
        userRoles,
      },
      token: jwt.sign({ id }, secret, {
        expiresIn,
      }),
    });
  }

  async forgot(req, res) {
    const { email } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        message: `Usuário com email ${email} não foi encontrado.`,
        code: 'ERROR_USER_NOT_FOUND',
      });
    }

    const { id } = user;

    await Tokens.update(
      {
        is_revoked: 1,
      },
      {
        where: {
          user_id: user.id,
          is_revoked: 0,
        },
      }
    );

    const token = Math.random()
      .toString(36)
      .substring(4);

    await Tokens.create({
      user_id: id,
      token,
      type: 'forgotPassword',
    });

    Mail.sendMail({
      from: '"Imaria Design" <noreply@imariasobrancelhas.com>',
      to: `${email}`,
      subject: `I'maria - Recuperação de senha`,
      template: 'forgotPassword',
      context: {
        user: `${user.name}`,
        token: `${token}`,
      },
      attachments: [
        {
          filename: 'image.png',
          path: `${process.cwd()}/src/resources/images/logo.png`,
          cid: 'logo',
        },
      ],
    });

    return res.json('Sucesso no envio do token');
  }

  async reset(req, res) {
    const { token, password, confirmPassword } = req.body;

    const tokens = await Tokens.findOne({
      where: {
        token,
      },
    });

    if (!tokens) {
      return res.status(401).json({
        message: `Token informado é inválido.`,
        code: 'ERROR_TOKEN_NOT_FOUND',
      });
    }

    const currentDate = new Date();
    const tokenDate = new Date(tokens.createdAt);
    const result = currentDate - tokenDate;
    const diffHrs = Math.floor((result % 86400000) / 3600000);

    if (diffHrs > 1) {
      return res.status(401).json({
        message: `Token expirado, tente novamente.`,
        code: 'ERROR_PASSWORDS_NOT_EQUALS',
      });
    }

    if (password !== confirmPassword) {
      return res.status(401).json({
        message: `As senhas não são iguais.`,
        code: 'ERROR_PASSWORDS_NOT_EQUALS',
      });
    }

    const user = await User.findByPk(tokens.user_id);

    user.password = password;

    user.save();

    return res.json('Recuperação de senha realizado com sucesso.');
  }
}

export default new AuthController();
