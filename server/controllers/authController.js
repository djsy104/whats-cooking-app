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
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const result = await query(
      `
      INSERT INTO users (name, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, name, email
      `,
      [name, email, hashedPassword]
    );

    const user = result.rows[0];
    const token = createJWT({ userId: user.id, name: user.name });

    return res.status(StatusCodes.CREATED).json({ user, token });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await query(
      `
      SELECT id, name, email, password_hash
      FROM users
      where email = $1
      LIMIT 1
      `,
      [email]
    );

    const user = result.rows[0];
    if (!user) throw new Error('Invalid credentials!');

    const isMatch = await comparePasswords(password, user.password_hash);
    if (!isMatch) throw new Error('Incorrect password!');

    const token = createJWT({ userId: user.id, name: user.name });
    res.status(StatusCodes.OK).json({ user, token });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
