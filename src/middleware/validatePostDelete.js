const { postService } = require('../services');

const validatePostDelete = async (id, userId) => {
  const post = await postService.getPostById(id);
  if (!post) {
    return { status: 404, data: { message: 'Post does not exist' } };
  }

  if (post.userId !== userId) {
    return { status: 401, data: { message: 'Unauthorized user' } };
  }
};

module.exports = validatePostDelete;