import nodemailer from 'nodemailer';

import mailConfig from '../config/mail';

class Mail {
  constructor() {
    const { host, port, secure, auth } = mailConfig;

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    });
  }

  sendMail() {
    // return this.transporter.sendMail({
    //   ...message,
    // });
    const mailOptions = {
      from: '"Example Team" <from@example.com>',
      to: 'user1@example.com, user2@example.com',
      subject: 'Nice Nodemailer test',
      text: 'Hey there, it’s our first message sent with Nodemailer ;) ',
      html:
        '<b>Hey there! </b><br> This is our first message sent with Nodemailer',
    };

    return this.transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
    });
  }
}

export default new Mail();
