import * as Yup from 'yup';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string()
      .email()
      .required(),
    phone: Yup.string()
      .min(9)
      .max(11)
      .required(),
    password: Yup.string()
      .min(6)
      .required(),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(400).json({
      message:
        'Parece que você não forneceu todos os dados necessários corretamente.',
      code: 'ERROR_BAD_REQUEST',
    });
  }

  return next();
};
