const route = require('express').Router();
const { userController } = require('../controllers');
const { validateUser } = require('../middleware');

route.post('/', validateUser, userController);

module.exports = route;