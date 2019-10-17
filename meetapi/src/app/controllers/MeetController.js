import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import Meet from '../models/Meet';
import User from '../models/User';
import File from '../models/File';

class MeetController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const { date } = req.query;
    const searchDate = parseISO(date);

    if (!date) {
      return res.status(400).json({ error: 'Invalid date' });
    }

    const meets = await Meet.findAll({
      where: {
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
      order: ['date'],
      attributes: ['id', 'date', 'description', 'local', 'past', 'cancelable'],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'name', 'url'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(meets);
  }
}

export default new MeetController();
