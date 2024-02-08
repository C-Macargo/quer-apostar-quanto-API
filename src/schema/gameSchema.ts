import Joi, { Schema } from "joi";

export const gameSchema: Schema = Joi.object({
  homeTeamName: Joi.string().required(),
  awayTeamName: Joi.string().required(),
});

export const finishGameSchema: Schema = Joi.object({
  homeTeamScore: Joi.number().strict().integer().greater(0).required(),
  awayTeamScore: Joi.number().strict().integer().greater(0).required(),
});
