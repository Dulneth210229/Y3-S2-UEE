import Joi from 'joi';

export const signupSchema = Joi.object({
  role: Joi.string().valid('job_seeker','employer','admin').required(),
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().allow('', null),
  password: Joi.string().min(6).required()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});
