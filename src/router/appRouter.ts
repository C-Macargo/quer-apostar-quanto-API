import { Router } from "express";
import participantRouter from "./participantRouter";
import gameRouter from "./gameRouter";
import betRouter from "./betRouter";

const appRouter = Router();

appRouter.use("/participants", participantRouter);
appRouter.use("/games", gameRouter);
appRouter.use("/bets", betRouter);

export default appRouter;
