import jwt from 'jsonwebtoken';

export const createJWT = ({ userId, name }) => {
  return jwt.sign({ userId, name }, process.env.JWT_SECRET, {
    expiresIn: '3d',
  });
};
