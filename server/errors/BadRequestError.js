import { StatusCodes } from 'http-status-codes';
import CustomError from './CustomError.js';

export default class BadRequestError extends CustomError {
  constructor(message = 'Validation failed', errors = []) {
    super(message, StatusCodes.BAD_REQUEST, errors);
  }
}
