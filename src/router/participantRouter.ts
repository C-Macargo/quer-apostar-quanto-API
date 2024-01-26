import { createParticipant, findParticipants } from "@/controller/participantController";
import { Router } from "express";

const participantRouter = Router()

participantRouter.get('/', findParticipants)
participantRouter.post('/', createParticipant)

export default participantRouter