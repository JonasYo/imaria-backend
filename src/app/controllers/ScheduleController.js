import Schedules from '../models/Schedules';
import User from '../models/User';

class ScheduleController {
  async create(req, res) {
    // eslint-disable-next-line camelcase
    const { user_id } = req.params;
    // eslint-disable-next-line camelcase
    const { hour_id, service_id, date } = req.body;
    console.log(date);
    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({
        message: 'Usuario não encontrado',
        code: 'ERROR_BAD_REQUEST',
      });
    }

    const response = await Schedules.create({
      hour_id,
      service_id,
      user_id,
      date,
    });

    return res.json(response);
  }

  async listSchedule(req, res) {
    // eslint-disable-next-line camelcase
    const { user_id } = req.params;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({
        message: 'Usuario não encontrado',
        code: 'ERROR_BAD_REQUEST',
      });
    }

    const response = await Schedules.findAll({
      where: {
        user_id,
      },
    });

    return res.json(response);
  }

  async update(req, res) {
    const { name: oldName, email, oldPassword } = req.body;

    await Schedules.findByPk(req.ScheduleId);

    if (!email || !oldName || oldPassword) {
      return res.status(400).json({
        message:
          'Você não pode deixar os campos de nome, email ou senha antiga vazios.',
        code: 'ERROR_BAD_REQUEST',
      });
    }

    if (oldPassword && !(await Schedules.checkPassword(oldPassword))) {
      return res.status(401).json({
        message: 'A senha sua senha antiga parece estar incorreta.',
        code: 'ERROR_BAD_REQUEST',
      });
    }

    await Schedules.update(req.body);

    const { id, name, avatar } = await Schedules.findByPk(req.ScheduleId);

    return res.json({
      id,
      name,
      email,
      avatar,
    });
  }
}

export default new ScheduleController();
