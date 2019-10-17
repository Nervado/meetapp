import Subscription from '../models/Subscription';
// import User from '../models/Subscription';

class SubscriberController {
  async store(req, res) {
    const { id } = await Subscription.create({ date: new Date() });

    //check if the user is organizer
    /**
     * ### Inscrição no meetup

O usuário deve poder se inscrever em meetups que não organiza.

O usuário não pode se inscrever em meetups que já aconteceram.

O usuário não pode se inscrever no mesmo meetup duas vezes.

O usuário não pode se inscrever em dois meetups que acontecem no mesmo horário.

Sempre que um usuário se inscrever no meetup, envie um e-mail ao organizador contendo os dados relacionados ao usuário inscrito. O template do e-mail fica por sua conta :)


     */

    const { date, cancelable, past } = await Subscription.findByPk(id);

    console.log({ date, cancelable, past });

    // to do send email

    return res.status(200).json({ date, cancelable, past });
  }

  async index(req, res) {
    /**
     * ### Listagem de inscrições

Crie uma rota para listar os meetups em que o usuário logado está inscrito.

Liste apenas meetups que ainda não passaram e ordene meetups mais próximos como primeiros da lista.
     */
    const subscription = await Subscription.findAll({
      where: { user_id: req.userId },
    });

    const { date, user_id, meet_id, cancelable, past } = subscription;

    console.log({ date, user_id, meet_id, cancelable, past });

    return res.status(200).json({ date, user_id, meet_id, cancelable, past });
  }

  async delete(req, res) {
    const { id } = req.params;

    const response = await Subscription.destroy({ where: { id } });

    console.log(response);

    return res.status(200).json({ msg: 'inscricao cancelada' });
  }
}

export default new SubscriberController();
