import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Subscriber } from 'rxjs';
import Mail from '../../libs/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { meetup, organizer, subscriber } = data.subscription;

    // console.log('A fila Executou');
    await Mail.sendMail({
      to: `${organizer.name}<${organizer.email}>`,
      subject: 'Inscrição cancelada',
      template: 'cancellation',
      context: {
        subscriber: subscriber.name,
        email: subscriber.email,
        organizer: organizer.name,
        title: meetup.title,
        local: meetup.local,
        date: format(
          parseISO(meetup.date),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new CancellationMail();
