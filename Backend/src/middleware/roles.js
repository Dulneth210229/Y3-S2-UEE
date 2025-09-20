export function onlyAdmin(req, res, next) {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Admins only' });
  next();
}

export function onlyEmployerOrAdmin(req, res, next) {
  const role = req.user?.role;
  if (role === 'employer' || role === 'admin') return next();
  return res.status(403).json({ message: 'Employers or admins only' });
}
