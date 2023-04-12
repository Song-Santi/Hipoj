'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING(50)
      },
      lastName: {
        type: Sequelize.STRING(50)
      },
      gender: {
        type: Sequelize.STRING(10)
      },
      birthday: {
        type: Sequelize.DATEONLY
      },
      phone: {
        type: Sequelize.STRING(15)
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(60)
      },
      company: {
        type: Sequelize.STRING(100)
      },
      website: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    await queryInterface.dropTable('Users');
  }
};