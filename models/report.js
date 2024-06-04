const sequelize = require('../db')
const {DataTypes} = require('sequelize')


const Report = sequelize.define('Report', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    count: {type: DataTypes.INTEGER, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    images: {type: DataTypes.STRING, allowNull: false},
})

Report.associate = (models) => {
    Report.belongsTo(models.Lesson, {foreignKey: 'lessonId'})
  };


module.exports = Report