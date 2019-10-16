import Meet from '../models/Meet';

class OrganizerController {
  async store(req, res) {
    // Schema validation
    /*
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string()
        .email()
        .required(),
      local: Yup.string()
        .required()
        .min(6),

      date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fail!' });
    } */
    const {
      id,
      local,
      date,
      title,
      description,
      organizer_id,
      banner_id,
    } = await Meet.create(req.body);
    /**
    *
    *  console.log({
      id,
      local,
      date,
      title,
      description,
      organizer_id,
      banner_id,
    });
    */
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
    const { id } = req.params;
    const meet = await Meet.findByPk(id);

    const response = await meet.update(req.body);
    // console.log(response);

    return res.status(200).json(response);
  }

  async index(req, res) {
    const meetups = await Meet.findAll({ where: { organizer_id: req.userId } });

    const { date, description, local, title, banner_id } = meetups;

    // console.log({ date, description, local, title, banner_id });

    return res.status(200).json({ date, description, local, title, banner_id });
  }

  async delete(req, res) {
    const { id } = req.params;

    const response = await Meet.destroy({ where: { id } });

    console.log(response);

    return res.status(200).json({ msg: 'meetup cancelado' });
  }
}

export default new OrganizerController();
