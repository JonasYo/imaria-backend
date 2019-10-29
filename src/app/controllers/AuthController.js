import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

import User from '../models/User';

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

    // eslint-disable-next-line camelcase
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

    const password = Math.random()
      .toString(36)
      .substring(7);
    console.log('random', password);

    // User.update(password);

    return res.json({
      a: {
        a: 'a',
      },
    });
  }
}

export default new AuthController();
