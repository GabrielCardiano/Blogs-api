const { userSchema } = require('./schema');

function validateUser(req, res, next) {
  const { body } = req;

  const { error } = userSchema.validate(body);
  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(Number(code)).json({ message });
  }
  return next();
}

module.exports = validateUser;