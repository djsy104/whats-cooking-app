import { StatusCodes } from 'http-status-codes';
import CustomError from './CustomError.js';

export default class ConflictError extends CustomError {
  constructor(message = 'Conflict', errors = []) {
    super(message, StatusCodes.CONFLICT, errors);
  }
}
