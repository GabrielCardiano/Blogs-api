const { validateBlogPostCategories } = require('../middleware');
const { postService } = require('../services');

async function createPost(req, res) {
  try {
    const { body } = req;
    const { categoryIds } = req.body;

    const categories = await validateBlogPostCategories(categoryIds);
    console.log('>>>>', categories);
    if (categories.includes(null)) {
        return res.status(400).json({ message: 'one or more "categoryIds" not found' });
    }

    const blogPost = await postService.createPost(body);
    return res.status(201).json(blogPost);
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
}

module.exports = {
  createPost,
};