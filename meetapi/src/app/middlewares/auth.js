import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const autHeader = req.headers.authorization;

  if (!autHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = autHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    // Add userId to request
    req.userId = decoded.id;

    return next();
  } catch (error) {
    // console.log('foi token');
    return res.status(401).json({ error: 'Token invalid!' });
  }
};