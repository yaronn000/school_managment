const sequelize = require('../db')
const {DataTypes} = require('sequelize')
const Account = require('./account')

const Role = sequelize.define('Role', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
})

Role.associate = (models) => {
    Role.hasMany(models.Account, {foreignKey: 'roleId'})
};


module.exports = Role
