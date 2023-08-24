'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('rooms', [
      {
        title: 'Room 1',
        participant_limit: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Room 2',
        participant_limit: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Room 3',
        participant_limit: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Room 4',
        participant_limit: 25,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Room 5',
        participant_limit: 30,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('rooms', null, {});
  }
};
