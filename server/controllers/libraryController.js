import { query } from '../config/db.js';
import { StatusCodes } from 'http-status-codes';

export const createLibrary = async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.user.userId;

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

    return res.status(StatusCodes.OK).json({ libraries: result.rows });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const getSingleLibrary = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const result = await query(
      `
      SELECT * from libraries
      WHERE user_id = $1 AND id = $2
      `,
      [userId, id]
    );

    const library = result.rows[0];
    if (!library) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Library not found' });
    }

    return res.status(StatusCodes.OK).json({ library });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const updateLibrary = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const updatedFields = [];
    const updatedValues = [];

    if (Object.hasOwn(req.body, 'name')) {
      updatedValues.push(req.body.name);
      updatedFields.push(`name = $${updatedValues.length}`);
    }

    if (Object.hasOwn(req.body, 'description')) {
      updatedValues.push(req.body.description);
      updatedFields.push(`description = $${updatedValues.length}`);
    }

    updatedValues.push(userId);
    updatedValues.push(id);

    const result = await query(
      `
      UPDATE libraries
      SET ${updatedFields.join(', ')}
      WHERE user_id = $${updatedValues.length - 1} AND id = $${updatedValues.length}
      RETURNING name, description, user_id, id
      `,
      updatedValues
    );

    const library = result.rows[0];
    if (!library) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Library not found' });
    }

    return res.status(StatusCodes.OK).json({ library });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const deleteLibrary = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const result = await query(
      `
      DELETE from libraries
      WHERE user_id = $1 AND id = $2
      RETURNING id, user_id, name, description
      `,
      [userId, id]
    );

    const library = result.rows[0];
    if (!library) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Library not found' });
    }

    return res.status(StatusCodes.OK).json({ library });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
