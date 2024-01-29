import { createGame } from "@/controller/gameController";
import { validateSchema } from "@/middleware/validateSchemaMiddleware";
import { gameSchema } from "@/schema/gameSchema";
import { Router } from "express";

const gameRouter = Router()

gameRouter.post('/',validateSchema(gameSchema),  createGame)

export default gameRouter