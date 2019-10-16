import Subscription from '../models/Subscription';
// import User from '../models/Subscription';

class SubscriberController {
  async store(req, res) {
    const { id } = await Subscription.create({ date: new Date() });

    const { date, cancelable, past } = await Subscription.findByPk(id);

    console.log({ date, cancelable, past });

    return res.status(200).json({ date, cancelable, past });
  }

  async index(req, res) {
    const subscription = await Subscription.findAll({
      where: { user_id: req.userId },
    });

    const { date, user_id, meet_id, cancelable, past } = subscription;

    console.log({ date, user_id, meet_id, cancelable, past });

    return res.status(200).json({ date, user_id, meet_id, cancelable, past });
  }

  async delete(req, res) {
    return res.status(200).json({ msg: 'inscricao cancelada' });
  }
}

export default new SubscriberController();
