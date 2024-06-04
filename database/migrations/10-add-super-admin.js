'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Accounts', [{
      id: 1,
      surname: 'Ivanov',
      name: 'Ivan',
      patronymic: 'Ivanovich',
      email: 'super_admin@mail.com',
      password: '$2b$05$rCpF90i0l5k3biGb5/hav.WBHTZwkHKufySRzb6F2lWOvhe1S/YF2', //12345
      roleId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: function(queryInterface, Sequelize) {

    return queryInterface.bulkDelete("Accounts", { id: 1 });
    
    }
};