const sequelize = require('../db')
const {DataTypes} = require('sequelize');


const RefreshToken = sequelize.define('RefreshToken', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    refreshToken: {type: DataTypes.TEXT, allowNull: false},
})

RefreshToken.associate = (models) => {
    RefreshToken.belongsTo(models.Account, {foreignKey: 'accountId'})
  };

module.exports = RefreshToken