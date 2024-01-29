import { createGame } from "@/controller/gameController";
import { validateSchema } from "@/middleware/validateSchemaMiddleware";
import { Router } from "express";

const gameRouter = Router()

gameRouter.post('/',  createGame)

export default gameRouter