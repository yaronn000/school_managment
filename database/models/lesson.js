'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Lesson.init({
    date: DataTypes.DATEONLY,
    time: DataTypes.TIME,
    accountId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER 
  }, {
    sequelize,
    modelName: 'Lesson',
  });
  return Lesson;
};