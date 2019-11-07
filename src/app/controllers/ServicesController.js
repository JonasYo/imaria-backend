/* eslint-disable camelcase */
import { Sequelize } from 'sequelize';

import Services from '../models/Services';
import Times from '../models/Times';
import Schedules from '../models/Schedules';

const { Op } = Sequelize;

class ServicesController {
  async create(req, res) {
    // TODO: finalizar logica para consumir a API no Portal Web
    const response = await Services.create(req.body);

    return res.json(response);
  }

  async listServicesAvailable(req, res) {
    const response = await Services.findAll();
    if (!response) {
      return res.status(400).json({
        message: 'Não há serviços disponiveis no momento.',
        code: 'ERROR_BAD_REQUEST',
      });
    }
    return res.json(response);
  }

  async listHoursAvailable(req, res) {
    const { date, service_id } = req.params;
    const startDate = new Date(date);
    const endDate = new Date(date);

    startDate.setDate(startDate.getDate() + 1);
    startDate.setHours(0);
    startDate.setMinutes(0);

    endDate.setDate(endDate.getDate() + 1);
    endDate.setHours(23);
    endDate.setMinutes(59);
    endDate.setMilliseconds(59);

    const schedule = await Schedules.findAll({
      // eslint-disable-next-line camelcase
      attributes: ['hour_id'],
      where: {
        service_id,
        date_start: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    const hourNotAvailable = [];
    schedule.map(hour => hourNotAvailable.push(hour.hour_id));

    const response = await Times.findAll({
      where: {
        id: { [Op.notIn]: hourNotAvailable },
      },
    });

    if (!response) {
      return res.status(400).json({
        message: 'Não há serviços disponiveis no momento.',
        code: 'ERROR_BAD_REQUEST',
      });
    }

    return res.json(response);
  }

  // TODO: finalizar metodos Update e Delete
  async update(req, res) {
    const response = await Services.update(req.body);

    return res.json({
      response,
    });
  }

  async delete(req, res) {
    const response = await Services.findAll();

    return res.json({
      response,
    });
  }
}

export default new ServicesController();
