import User from '../models/User';

class UserController {
  async store(req, res) {
    // check duplicated emails ...To Do
    const { email } = req.body;
    const checkEmail = await User.findOne({ where: { email } });

    if (checkEmail) {
      return res.status(400).json({ error: 'Duplicated email' });
    }

    const user = await User.create(req.body);
    return res.json(user);
  }

  async update(req, res) {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(400).json({ error: ' User not found ' });
    }

    await User.update(req.body);

    return res.status(200).json({ msg: 'usuario atualizado' });
  }
}

export default new UserController();
