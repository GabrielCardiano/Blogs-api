const { validateBlogPostCategories, validatePostDelete } = require('../middleware');
const { postService } = require('../services');

const error = 'Erro interno';
async function createPost(req, res) {
  try {
    const { body } = req;
    const { categoryIds } = req.body;
    const categories = await validateBlogPostCategories(categoryIds);
    if (categories.includes(null)) {
      return res.status(400).json({ message: 'one or more "categoryIds" not found' });
    }
    const blogPost = await postService.createPost(body);
    return res.status(201).json(blogPost);
  } catch (err) {
    return res.status(500).json({ message: error, error: err.message });
  }
}
async function getAllPosts(_req, res) {
  try {
    const allPosts = await postService.getAllPosts();
    return res.status(200).json(allPosts);
  } catch (err) {
    return res.status(500).json({ message: error, error: err.message });
  }
}
async function getPostById(req, res) {
  try {
    const { id } = req.params;
    const postById = await postService.getPostById(id);
    if (!postById) return res.status(404).json({ message: 'Post does not exist' });
    return res.status(200).json(postById);
  } catch (err) {
    return res.status(500).json({ message: error, error: err.message });
  }
}
async function updatePost(req, res) {
  try {
    const { body } = req;
    const { id: postId } = req.params;
    const { id: userId } = body.payload.data;
    const { status, data } = await postService.updatePost(postId, userId, body);
    return res.status(status).json(data);
  } catch (err) {
    return res.status(500).json({ message: error, error: err.message });
  }
}
async function deletePost(req, res) {
  try {
    const { id } = req.params;
    const userId = req.body.payload.data.id;
    const isValid = await validatePostDelete(id, userId);
    if (isValid) { return res.status(isValid.status).json(isValid.data); }
    await postService.deletePost(id);
    return res.status(204).end();
  } catch (err) {
    return res.status(500).json({ message: error, error: err.message });
  }
}
async function searchPost(req, res) {
  try {
    const { q } = req.query;
  const response = await postService.searchPost(q);
  return res.status(response.status).json(response.data);
  } catch (err) {
    return res.status(500).json({ message: error, error: err.message });
  }
}
module.exports = { createPost, getAllPosts, getPostById, updatePost, deletePost, searchPost };