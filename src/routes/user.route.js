const route = require('express').Router();
const { userController } = require('../controllers');
const { validateUser, validateJwt } = require('../middleware');

route.post('/', validateUser, userController.createUser);

route.use(validateJwt); // Outra forma de aplicar middleware às rotas 
route.get('/', userController.getAllUsers);
route.get('/:id', userController.getUser);
route.delete('/me', userController.deleteUser);

module.exports = route;