import { query } from '../config/db.js';
import { StatusCodes } from 'http-status-codes';

export const createLibrary = async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.user.userId;

    if (!name) throw new Error('Name is required');

    const result = await query(
      `
      INSERT INTO libraries (user_id, name, description)
      VALUES ($1, $2, $3)
      RETURNING id, user_id, name, description
      `,
      [userId, name, description]
    );

    const library = result.rows[0];

    return res.status(StatusCodes.CREATED).json({ library });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const getLibraries = async (req, res) => {
  try {
    const userId = req.user.userId;

    const result = await query(
      `
      SELECT * from libraries
      WHERE user_id = $1
      ORDER BY name
      `,
      [userId]
    );

    return res.status(StatusCodes.CREATED).json({ libraries: result.rows });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const getSingleLibrary = async (req, res) => {
  return res.send('Get library');
};

export const updateLibrary = async (req, res) => {
  return res.send('Update library');
};

export const deleteLibrary = async (req, res) => {
  return res.send('Delete library');
};
