import { errorHandler } from "@/middleware/errorHandlerMiddleware";
import { gameService } from "@/service/gameService";
import { ApplicationError } from "@/util/errorProtocol";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function createGame(req: Request, res: Response) {
    const { homeTeamName, awayTeamName } = req.body as { homeTeamName: string; awayTeamName: string };
	try {
		const game = await gameService.createGame(homeTeamName, awayTeamName);
		return res.status(httpStatus.CREATED).send(game);
	} catch (err: unknown) {
		const error = err as ApplicationError | Error;
		errorHandler(error, req, res);
	}
}

