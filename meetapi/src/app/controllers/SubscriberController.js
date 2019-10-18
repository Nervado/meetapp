import { Op } from 'sequelize';
import { startOfHour } from 'date-fns';
import Subscription from '../models/Subscription';
import Meet from '../models/Meet';

class SubscriberController {
  async store(req, res) {
    // id from requested meetup subscription
    const { id } = req.params;

    const meet = await Meet.findByPk(id);

    if (!meet) {
      res.status(400).json({ error: 'Meetup não existe' });
    }

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
      where: { user_id: req.userId, meet_id: id },
    });

    if (existSubscription) {
      res.status(400).json({ error: 'Usuário já inscrito' });
    }

    // O usuário não pode se inscrever em dois meetups que acontecem no mesmo horário.
    const isUnavailable = await Subscription.findOne({
      where: { date: startOfHour(meet.date), user_id: req.userId },
    });

    if (isUnavailable) {
      res.status(400).json({
        error: 'Usuário já está inscrito em outro meetup neste mesmo horário',
      });
    }
    const { date, user_id, meet_id } = await Subscription.create({
      date: meet.date,
      meet_id: id,
      user_id: req.userId,
    });

    // Sempre que um usuário se inscrever no meetup, envie um e-mail ao organizador contendo os dados relacionados ao usuário inscrito. O template do e-mail fica por sua conta :)
    // TO DO
    return res.status(200).json({ date, user_id, meet_id });
  }

  async index(req, res) {
    /**  Crie uma rota para listar os meetups em que o usuário logado está inscrito.
     **  Liste apenas meetups que ainda não passaram e ordene meetups mais próximos como primeiros da lista.
     **/

    const subscriptions = await Subscription.findAll({
      where: { user_id: req.userId },
      order: 'date',
      date: {
        [Op.gt]: [new Date()],
      },
      include: [
        {
          model: Meet,
          as: 'meet',
          attributes: ['id', 'date', 'local', 'title', 'description'],
          include: [
            {
              model: File,
              as: 'banner',
              attributes: ['id', 'name'],
            },
            {
              Model: User,
              as: 'user',
              attributes: ['id', 'name', 'email'],
            },
          ],
        },
      ],
    });

    return res.status(200).json(subscriptions);
  }

  async delete(req, res) {
    const { id } = req.params;
    // check if subscription exists
    const subscription = await Subscription.findByPk(id);

    if (!subscription) {
      return res.status(400).json({ error: 'Inscrição não existe!' });
    }

    // check if the subscription belongs to loged user
    if (req.userId !== subscription.user_id) {
      return res
        .status(400)
        .json({ error: 'Inscrição não pertence ao usuário logado' });
    }

    try {
      await Subscription.destroy({ where: { id } });

      return res.status(200).json({ msg: 'Inscricao cancelada' });
    } catch (error) {
      return res.status(500);
    }
  }
}

export default new SubscriberController();
