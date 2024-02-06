import {
  createGame,
  findGameById,
  findGames,
  finishGame,
} from "@/controller/gameController";
import { StripHtml } from "@/middleware/stripHtmlMiddleware";
import { validateSchema } from "@/middleware/validateSchemaMiddleware";
import { gameSchema } from "@/schema/gameSchema";
import { Router } from "express";

const gameRouter = Router();

gameRouter.post("/", validateSchema(gameSchema), StripHtml(), createGame);
gameRouter.get("/", findGames);
gameRouter.get("/:gameId", findGameById);
gameRouter.post("/:gameId/finish", finishGame);

export default gameRouter;
