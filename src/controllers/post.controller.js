const { validateBlogPostCategories } = require('../middleware');
const { postService } = require('../services');

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
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
}

async function getAllPosts(_req, res) {
  try {
    const allPosts = await postService.getAllPosts();
    return res.status(200).json(allPosts);
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
}

async function getPostById(req, res) {
  try {
    const { id } = req.params;
    const postById = await postService.getPostById(id);
    if (!postById) {
      return res.status(404).json({ message: 'Post does not exist' });
    }
    return res.status(200).json(postById);
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
}

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
};