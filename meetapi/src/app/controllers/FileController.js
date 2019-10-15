import File from '../models/File';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;
    const file = await File.create({
      name,
      path,
    });
    // return res.json(file);
    res.status(200).json({ msg: 'the file has been salved' });
  }
}

export default new FileController();
