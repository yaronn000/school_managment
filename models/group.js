const sequelize = require('../db')
const {DataTypes} = require('sequelize')


const Group = sequelize.define('Group', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
})

Group.associate = (models) => {
    Group.hasMany(models.Lesson, {foreignKey: 'groupId'})
    Group.hasMany(models.Student, {foreignKey: 'groupId'})
}

module.exports = Group

