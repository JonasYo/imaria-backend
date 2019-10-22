/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'times',
      [
        {
          hour: '08:30',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          hour: '09:00',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          hour: '09:30',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          hour: '10:00',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          hour: '10:30',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    ),

  down: queryInterface => queryInterface.bulkDelete('times', null, {}),
};
