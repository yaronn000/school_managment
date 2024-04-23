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
    Lesson.belongsTo(models.Account)
  };
Lesson.associate = (models) => {
    Lesson.belongsTo(models.Group)
  };

Lesson.hasMany(Report, {foreignKey: 'lessonId'})
Lesson.hasMany(Presence, {foreignKey: 'lessonId'}) 

module.exports = Lesson