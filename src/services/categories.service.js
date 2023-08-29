const { Category } = require('../models');

const createService = (body) => Category.create(body);

module.exports = {
  createService,
};