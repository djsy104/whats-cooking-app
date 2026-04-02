import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

export const authenticateUser = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const bearerToken =
    authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : null;

  if (!bearerToken)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: 'No token provided' });

  try {
    const verified = jwt.verify(bearerToken, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    console.log('JWT Error: ', err.message);

    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: 'Invalid token' });
  }
};
