/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Jonas',
          email: 'jonas@jonas.com',
          phone: 4444444444,
          password_hash:
            '$2a$08$Yvs0MP8lUYB8BVBYHf007ec9hRamf5WvqZ9eiANeSNXvBe4QokeBG',
          active: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    ),

  down: queryInterface => queryInterface.bulkDelete('users', null, {}),
};
