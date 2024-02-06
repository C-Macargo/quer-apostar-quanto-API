import {
  createGame,
  findGameById,
  findGames,
  finishGame,
} from "@/controller/gameController";
import { sanitizeString } from "@/middleware/sanitizeHtmlMiddleware";
import { validateSchema } from "@/middleware/validateSchemaMiddleware";
import { gameSchema } from "@/schema/gameSchema";
import { Router } from "express";

const gameRouter = Router();

gameRouter.post("/", validateSchema(gameSchema), sanitizeString(), createGame);
gameRouter.get("/", findGames);
gameRouter.get("/:gameId", findGameById);
gameRouter.post("/:gameId/finish", finishGame);

export default gameRouter;
