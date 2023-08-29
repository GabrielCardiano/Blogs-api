const { categoriesSchema } = require('./schema');

const validateCategories = async (req, res, next) => {
  const { body } = req;
  const { error } = await categoriesSchema.validate(body);

  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(Number(code)).json({ message });
  }
  return next();
};

module.exports = validateCategories;
