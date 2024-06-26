const sequelize = require('../db')
const {DataTypes} = require('sequelize');


const Student = sequelize.define('Student', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    surname: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    patronymic: {type: DataTypes.STRING, allowNull: false},
})

Student.associate = (models) => {
    Student.belongsTo(models.Group, {foreignKey: 'groupId'})
    Student.belongsTo(models.Account, {foreignKey: 'manager'})
    Student.hasMany(models.Presence, {foreignKey: 'studentId'})
}

module.exports = Student