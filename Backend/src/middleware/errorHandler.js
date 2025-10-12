module.exports = (err, req, res, next) => {
  console.error('ERR:', err);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    error: {
      message: err.message || 'Server error',
      code: err.code || 'SERVER_ERROR',
      details: err.details || undefined
    }
  });
};
