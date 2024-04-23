const sequelize = require('../db')
const {DataTypes} = require('sequelize')
const Lesson = require('./lesson')
const Student = require('./student')


const Group = sequelize.define('Group', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
})

Group.hasMany(Lesson, {foreignKey: 'groupId'})
Group.hasMany(Student, {foreignKey: 'groupId'})

module.exports = Group