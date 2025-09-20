import Joi from 'joi';
import { EDUCATION_LEVELS } from '../utils/levels.js';

export const searchSeekersQuery = Joi.object({
  minEducation: Joi.string().valid(...EDUCATION_LEVELS).default('none'),
  skill: Joi.string().max(50).allow('', null),
  minTrust: Joi.number().integer().min(0).max(100).default(0),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(50).default(10),
  sort: Joi.string().valid('trust','-trust','recent','-recent').default('-trust')
});
