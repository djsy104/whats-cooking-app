import { query } from '../config/db.js';
import { StatusCodes } from 'http-status-codes';
import { hashPassword, comparePasswords } from '../utils/password.js';
import { createJWT } from '../utils/token.js';

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
  const hashedPassword = hashPassword(password);
  const result = await query(
    `
    INSERT INTO whats_cooking (name, email, password_hash)
    VALUES ($1, $2, $3)
    RETURNING id, name, email
    `,
    [name, email, hashedPassword]
  );

  const user = result.rows[0];
  const token = createJWT({ userId: user.id, name: user.name });

  res.status(StatusCodes.CREATED).json({ user, token });
};
