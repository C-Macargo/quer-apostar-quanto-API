import { createBet } from "@/controller/betController";
import { validateSchema } from "@/middleware/validateSchemaMiddleware";
import { betSchema } from "@/schema/betSchema";
import { Router } from "express";

const betRouter = Router();

betRouter.post("/", validateSchema(betSchema), createBet);

export default betRouter;
