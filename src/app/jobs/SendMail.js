import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class SendMail {
  get key() {
    return 'SendMail';
  }

  async handle(dto) {
    console.log(dto);
    const { subscription } = dto;
    const { owner, user, date, meetup } = subscription;
    await Mail.sendMail({
      to: `${owner.name} <${owner.email}>`,
      subject: 'Nova inscrição em um MeetUp',
      template: 'subscription',
      context: {
        owner: owner.name,
        user: user.name,
        meetup: meetup.title,
        date: format(parseISO(date), "'dia' dd 'de' MMMM', às' H:mm'h'", {
          locale: pt,
        }),
      },
    });
  }
}

export default new SendMail();
