import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../libs/Mail';

class SubcriptionMail {
  get key() {
    return 'SubcriptionMail';
  }

  async handle({ data }) {
    const { meetup, organizer, subscriber } = data.subscription;

    console.log('A fila Executou');
    await Mail.sendMail({
      to: `${organizer.name}<${organizer.email}>`,
      subject: `Novo inscrito em seu Meetup #${meetup.id}`,
      template: 'subscription',
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

export default new SubcriptionMail();
