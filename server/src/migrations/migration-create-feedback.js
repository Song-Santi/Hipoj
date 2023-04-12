'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Feedbacks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullname: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING(15)
      },
      subject: {
        type: Sequelize.STRING
      },
      note: {
        allowNull: false,
        type: Sequelize.STRING(1000)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Feedbacks');
  }
};
