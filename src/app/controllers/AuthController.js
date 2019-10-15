import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

import User from '../models/User';

class SessionController {
  async singin(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        message: `Usuário com email ${email} não foi encontrado.`,
        code: 'ERROR_USER_NOT_FOUND',
      });
    }

    try {
      const passwordMatch = await user.checkPassword(password);
      if (!passwordMatch) {
        return res.status(401).json({
          message: 'Senha incorreta, tente novamente.',
          code: 'ERROR_UNATHORIZED',
        });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    const { id, name, avatar } = user;
    const { expiresIn, secret } = authConfig;

    return res.json({
      user: {
        id,
        name,
        email,
        avatar,
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

export default new SessionController();
