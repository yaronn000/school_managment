const sequelize = require('../db')
const {DataTypes} = require('sequelize');


const Presence = sequelize.define('Presence', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    feedback: {type: DataTypes.BOOLEAN, allowNull: false},
    homework: {type: DataTypes.BOOLEAN, allowNull: false},
})

Presence.associate = (models) => {
    Presence.belongsTo(models.Lesson, {foreignKey: 'lessonId'})
    Presence.belongsTo(models.Student, {foreignKey: 'studentId'})
  }; 

module.exports = Presence