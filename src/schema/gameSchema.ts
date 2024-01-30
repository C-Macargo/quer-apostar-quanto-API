import Joi, { Schema } from "joi";

export const gameSchema: Schema = Joi.object({
  homeTeamName: Joi.string().required(),
  awayTeamName: Joi.string().required(),
});
