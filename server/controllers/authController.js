import { query } from '../config/db.js';
import { StatusCodes } from 'http-status-codes';
import { hashPassword, comparePasswords } from '../utils/password.js';
import { createJWT } from '../utils/token.js';

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
      WHERE email = $1
      LIMIT 1
      `,
      [email]
    );

    const user = result.rows[0];
    if (!user) throw new Error('Invalid credentials!');

    const isMatch = await comparePasswords(password, user.password_hash);
    if (!isMatch) throw new Error('Incorrect password!');

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    const token = createJWT({ userId: user.id, name: user.name });
    return res.status(StatusCodes.OK).json({ user: safeUser, token });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

// Returns the current user
export const getUser = async (req, res) => {
  try {
    const result = await query(
      `
      SELECT id, name, email
      FROM users
      WHERE id = $1
      `,
      [req.user.userId]
    );

    const user = result.rows[0];
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'User not found' });
    }

    return res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
