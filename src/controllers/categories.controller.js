const { categoriesService } = require('../services');

async function createCategories(req, res) {
  try {
    const { body } = req;
    const { dataValues } = await categoriesService.createService(body);
    return res.status(201).json(dataValues);
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
}

async function getAllCategories(_req, res) {
  try {
    const allCategories = await categoriesService.getCategories();
    return res.status(200).json(allCategories);
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
}

module.exports = {
  createCategories,
  getAllCategories,
};