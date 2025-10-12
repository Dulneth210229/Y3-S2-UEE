const getPagination = (req) => {
  const page = Math.max(parseInt(req.query.page || '1'), 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit || '20'), 1), 100);
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};
module.exports = { getPagination };
