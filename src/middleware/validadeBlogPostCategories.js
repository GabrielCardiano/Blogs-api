const { Category } = require('../models');

async function validateBlogPostCategories(categoriesIds) {
  const promises = categoriesIds.map(async (id) => Category.findByPk(id));
  const resolvedPromises = await Promise.all(promises);    
 return resolvedPromises;
}

module.exports = validateBlogPostCategories;