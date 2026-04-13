import { body, param } from 'express-validator';

// Create library validation rules
export const createLibraryValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .bail()
    .isString()
    .withMessage('Must provide valid string')
    .bail()
    .isLength({ min: 1, max: 100 })
    .withMessage(
      'Name must be at least 1 character and less than 100 characters'
    ),

  body('description')
    .optional()
    .trim()
    .isString()
    .withMessage('Must provide valid string')
    .bail()
    .isLength({ max: 1000 })
    .withMessage('Description must be less than 1000 characters'),
];

// Get single library validation rules
export const getSingleLibraryValidation = [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('Id is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Must be a valid positive integer'),
];

// Update library validation rules
export const updateLibraryValidation = [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('Id is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Must be a valid positive integer'),

  body().custom((value, { req }) => {
    const hasName = Object.hasOwn(req.body, 'name');
    const hasDescription = Object.hasOwn(req.body, 'description');

    if (!hasName && !hasDescription) {
      throw new Error('At least one field is required');
    }

    return true;
  }),

  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Name must not be empty')
    .bail()
    .isString()
    .withMessage('Must provide valid string')
    .bail()
    .isLength({ max: 100 })
    .withMessage('Name must be less than 100 characters'),

  body('description')
    .optional()
    .trim()
    .isString()
    .withMessage('Must provide valid string')
    .bail()
    .isLength({ max: 1000 })
    .withMessage('Description must be less than 1000 characters'),
];

// Delete library validation rules
export const deleteLibraryValidation = [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('Id is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Must be a valid positive integer'),
];
