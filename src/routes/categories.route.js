const route = require('express').Router();
const { categoriesController } = require('../controllers');
const { validateCategories, validateJwt } = require('../middleware');

route.post('/', validateCategories, validateJwt, categoriesController.createCategories);
route.get('/', validateJwt, categoriesController.getAllCategories);

module.exports = route;