import { createGame, findGames } from "@/controller/gameController";
import { validateSchema } from "@/middleware/validateSchemaMiddleware";
import { gameSchema } from "@/schema/gameSchema";
import { Router } from "express";

const gameRouter = Router()

gameRouter.post('/',validateSchema(gameSchema),  createGame)
gameRouter.get('/',  findGames)

export default gameRouter