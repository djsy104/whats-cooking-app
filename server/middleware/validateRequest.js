import { validationResult } from 'express-validator';
import BadRequestError from '../errors/BadRequestError.js';
import ConflictError from '../errors/ConflictError.js';

export default function validateRequest(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));

    const hasConflictError = formattedErrors.some(
      (error) => error.message === 'Email already registered'
    );

    if (hasConflictError) {
      return next(new ConflictError('Email already registered', formattedErrors));
    }

    return next(new BadRequestError('Validation failed', formattedErrors));
  }

  next();
}
