import { format, parseISO } from 'date-fns'
import pt from 'date-fns/locale/pt'

import Mail from '../../lib/Mail'

class SubscriptionMail {
  get key() {
    return 'SubscriptionMail'
  }

  async handle({ data }) {
    const { subscription } = data
    const { owner, user, date, meetup } = subscription

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
    })
  }
}

export default new SubscriptionMail()
