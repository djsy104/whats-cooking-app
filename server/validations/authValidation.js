import { body } from 'express-validator';

// Register validation rules
export const registerValidation = [
  body('name')
    .exists()
    .withMessage('Name is required')
    .bail()
    .isString()
    .withMessage('Name must be a string')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .bail()
    .isLength({ max: 100 })
    .withMessage(
      'Name must be at least 1 character and less than 100 characters'
    ),

  body('email')
    .exists()
    .withMessage('Email is required')
    .bail()
    .isString()
    .withMessage('Email must be a string')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .bail()
    .isEmail()
    .withMessage('Email must be a valid email')
    .bail()
    .toLowerCase(),

  body('password')
    .exists()
    .withMessage('Password is required')
    .bail()
    .isString()
    .withMessage('Password must be a string')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .bail()
    .isLength({ min: 4 })
    .withMessage('Password must be at least 4 characters'),
];

// Login validation rules
export const loginValidation = [
  body('email')
    .exists()
    .withMessage('Email is required')
    .bail()
    .isString()
    .withMessage('Email must be a string')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .bail()
    .isEmail()
    .withMessage('Email must be a valid email')
    .bail()
    .toLowerCase(),

  body('password')
    .exists()
    .withMessage('Password is required')
    .bail()
    .isString()
    .withMessage('Password must be a string')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('Password is required'),
];
