import * as Yup from 'yup';

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

    const {
      id,
      local,
      date,
      title,
      description,
      organizer_id,
      banner_id,
    } = await Meet.create({ ...req.body, organizer_id: req.userId });

    return res.json({
      id,
      organizer_id,
      banner_id,
      local,
      date,
      title,
      description,
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
    // check if the loged user is organizer
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

    // remove meetup from database
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
  }
}

export default new OrganizerController();
