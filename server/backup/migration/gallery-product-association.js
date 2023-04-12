'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint('gallery', {
            fields: ['productId'],
            type: 'foreign key',
            name: 'gallery_product_assocition',
            references: {
                table: 'product',
                field: 'id'
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('product', {
            fields: ['productId'],
            type: 'foreign key',
            name: 'gallery_product_assocition',
            references: {
                table: 'product',
                field: 'id'
            }
        });
    }
};