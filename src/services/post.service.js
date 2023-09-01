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

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
};