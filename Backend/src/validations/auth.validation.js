const Joi = require('joi');

const register = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('Admin', 'JobSeeker', 'JobPoster').default('JobSeeker')
});

const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const refresh = Joi.object({ refreshToken: Joi.string().required() });

module.exports = { register, login, refresh };
