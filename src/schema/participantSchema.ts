import Joi, { Schema } from "joi";

export const participantSchema: Schema = Joi.object({
  name: Joi.string().required(),
  balance: Joi.number().strict().min(10000).required(),
});
