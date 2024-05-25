'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Roles', [{
      name: 'ADMIN',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'USER',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};