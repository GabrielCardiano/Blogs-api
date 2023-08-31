const Joi = require('joi');

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required().messages({
    'string.min': '400|"displayName" length must be at least 8 characters long',
    'string.empty': '400|"displayName" length must be at least 8 characters long',
    'string.base': '400|"displayName" must be a string',
    'any.required': '400|"displayName" is required',
  }),
  email: Joi.string().email().required().messages({
    'any.required': '400|"email" must be a valid email',
    'string.empty': '400|"email" must be a valid email',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': '400|"password" length must be at least 6 characters long',
    'string.empty': '400|"password" length must be at least 6 characters long',
  }),
  image: Joi.string(),
});

const categoriesSchema = Joi.object({
  name: Joi.string().empty().required().messages({ // Joi object
    'any.required': '400|"name" is required',
    'string.empty': '400|"name" is required',
  }),
});

const requiredField = '400|Some required fields are missing';

const postSchema = Joi.object({
  title: Joi.string().required().messages({
    'any.required': requiredField,
    'string.empty': requiredField,
  }),
  content: Joi.string().required().messages({
    'any.required': requiredField,
    'string.empty': requiredField,
  }),
  categoryIds: Joi.array().items(Joi.number()).min(1).required()
.messages({
    'any.required': requiredField,
    'array.empty': '400|one or more "categoryIds" not found',
    'array.min': '400|one or more "categoryIds" not found',
    'array.base': '400|"categoryIds" must be an array',
  }),
});

module.exports = {
  userSchema,
  categoriesSchema,
  postSchema,
};