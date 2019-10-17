import Subscription from '../models/Subscription';
import Meet from '../models/Meet';

class SubscriberController {
  async store(req, res) {
    // id from requested meetup subscription
    const { id } = req.params;

    const meet = await Meet.findByPk(id);

    // O usuário deve poder se inscrever em meetups que não organiza.
    if (req.userId === (await Meet.findByPk(req.params.id)).organizer_id) {
      res.status(400).json({ error: 'usuário é organizador deste meetup' });
    }

    // O usuário não pode se inscrever em meetups que já aconteceram.
    if (meet.past) {
      res.status(400).json({ error: 'meetup com inscrições encerradas' });
    }

    // O usuário não pode se inscrever no mesmo meetup duas vezes.
    const existSubscription = await Subscription.findOne({
      where: { user_id: req.userId },
    });

    if (existSubscription) {
      res.status(400).json({ error: 'Usuário já inscrito' });
    }

    // O usuário não pode se inscrever em dois meetups que acontecem no mesmo horário.
    const isUnavailable = await Subscription.findOne({
      where: { date: meet.date },
    });

    if (isUnavailable) {
      res.status(400).json({
        error: 'Usuário já está inscrito em outro meetup neste mesmo horário',
      });
    }
    const { date, user_id, meet_id } = await Subscription.create({
      date: meet.date,
      meet_id: meet.meet_id,
      user_id: req.userId,
    });

    // Sempre que um usuário se inscrever no meetup, envie um e-mail ao organizador contendo os dados relacionados ao usuário inscrito. O template do e-mail fica por sua conta :)
    // TO DO
    return res.status(200).json({ date, user_id, meet_id });
  }

  async index(req, res) {
    /**
     * ### Listagem de inscrições

Crie uma rota para listar os meetups em que o usuário logado está inscrito.

Liste apenas meetups que ainda não passaram e ordene meetups mais próximos como primeiros da lista.
     */

    const subscription = await Subscription.findAll({
      where: { user_id: req.userId },
      order: 'date',
    });

    const { date, user_id, meet_id, cancelable, past } = subscription;

    console.log({ date, user_id, meet_id, cancelable, past });

    return res.status(200).json({ date, user_id, meet_id, cancelable, past });
  }

  async delete(req, res) {
    const { id } = req.params;
    // check if the subscription belongs to loged user

    const response = await Subscription.destroy({ where: { id } });

    console.log(response);

    return res.status(200).json({ msg: 'inscricao cancelada' });
  }
}

export default new SubscriberController();
