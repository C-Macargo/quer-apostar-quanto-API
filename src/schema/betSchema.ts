import Joi, { Schema } from "joi";

export const betSchema: Schema = Joi.object({
  homeTeamScore: Joi.number().strict().integer().greater(0).required(),
  awayTeamScore: Joi.number().strict().integer().greater(0).required(),
  amountBet: Joi.number().strict().integer().greater(0).required(),
  gameId: Joi.number().strict().required(),
  participantId: Joi.number().strict().required(),
});
