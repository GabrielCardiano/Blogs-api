const route = require('express').Router();
const { userController } = require('../controllers');
const { validateUser, validateJwt } = require('../middleware');

route.post('/', validateUser, userController.createUser);

// route.use(validateJwt); Outra forma de aplicar middleware às rotas 
route.get('/', validateJwt, userController.getAllUsers);
route.get('/:id', validateJwt, userController.getUser);

module.exports = route;