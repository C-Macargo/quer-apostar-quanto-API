import { participantService } from "@/service/participantService";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function findParticipants(req: Request, res: Response) {
	try {
		const participants = await participantService.findParticipants();
		return res.status(httpStatus.OK).send(participants);
	} catch (error: unknown) {
		console.error(error);
		return res
			.status(httpStatus.INTERNAL_SERVER_ERROR)
			.send({ error: "Internal Server Error" });
	}
}

export async function createParticipant(req: Request, res: Response) {
    const { name, balance } = req.body as { name: string; balance: number };
    try {
        const participant = await participantService.createParticipant(name, balance)
		return res.status(httpStatus.CREATED).send({});
	} catch (error: unknown) {
		console.error(error);
		return res
			.status(httpStatus.INTERNAL_SERVER_ERROR)
			.send({ error: "Internal Server Error" });
	}
}

