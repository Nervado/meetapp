import { Op } from 'sequelize';
import { startOfHour } from 'date-fns';
import Subscription from '../models/Subscription';
import Meet from '../models/Meet';
import User from '../models/User';
import File from '../models/File';

import CancellationMail from '../jobs/CancellationMail';
import SubscriptionMail from '../jobs/SubscriptionMail';

import Queue from '../../libs/Queue';

class SubscriberController {
  async store(req, res) {
    // id from requested meetup subscription
    const { id } = req.params;

    const meetup = await Meet.findByPk(id);

    if (!meetup) {
      return res.status(400).json({ error: 'Meetup não existe' });
    }

    // O usuário deve poder se inscrever em meetups que não organiza.
    if (req.userId === meetup.organizer_id) {
      return res
        .status(400)
        .json({ error: 'usuário é organizador deste meetup' });
    }

    // O usuário não pode se inscrever em meetups que já aconteceram.
    if (meetup.past) {
      return res
        .status(400)
        .json({ error: 'meetup com inscrições encerradas' });
    }

    // O usuário não pode se inscrever no mesmo meetup duas vezes.
    const existSubscription = await Subscription.findOne({
      where: { user_id: req.userId, meet_id: id },
    });

    if (existSubscription) {
      return res.status(400).json({ error: 'Usuário já inscrito' });
    }

    // O usuário não pode se inscrever em dois meetups que acontecem no mesmo horário.
    const isUnavailable = await Subscription.findOne({
      where: { date: startOfHour(meetup.date), user_id: req.userId },
    });

    if (isUnavailable) {
      return res.status(400).json({
        error: 'Usuário já está inscrito em outro meetup neste mesmo horário',
      });
    }
    const subscription = await Subscription.create({
      date: meetup.date,
      meet_id: id,
      user_id: req.userId,
    });

    const organizer = await User.findByPk(meetup.organizer_id);

    const subscriber = { name: req.userName, email: req.userEmail };

    // Sempre que um usuário se inscrever no meetup, envie um e-mail ao organizador contendo os dados relacionados ao usuário inscrito. O template do e-mail fica por sua conta :)
    await Queue.add(SubscriptionMail.key, {
      subscription: { meetup, organizer, subscriber },
    });

    return res.status(200).json(subscription);
  }

  async index(req, res) {
    /**  Crie uma rota para listar os meetups em que o usuário logado está inscrito.
     **  Liste apenas meetups que ainda não passaram e ordene meetups mais próximos como primeiros da lista.
     * */

    const subscriptions = await Subscription.findAll({
      where: { user_id: req.userId },
      order: ['date'],
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
              model: User,
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

    // check if is meetup is past
    const meetup = await Meet.findByPk(subscription.meet_id, {
      include: {
        model: User,
        as: 'user',
        attributes: ['name', 'email'],
      },
    });

    if (meetup && meetup.past) {
      return res
        .status(400)
        .json({ error: 'A inscrição não pode mais ser cancelada.' });
    }

    await Subscription.destroy({ where: { id } });
    // console.log(CancellationMail.key);
    // subscription
    await Queue.add(CancellationMail.key, {
      subscription: {
        meetup,
        organizer: meetup.user,
        subscriber: {
          email: req.userEmail,
          name: req.userName,
        },
      },
    });

    return res.status(200).json({ msg: 'Inscricao cancelada' });
  }
}

export default new SubscriberController();
