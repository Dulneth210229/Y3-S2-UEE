const Joi = require('joi');

const createJobPostSession = Joi.object({
  jobId: Joi.string().required()
});

module.exports = { createJobPostSession };
