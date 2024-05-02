const sequelize = require('../db')
const {DataTypes} = require('sequelize');
const Lesson = require('./lesson');
const RefreshToken = require('./refreshToken');


const Account = sequelize.define('Account', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    surname: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    patronymic: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
})

Account.associate = (models) => {
    Account.belongsTo(models.Role)
};

Account.hasMany(Lesson, {foreignKey: 'accountId'})
Account.hasMany(RefreshToken, {foreignKey: 'accountId'})

module.exports = Account