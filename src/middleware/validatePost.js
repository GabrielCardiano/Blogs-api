const { postSchema } = require('./schema');

function validatePost(req, res, next) {
  const { body } = req;
  const { error } = postSchema.validate(body);
  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(Number(code)).json({ message });
  }
  next();
}

module.exports = validatePost;