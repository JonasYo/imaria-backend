import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';

import mailConfig from '../config/mail';

class Mail {
  constructor() {
    const { service, auth } = mailConfig;

    this.transporter = nodemailer.createTransport({
      service,
      auth,
    });
  }

  configureTemplates(template) {
    const handlebarOptions = {
      viewEngine: {
        extName: '.hbs',
        partialsDir: 'src/resources/views/emails/',
        layoutsDir: 'src/resources/views/emails/',
        defaultLayout: `${template}.hbs`,
      },
      viewPath: 'src/resources/views/emails/',
      extName: '.hbs',
    };
    this.transporter.use('compile', hbs(handlebarOptions));
  }

  sendMail(mailOptions) {
    this.configureTemplates(mailOptions.template);
    return this.transporter.sendMail(mailOptions);
  }
}

export default new Mail();
