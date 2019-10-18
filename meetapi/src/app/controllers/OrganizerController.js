import * as Yup from 'yup';
import { isBefore, parseISO } from 'date-fns';

import Meet from '../models/Meet';
import File from '../models/File';

class OrganizerController {
  async store(req, res) {
    // Schema validation
    const schema = Yup.object().shape({
      title: Yup.string()
        .required()
        .max(150),
      description: Yup.string()
        .required()
        .max(500),
      local: Yup.string()
        .required()
        .max(150),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fail!' });
    }
    // check data avaibility
    const dateChecked = parseISO(req.body.date);

    if (isBefore(parseISO(req.body.date), new Date())) {
      return res
        .status(400)
        .json({ error: 'Não é possível criar um evento no passado' });
    }

    const {
      id,
      local,
      title,
      date,
      description,
      organizer_id,
      banner_id,
      cancelable,
      past,
    } = await Meet.create({
      ...req.body,
      date: dateChecked,
      organizer_id: req.userId,
    });

    return res.json({
      id,
      organizer_id,
      banner_id,
      local,
      date,
      title,
      description,
      cancelable,
      past,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string()
        .required()
        .max(150),
      description: Yup.string()
        .required()
        .max(500),
      local: Yup.string()
        .required()
        .max(150),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fail!' });
    }

    const { id } = req.params;

    const meet = await Meet.findOne({ where: { id } });

    if (!meet) {
      return res.status(400).json({ error: 'Meetup não existe' });
    }

    if (!meet.past) {
      return res
        .status(400)
        .json({ error: 'Meetup não pode mais ser editado.' });
    }

    const { organizer_id } = meet;

    if (req.userId !== organizer_id) {
      return res
        .status(401)
        .json({ error: 'Usuário não é o organizador do evento' });
    }

    const response = await meet.update(req.body);

    return res.status(200).json(response);
  }

  async index(req, res) {
    const meetups = await Meet.findAll({
      where: { organizer_id: req.userId },
      order: ['date'],
      attributes: ['id', 'date', 'past', 'cancelable'],
    });

    return res.json(meetups);
  }

  async delete(req, res) {
    const { id } = req.params;
    const meet = await Meet.findByPk(id);

    if (!meet) {
      return res.status(400).json({ error: 'Meetup não existe' });
    }
    const { organizer_id } = meet;

    if (req.userId !== organizer_id) {
      return res
        .status(401)
        .json({ error: 'Usuário não é o organizador do evento' });
    }

    if (meet.cancelable) {
      return res
        .status(400)
        .json({ error: 'O meetup não pode mais ser cancelado' });
    }

    // remove meetup from database
    try {
      await Meet.destroy(
        { where: { id } },
        {
          include: [
            {
              model: File,
              as: 'banner',
            },
          ],
        }
      );
      return res.status(200).json({ msg: 'meetup cancelado' });
    } catch (error) {
      return res.status(500);
    }
  }
}

export default new OrganizerController();
