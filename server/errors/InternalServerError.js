import { StatusCodes } from 'http-status-codes';
import CustomError from './CustomError.js';

export default class InternalServerError extends CustomError {
  constructor(message) {
    super(message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
