import { StatusCodes } from 'http-status-codes';

export default function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  return res.status(statusCode).json({
    message: err.message || 'Something went wrong, please try again later',
    errors: Array.isArray(err.errors) ? err.errors : [],
  });
}
