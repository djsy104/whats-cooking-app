import { query } from '../config/db.js';
import { StatusCodes } from 'http-status-codes';

export const getUsers = async (req, res) => {
  try {
    const result = await query('SELECT * from users;');
    console.log(result.rows);
    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const currentUser = await User.findOne({ email });

  if (currentUser) {
    return res
      .status(401)
      .json({ error: 'There is already an account with that email' });
  }

  const createdUser = await User.create({ name, email, password });
  const token = createdUser.createJWT();

  res.status(200).json({ user: createdUser, token: token });
};
