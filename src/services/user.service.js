const { User } = require('../models');

const getAllUsers = () => User.findAll();

const getUserByEmail = (email) => User.findOne({ where: { email } });

const getUserById = (id) => User.findOne({ where: { id } });

const createUser = (body) => User.create(body);

const deleteUser = (id) => User.destroy({ where: { id } });

module.exports = {
  getAllUsers,
  getUserByEmail,
  getUserById,
  createUser,
  deleteUser,
};