const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'secretJWT';
const jwtConfig = { algorithm: 'HS256', expiresIn: '3d' };

const createToken = (payload) => jwt.sign(payload, secret, jwtConfig);
const getPayload = (token) => jwt.verify(token, secret);

module.exports = { createToken, getPayload };