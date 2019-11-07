/* eslint-disable camelcase */
import { Sequelize } from 'sequelize';

import Schedules from '../models/Schedules';
import User from '../models/User';
import Mail from '../../lib/Mail';

const { Op } = Sequelize;

class ScheduleController {
  async create(req, res) {
    const { user_id } = req.params;
    const { hour_id, service_id, date_start, date_end } = req.body;

    const startDate = new Date(date_start);
    const endDate = new Date(date_start);

    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setMilliseconds(59);

    endDate.setHours(23);
    endDate.setMinutes(59);
    endDate.setMilliseconds(59);

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({
        message: 'Usuario não encontrado',
        code: 'ERROR_BAD_REQUEST',
      });
    }

    const scheduling = await Schedules.findAll({
      where: {
        service_id,
        user_id,
        date_start: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    if (scheduling.length > 0) {
      return res.status(400).json({
        message:
          'Parece que você já possui um agendamento para esse serviço na data escolhida.',
        code: 'ERROR_BAD_REQUEST',
      });
    }

    const schedules = await Schedules.create({
      hour_id,
      service_id,
      user_id,
      date_start,
      date_end,
    });

    Mail.sendMail({
      from: '"Imaria Design" <noreply@imariasobrancelhas.com>',
      to: `kobig10775@7dmail.com`,
      subject: `I'maria - Confirmação de agendamento`,
      template: 'scheduling',
      defaultLayout: 'scheduling',
      context: {
        user: `${user.name}`,
        location: 'Curitiba',
        hour: `${date_start}`,
        professional: 'Maria Ruth',
      },
      attachments: [
        {
          filename: 'image.png',
          path: `${process.cwd()}/src/resources/images/logo.png`,
          cid: 'logo',
        },
      ],
    });

    return res.json(schedules);
  }

  async listUserSchedule(req, res) {
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
        is_actived: 1,
        is_realized: 0,
      },
      include: { association: 'services' },
    });

    response.finished = await Schedules.findAll({
      where: {
        user_id,
        is_actived: 1,
        is_realized: 1,
      },
      include: { association: 'services' },
    });

    return res.json(response);
  }

  async listAccreditedSchedule(req, res) {
    const user = await User.findOne({
      where: {
        id: req.userId,
      },
      include: [
        {
          association: 'userRoles',
          where: {
            user_id: req.userId,
            role_id: {
              [Op.or]: [2, 3],
            },
          },
        },
      ],
    });

    if (!user) {
      return res.status(400).json({
        message: 'Usuario logado não possui permissão',
        code: 'ERROR_BAD_REQUEST',
      });
    }

    const { date } = req.params;
    const startDate = new Date(date);
    const endDate = new Date(date);

    startDate.setDate(startDate.getDate() + 1);
    startDate.setHours(0);
    startDate.setMinutes(0);

    endDate.setDate(endDate.getDate() + 1);
    endDate.setHours(23);
    endDate.setMinutes(59);
    endDate.setMilliseconds(59);

    const schedules = await Schedules.findAll({
      where: {
        is_actived: 1,
        is_realized: 0,
        date_start: {
          [Op.between]: [startDate, endDate],
        },
      },
      include: [
        { association: 'services', attributes: ['name', 'duration'] },
        { association: 'user', attributes: ['name', 'phone'] },
        { association: 'hour', attributes: ['hour'] },
      ],
    });

    return res.json(schedules);
  }

  async update(req, res) {
    // TODO: refatorar atualização de agendamento
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
