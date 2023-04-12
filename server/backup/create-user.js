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
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false
            },
            address: {
                type: Sequelize.STRING
            },
            roleid: {
                type: Sequelize.TINYINT,
                allowNull: false
            },
            gender: {
                type: Sequelize.BOOLEAN
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            deleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Users');
    }
}