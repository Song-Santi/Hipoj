'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      orderDate: {
        type: Sequelize.DATE
      },
      orderStatusId: {
        type: Sequelize.INTEGER
      },
      receiverName: {
        type: Sequelize.STRING(50)
      },
      shippingAddress: {
        type: Sequelize.STRING
      },
      receiverPhone: {
        type: Sequelize.STRING(15)
      },
      totalMoney: {
        type: Sequelize.DECIMAL(10,2)
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};