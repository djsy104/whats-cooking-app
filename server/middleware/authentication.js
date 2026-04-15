import jwt from 'jsonwebtoken';
import UnauthorizedError from '../errors/UnauthorizedError.js';

export const authenticateUser = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const bearerToken =
    authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : null;

  if (!bearerToken) {
    return next(new UnauthorizedError('No token provided'));
  }

  try {
    const verified = jwt.verify(bearerToken, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    console.log('JWT Error: ', err.message);

    return next(new UnauthorizedError('Invalid token'));
  }
};
