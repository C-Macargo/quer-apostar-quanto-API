import { CreateBetParams } from "@/interface/betInterface";
import { errorHandler } from "@/middleware/errorHandlerMiddleware";
import { betService } from "@/service/betService";
import { ApplicationError } from "@/types/errorProtocol";
import { BetRequestBody } from "@/types/types";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function createBet(req: Request, res: Response) {
  const { homeTeamScore, awayTeamScore, amountBet, gameId, participantId } =
    req.body as BetRequestBody;
  const betParams: CreateBetParams = {
    homeTeamScore,
    awayTeamScore,
    amountBet,
    gameId,
    participantId,
  };
  try {
    const bet = await betService.createBet(betParams);
    return res.status(httpStatus.CREATED).send(bet);
  } catch (err: unknown) {
    const error = err as ApplicationError | Error;
    errorHandler(error, req, res);
  }
}
