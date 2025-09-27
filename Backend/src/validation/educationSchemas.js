import Joi from 'joi';
import { EDUCATION_LEVELS } from '../utils/levels.js';

export const addEducationSchema = Joi.object({
  level: Joi.string().valid(...EDUCATION_LEVELS).required(),
  field: Joi.string().max(100).allow('', null),
  institution: Joi.string().max(150).allow('', null),
  year: Joi.number().integer().min(1900).max(new Date().getFullYear()).allow(null),
  certificateUrl: Joi.string().uri().allow('', null)
});

export const setHighestSchema = Joi.object({
  level: Joi.string().valid(...EDUCATION_LEVELS).required()
});
