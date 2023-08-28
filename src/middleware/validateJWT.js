const { decodeToken } = require('../auth/authfunctions');
// const userService = require('../services');

const validateJwt = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const token = authorization.split(' ')[1];
    const payload = decodeToken(token);
    // req.user = payload;
    req.body = { ...req.body, payload };
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
  return next();
};

module.exports = validateJwt;