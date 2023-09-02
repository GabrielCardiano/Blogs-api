const route = require('express').Router();
const { postController } = require('../controllers');
const { validateJwt, validatePost } = require('../middleware');

// route.use(validateJwt);
route.post('/', validatePost, validateJwt, postController.createPost);
route.get('/', validateJwt, postController.getAllPosts);
route.get('/:id', validateJwt, postController.getPostById);
route.put('/:id', validateJwt, postController.updatePost);

module.exports = route;