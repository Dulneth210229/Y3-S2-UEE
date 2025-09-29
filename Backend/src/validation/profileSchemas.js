import Joi from "joi";

export const updateProfileSchema = Joi.object({
  location: Joi.string().max(120).allow("", null),
  bio: Joi.string().max(400).allow("", null),
  skills: Joi.array().items(Joi.string().max(40)).default([]),
  profilePublic: Joi.boolean().optional(),
});
