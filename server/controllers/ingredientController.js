import { query } from '../config/db.js';
import { StatusCodes } from 'http-status-codes';
import NotFoundError from '../errors/NotFoundError.js';
import InternalServerError from '../errors/InternalServerError.js';
import ConflictError from '../errors/ConflictError.js';

// Admin controller
export const createIngredient = async (req, res, next) => {
  try {
    const { name, category } = req.body;
    const normalizedCategory = category ?? null;

    const result = await query(
      `
      INSERT INTO ingredients (name, category)
      VALUES ($1, $2)
      RETURNING id, name, category
      `,
      [name, normalizedCategory]
    );

    const ingredient = result.rows[0];

    return res.status(StatusCodes.CREATED).json({ ingredient });
  } catch (error) {
    if (error.code === '23505') {
      return next(new ConflictError('Ingredient already exists'));
    }

    return next(new InternalServerError('Unable to create ingredient'));
  }
};

export const getIngredients = async (req, res, next) => {
  try {
    const search = req.query.search;

    if (search) {
      // Casts 'name' column into text before using the ILIKE comparison (insensitive word check)
      const result = await query(
        `
        SELECT id, name category
        FROM ingredients
        WHERE status = 'active' AND name::text ILIKE '%' || $1 || '%'
        ORDER BY name
        `,
        [search]
      );

      return res.status(StatusCodes.OK).json({ ingredients: result.rows });
    }

    const result = await query(
      `
      SELECT id, name, category 
      FROM ingredients
      WHERE status = 'active'
      ORDER BY name
      `
    );

    return res.status(StatusCodes.OK).json({ ingredients: result.rows });
  } catch (_error) {
    return next(new InternalServerError('Unable to fetch ingredients'));
  }
};

export const getSingleIngredient = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await query(
      `
      SELECT id, name, category
      FROM ingredients
      WHERE id = $1
      `,
      [id]
    );

    const ingredient = result.rows[0];
    if (!ingredient) {
      throw new NotFoundError('Ingredient not found');
    }

    return res.status(StatusCodes.OK).json({ ingredient });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return next(error);
    }

    return next(new InternalServerError('Unable to fetch ingredient'));
  }
};

export const updateIngredient = async (req, res, next) => {
  // TODO : Admin feature
  return res.json({ message: 'This is the update ingredient controller' });
};

export const hideIngredient = async (req, res, next) => {
  // TODO : Admin feature
  return res.json({ message: 'This is the hide ingredient controller' });
};

export const reactivateIngredient = async (req, res, next) => {
  // TODO : Admin feature
  return res.json({ message: 'This is the reactivate ingredient controller' });
};

export const mergeIngredient = async (req, res, next) => {
  // TODO : Admin feature
  return res.json({ message: 'This is the merge ingredient controller' });
};
