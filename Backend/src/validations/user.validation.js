const Joi = require('joi');

const profile = Joi.object({
  name: Joi.string().allow(''),
  photo: Joi.string().uri().allow(''),
  locationName: Joi.string().allow(''),
  location: Joi.object({ lat: Joi.number(), lng: Joi.number() }),
  educationLevel: Joi.string().allow(''),
  experienceYears: Joi.number().min(0),
  skills: Joi.array().items(Joi.string()),
  preferredJobTypes: Joi.array().items(Joi.string()),
  languages: Joi.array().items(Joi.string()),
  posterType: Joi.string().valid('individual', 'company'),
  companyName: Joi.string().allow(''),
  contactPhone: Joi.string().allow(''),
  verified: Joi.boolean()
});

module.exports = { profile };
