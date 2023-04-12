'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint('products', {
            fields: ['categoryId'],
            type: 'foreign key',
            name: 'product_category_assocition',
            references: {
                table: 'categories',
                field: 'id'
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('product', {
            fields: ['categoryId'],
            type: 'foreign key',
            name: 'product_category_assocition',
            references: {
                table: 'category',
                field: 'id'
            }
        });
    }
};