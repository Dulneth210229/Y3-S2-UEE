module.exports = (schema, property = 'body') => (req, res, next) => {
  const { error, value } = schema.validate(req[property], { abortEarly: false, stripUnknown: true });
  if (error) return next(Object.assign(new Error('Validation error'), { status: 400, details: error.details }));
  req[property] = value;
  next();
};
