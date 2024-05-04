const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const db = {}
const basename = path.basename(__filename);
const models = path.join(__dirname) // correct it to path where your model files are

const sequelize = require('../db')

fs
  .readdirSync(models)
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(function (file) {
    // Sequelize version <= 5.x
    //var model = sequelize['import'](path.join(models, file))
    // Sequelize version >= 6.x
    var model = require(path.join(models, file))
    const modelTwo = new model(
       sequelize,
       Sequelize.DataTypes
     );
    db[model.name] = model;
  })

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

module.exports = db