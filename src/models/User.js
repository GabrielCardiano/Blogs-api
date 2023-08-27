/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize')} DataTypes
 */

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    displayName: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    tableName: 'users',
    underscored: true,
    timestamps: false,
  })
  return User;
}