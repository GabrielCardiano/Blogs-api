const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'secretJWT';
const jwtConfig = { algorithm: 'HS256', expiresIn: '3d' };

const createToken = (payload) => jwt.sign(payload, secret, jwtConfig);
const decodeToken = (authToken) => jwt.verify(authToken, secret);

module.exports = { createToken, decodeToken };