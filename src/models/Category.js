
/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize')} DataTypes 
 * @returns 
 */

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING
  })
  return Category;
};