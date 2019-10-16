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
    // consulta no banco de dados trazendo todos os meetups por data
    return res.status(200).json({ msg: 'lista de meetups' });
  }

  async delete(req, res) {
    return res.status(200).json({ msg: 'inscricao cancelada' });
  }
}

export default new SubscriberController();
