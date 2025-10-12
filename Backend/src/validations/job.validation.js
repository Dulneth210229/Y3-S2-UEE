const Joi = require('joi');

const create = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(''),
  category: Joi.string().required(),
  requiredSkills: Joi.array().items(Joi.string()).default([]),
  payMin: Joi.number().min(0),
  payMax: Joi.number().min(Joi.ref('payMin')),
  locationName: Joi.string().allow(''),
  location: Joi.object({ lat: Joi.number(), lng: Joi.number() }),
  employmentType: Joi.string().allow(''),
  language: Joi.string().allow(''),
  contact: Joi.string().allow('')
});

const update = create;

module.exports = { create, update };
