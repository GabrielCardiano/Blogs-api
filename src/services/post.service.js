const { BlogPost, sequelize, PostCategory } = require('../models');

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

const getAllPosts = (request) => BlogPost.findAll(request);

module.exports = {
    createPost,
    getAllPosts,
};