const Joi = require('joi');

const create = Joi.object({
  jobId: Joi.string().required()
});

const update = Joi.object({
  status: Joi.string().valid('applied', 'shortlisted', 'hired', 'rejected').required()
});

module.exports = { create, update };
