const validateUser = require('./validateUser');
const validateJwt = require('./validateJWT');
const validateCategories = require('./validateCategories');
const validatePost = require('./validatePost');
const validateBlogPostCategories = require('./validadeBlogPostCategories');
const validatePostDelete = require('./validatePostDelete');

module.exports = {
    validateUser,
    validateJwt,
    validateCategories,
    validatePost,
    validateBlogPostCategories,
    validatePostDelete,
};