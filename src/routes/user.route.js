const route = require('express').Router();
const { userController } = require('../controllers');
const { validateUser, validateJwt } = require('../middleware');

route.post('/', validateUser, userController.createUser);
route.get('/', validateJwt, userController.getAllUsers);

module.exports = route;