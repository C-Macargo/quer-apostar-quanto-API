import Joi, { Schema } from "joi";

export const betSchema: Schema = Joi.object({
  homeTeamScore: Joi.number().strict().required(),
  awayTeamScore: Joi.number().strict().required(),
  amountBet: Joi.number().strict().required(),
  gameId: Joi.number().strict().required(),
  participantId: Joi.number().strict().required(),
});
