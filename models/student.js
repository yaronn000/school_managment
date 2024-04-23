const sequelize = require('../db')
const {DataTypes} = require('sequelize');
const Presence = require('./presence');


const Student = sequelize.define('Student', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    surname: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    manager: {type: DataTypes.STRING, allowNull: false},
})

Student.associate = (models) => {
    Student.belongsTo(models.Group)
  };

Student.hasMany(Presence, {foreignKey: 'studentId'})

module.exports = Student