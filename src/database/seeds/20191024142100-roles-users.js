module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'user_roles',
      [
        {
          user_id: 1,
          role_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 1,
          role_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 1,
          role_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    ),
  down: queryInterface => queryInterface.bulkDelete('user_roles', null, {}),
};
