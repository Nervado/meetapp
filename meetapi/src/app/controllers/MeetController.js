import { setHours, setMinutes, setSeconds } from 'date-fns';

import Meet from '../models/Meet';
import User from '../models/User';
import File from '../models/File';

class MeetController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const {
      date = setHours(0, setMinutes(0, setSeconds(0, new Date()))),
    } = req.query;

    const [beginDate, endDate] = [
      setHours(0, setMinutes(0, setSeconds(0, date))),
      setHours(24, setMinutes(0, setSeconds(0, date))),
    ];

    const meets = await Meet.findAll({
      where: {
        past: false,
        canceled_at: null,
        date: {
          $between: [beginDate, endDate],
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

    return res.status(200).json(meets);
  }
}

export default new MeetController();
