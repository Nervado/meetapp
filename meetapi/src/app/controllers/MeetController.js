import Meet from '../models/Meet';
import * as Yup from 'yup';

class MeetController {
  async index(req, res) {
    return res.status(200).json(meet);
  }
}

export default new MeetController();
