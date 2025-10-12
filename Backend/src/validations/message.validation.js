const Joi = require('joi');

const create = Joi.object({
  body: Joi.string().min(1).required()
});

module.exports = { create };
