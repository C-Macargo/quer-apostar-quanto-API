import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { ApplicationError } from '@/util/errorProtocol';

export function errorHandler(err: ApplicationError | Error, _req: Request, res: Response) {
  if (err.name === 'duplicateUserError') {
    return res.status(httpStatus.CONFLICT).send({
      message: err.message,
    });
  }

  console.error(err);
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: 'InternalServerError',
    message: 'Internal Server Error',
  });
}