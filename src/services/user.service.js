const { User } = require('../models');

const getAllUsers = () => User.findAll();

const getUserByEmail = (email) => User.findOne({ where: { email } });

const getUserById = (id) => User.findOne({ where: { id } });

const createUser = (body) => User.create(body);

module.exports = {
  getAllUsers,
  getUserByEmail,
  getUserById,
  createUser,
};