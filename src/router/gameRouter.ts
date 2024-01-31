import {
  createGame,
  findGameById,
  findGames,
  finishGame,
} from "@/controller/gameController";
import { validateSchema } from "@/middleware/validateSchemaMiddleware";
import { gameSchema } from "@/schema/gameSchema";
import { Router } from "express";

const gameRouter = Router();

gameRouter.post("/", validateSchema(gameSchema), createGame);
gameRouter.get("/", findGames);
gameRouter.get("/:gameId", findGameById);
gameRouter.post("/:gameId", finishGame);

export default gameRouter;
