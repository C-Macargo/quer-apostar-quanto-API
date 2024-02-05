import { errorHandler } from "@/middleware/errorHandlerMiddleware";
import { participantService } from "@/service/participantService";
import { ApplicationError } from "@/types/errorProtocol";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function findParticipants(req: Request, res: Response) {
  try {
    const participants = await participantService.findParticipants();
    return res.status(httpStatus.OK).send(participants);
  } catch (err: unknown) {
    const error = err as ApplicationError | Error;
    errorHandler(error, req, res);
  }
}

export async function createParticipant(req: Request, res: Response) {
  const { name, balance } = req.body as { name: string; balance: number };
  try {
    const participant = await participantService.createParticipant(
      name,
      balance,
    );
    return res.status(httpStatus.CREATED).send(participant);
  } catch (err: unknown) {
    const error = err as ApplicationError | Error;
    errorHandler(error, req, res);
  }
}
