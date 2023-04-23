'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idCode: {
        allowNull: false,
        type: Sequelize.STRING(10)
      },
      title: {
        //allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        //allowNull: false,
        type: Sequelize.TEXT
      },
      image: {
        type: Sequelize.STRING
      },
      categoryId: {
        //allowNull: false,
        type: Sequelize.INTEGER
      },
      discount: {
        type: Sequelize.INTEGER
      },
      buyingPrice: {
        type: Sequelize.DECIMAL(10, 2)  
      },
      sellingPrice: {
        type: Sequelize.DECIMAL(10, 2)  
      },
      listingPrice: {
        type: Sequelize.DECIMAL(10, 2)  
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
        type: Sequelize.TINYINT(1),
        defaultValue: 0
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};