import {
  createGame,
  findGameById,
  findGames,
  finishGame,
} from "@/controller/gameController";
import { sanitizeString } from "@/middleware/sanitizeHtmlMiddleware";
import { validateSchema } from "@/middleware/validateSchemaMiddleware";
import { finishGameSchema, gameSchema } from "@/schema/gameSchema";
import { Router } from "express";

const gameRouter = Router();

gameRouter.post("/", validateSchema(gameSchema), sanitizeString(), createGame);
gameRouter.get("/", findGames);
gameRouter.get("/:gameId", findGameById);
gameRouter.post(
  "/:gameId/finish",
  validateSchema(finishGameSchema),
  finishGame,
);

export default gameRouter;
