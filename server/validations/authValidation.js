import { body } from 'express-validator';
import { query } from '../config/db.js';

// Register validation rules
export const registerValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .bail()
    .isString()
    .withMessage('Must provide valid string')
    .bail()
    .isLength({ max: 100 })
    .withMessage(
      'Name must be at least 1 character and less than 100 characters'
    ),

  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .bail()
    .isEmail()
    .withMessage('Must provide a valid email')
    .bail()
    .trim()
    .toLowerCase()
    .custom(async (value) => {
      const result = await query(
        'SELECT id FROM users WHERE email = $1 LIMIT 1',
        [value]
      );

      if (result.rows.length > 0) {
        throw new Error('Email already registered!');
      }

      return true;
    }),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .bail()
    .isLength({ min: 4 })
    .withMessage('Password must be at least 4 characters'),
];
