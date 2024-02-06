import {
  createParticipant,
  findParticipants,
} from "@/controller/participantController";
import { sanitizeString } from "@/middleware/sanitizeHtmlMiddleware";
import { validateSchema } from "@/middleware/validateSchemaMiddleware";
import { participantSchema } from "@/schema/participantSchema";
import { Router } from "express";

const participantRouter = Router();

participantRouter.get("/", findParticipants);
participantRouter.post(
  "/",
  validateSchema(participantSchema),
  sanitizeString(),
  createParticipant,
);

export default participantRouter;
