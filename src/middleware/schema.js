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

module.exports = { userSchema };