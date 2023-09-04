const { BlogPost, sequelize, PostCategory, User, Category } = require('../models');

const createPost = async (body) => {
  const { title, content, categoryIds } = body;
  const { id: userId } = body.payload.data;

  const createBlogPost = await sequelize.transaction(async (t) => {
    const postPublish = new Date();
    const newPost = await BlogPost.create(
      { title, content, userId, published: postPublish, updated: postPublish },
      { transaction: t },
    );

    const postCategory = categoryIds.map((categoryId) => ({ postId: newPost.id, categoryId }));
    await PostCategory.bulkCreate(postCategory, { transaction: t });

    return newPost;
  });

  return createBlogPost;
};

const getAllPosts = () => BlogPost.findAll({
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
});

const getPostById = (id) => BlogPost.findByPk(id, {
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
});

const updatePost = async (postId, userId, body) => {
  const { title, content } = body;

  const post = await getPostById(postId);

  if (!post) {
    return { status: 404, data: { message: 'Post does not exist!' } };
  }
  if (!title || !content) {
    return { status: 400, data: { message: 'Some required fields are missing' } };
  }
  if (userId !== post.dataValues.userId) {
    return { status: 401, data: { message: 'Unauthorized user' } };
  }
  await BlogPost.update(
    { title, content },
    { where: { id: postId } },
  );

  const updatedPost = await getPostById(postId);
  return { status: 200, data: updatedPost };
};

const deletePost = (id) => BlogPost.destroy({ where: { id } });

module.exports = { createPost, getAllPosts, getPostById, updatePost, deletePost };