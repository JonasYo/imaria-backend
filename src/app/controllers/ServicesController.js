import Services from '../models/Services';

class ServicesController {
  async create(req, res) {
    const { id, name, email } = await Services.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async listById(req, res) {
    const response = await Services.findByPk(req.id);

    return res.json({
      response,
    });
  }

  async list(req, res) {
    Services.findAll().then(books => {
      console.log(books);
    });
    try {
      const response = await Services.findAll();
      console.log(response);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message: 'Não há serviços disponiveis no momento.',
        code: 'ERROR_BAD_REQUEST',
      });
    }
    return res.json({
      a: 'as',
    });
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
