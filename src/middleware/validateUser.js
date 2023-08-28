const { userSchema } = require('./schema');

const validFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateUser(req, res, next) {
  const { body } = req;

  const validEmail = validFormat.test(body.email);
  if (!validEmail) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }

  const { error } = userSchema.validate(body);
  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(Number(code)).json({ message });
  }
  return next();
}

module.exports = validateUser;