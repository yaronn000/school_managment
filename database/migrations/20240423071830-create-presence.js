'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Presences', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      feedback: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      homework: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      lessonId: {
        allowNull: false,
        references: {         
          model: 'Lessons',
          key: 'id'
        },
        type: Sequelize.INTEGER
      },
      studentId: {
        allowNull: false,
        references: {         
          model: 'Students',
          key: 'id'
        },
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Presences');
  }
};