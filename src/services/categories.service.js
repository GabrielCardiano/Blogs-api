const { Category } = require('../models');

const createService = (body) => Category.create(body);
const getCategories = () => Category.findAll();

module.exports = {
  createService,
  getCategories,
};