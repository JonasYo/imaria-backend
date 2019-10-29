/* eslint-disable camelcase */
import Schedules from '../models/Schedules';
import User from '../models/User';
import Mail from '../../lib/Mail';

class ScheduleController {
  async create(req, res) {
    const { user_id } = req.params;
    const { hour_id, service_id, date_start, date_end } = req.body;

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
      date_start,
      date_end,
    });

    Mail.sendMail({
      from: '"Imaria Design" <noreply@imariasobrancelhas.com>',
      to: `kobig10775@7dmail.com`,
      subject: 'Confirmação de agendamento',
      template: 'scheduling',
      defaultLayout: 'scheduling',
      context: {
        user: `${user.name}`,
        location: 'Curitiba',
        hour: `${date_start}`,
        professional: 'Maria Ruth',
      },
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

    const response = {};

    response.scheduled = await Schedules.findAll({
      where: {
        user_id,
        active: 1,
        realized: 0,
      },
      include: { association: 'services' },
    });

    response.finished = await Schedules.findAll({
      where: {
        user_id,
        active: 1,
        realized: 1,
      },
      include: { association: 'services' },
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

    const { id, name } = await Schedules.findByPk(req.ScheduleId);

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new ScheduleController();
