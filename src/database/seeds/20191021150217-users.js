module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Jonas',
          email: 'jonas@jonas.com',
          phone: 4444444444,
          date_birth: '27-09-2997',
          password_hash:
            '$2a$08$Yvs0MP8lUYB8BVBYHf007ec9hRamf5WvqZ9eiANeSNXvBe4QokeBG',
          is_actived: 1,
          alias: 'NORMAL',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'I maria',
          email: 'imaria@imaria.com',
          phone: 4444444444,
          date_birth: '27-09-1997',
          password_hash:
            '$2a$08$Yvs0MP8lUYB8BVBYHf007ec9hRamf5WvqZ9eiANeSNXvBe4QokeBG',
          is_actived: 1,
          alias: 'NORMAL',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    ),

  down: queryInterface => queryInterface.bulkDelete('users', null, {}),
};
