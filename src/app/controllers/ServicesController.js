import Services from '../models/Services';

class ServicesController {
  async create(req, res) {
    console.log(req.body);
    const { id, name, description } = await Services.create(req.body);

    return res.json({
      id,
      name,
      description,
    });
  }

  async listById(req, res) {
    const response = await Services.findByPk(req.id);

    return res.json({
      response,
    });
  }

  async list(req, res) {
    let response;
    try {
      response = await Services.findAll();
    } catch (error) {
      return res.status(400).json({
        message: 'Não há serviços disponiveis no momento.',
        code: 'ERROR_BAD_REQUEST',
      });
    }
    return res.json(response);
  }

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
