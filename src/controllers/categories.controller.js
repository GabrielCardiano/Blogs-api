const { categoriesService } = require('../services');

async function createCategories(req, res) {
  try {
    const { body } = req;
    // if (!body.name) {
    //   return res.status(400).json({ message: '"name" is required' });
    // }

    const { dataValues } = await categoriesService.createService(body);
    return res.status(201).json(dataValues);
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
}

module.exports = {
  createCategories,
};