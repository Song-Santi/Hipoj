'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'Song',
      email: 'example@example.com',
      address: 'NamDinh',
      roleId: 1,
      gender: '1',
      createdAt: new Date(),

    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
