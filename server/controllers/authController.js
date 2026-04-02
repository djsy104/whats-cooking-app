import { query } from '../config/db.js';

export const login = (req, res) => {
  return res.json({ message: 'Hello login' });
};

export const getUsers = async (req, res) => {
  try {
    const result = await query('SELECT * from users;');
    console.log(result.rows);
    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
