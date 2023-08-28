const { User } = require('../models');

const getUserByEmail = (email) => User.findOne({ where: { email } });

const createUser = async (body) => User.create(body); // verificar se parametros estão certos

module.exports = {
  getUserByEmail,
  createUser,
};