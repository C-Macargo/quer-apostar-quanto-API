import {
  createParticipant,
  findParticipants,
} from "@/controller/participantController";
import { StripHtml } from "@/middleware/stripHtmlMiddleware";
import { validateSchema } from "@/middleware/validateSchemaMiddleware";
import { participantSchema } from "@/schema/participantSchema";
import { Router } from "express";

const participantRouter = Router();

participantRouter.get("/", findParticipants);
participantRouter.post(
  "/",
  validateSchema(participantSchema),
  StripHtml(),
  createParticipant,
);

export default participantRouter;
