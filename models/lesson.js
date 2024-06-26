const sequelize = require('../db')
const {DataTypes} = require('sequelize');
const Report = require('./report');
const Presence = require('./presence');


const Lesson = sequelize.define('Lesson', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    date: {type: DataTypes.DATEONLY, allowNull: false},
    time: {type: DataTypes.TIME, allowNull: false},
})

Lesson.associate = (models) => {
    Lesson.belongsTo(models.Account, {foreignKey: 'accountId'})
    Lesson.belongsTo(models.Group, {foreignKey: 'groupId'})
    Lesson.hasOne(models.Report, {foreignKey: 'lessonId'})
    Lesson.hasMany(models.Presence, {foreignKey: 'lessonId'}) 
}

module.exports = Lesson


