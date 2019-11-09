export default {
  service: process.env.MAIL_HOST,
  auth: {
    user: process.env.MAIL_USER, // Seu endereço do gmail.
    pass: process.env.MAIL_PASS,
  },
};
