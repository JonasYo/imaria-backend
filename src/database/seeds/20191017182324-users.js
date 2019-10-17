/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [], {}),

  down: queryInterface => queryInterface.bulkDelete('users', null, {}),
};
