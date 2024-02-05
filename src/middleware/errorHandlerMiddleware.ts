import httpStatus from "http-status";
import { Request, Response } from "express";
import { ApplicationError } from "@/types/errorProtocol";

export function errorHandler(
  err: ApplicationError | Error,
  _req: Request,
  res: Response,
) {
  if (err.name === "duplicateUserError") {
    return res.status(httpStatus.CONFLICT).send({
      message: err.message,
    });
  }

  if (err.name === "insufficientFundsError") {
    return res.status(httpStatus.FORBIDDEN).send({
      message: err.message,
    });
  }

  if (err.name === "gameAlreadyFinishedError") {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: err.message,
    });
  }

  if (
    err.name === "missingGameError" ||
    err.name === "missingParticipantError"
  ) {
    return res.status(httpStatus.NOT_FOUND).send({
      message: err.message,
    });
  }

  console.error(err);
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: "InternalServerError",
    message: "Internal Server Error",
  });
}
