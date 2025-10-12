const jwt = require('jsonwebtoken');

const issueTokens = (user) => {
  const payload = { sub: user._id.toString(), role: user.role };
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
  return { accessToken, refreshToken };
};

module.exports = { issueTokens };
