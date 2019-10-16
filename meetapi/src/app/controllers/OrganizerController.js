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
    console.log({
      id,
      local,
      date,
      title,
      description,
      organizer_id,
      banner_id,
    });
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
    return res.status(200).json({ msg: 'meetup atualizado' });
  }

  async index(req, res) {
    return res.status(200).json({ msg: 'meetup listado' });
  }

  async delete(req, res) {
    return res.status(200).json({ msg: 'meetup cancelado' });
  }
}

export default new OrganizerController();
