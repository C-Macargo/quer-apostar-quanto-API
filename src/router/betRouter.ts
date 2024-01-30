import { createBet } from "@/controller/betController";
import { Router } from "express";

const betRouter = Router()

betRouter.post('/',  createBet)

export default betRouter