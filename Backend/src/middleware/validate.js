// export default (schema, property = 'body') => (req, res, next) => {
//   const { error, value } = schema.validate(req[property], { abortEarly: true, stripUnknown: true });
//   if (error) return res.status(400).json({ message: error.details[0].message });
//   req[property] = value;
//   next();
// };

export default (schema, property = 'body') => (req, res, next) => {
  const { error, value } = schema.validate(req[property], {
    abortEarly: true,
    stripUnknown: true
  });

  if (error) return res.status(400).json({ message: error.details[0].message });

  if (property === 'query') {
    // mutate existing query object
    Object.assign(req.query, value);
  } else {
    req[property] = value;
  }

  next();
};

