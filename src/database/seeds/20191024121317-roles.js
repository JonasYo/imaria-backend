module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'roles',
      [
        {
          name: 'USER',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'MANAGER',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'ADMIN',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    ),
  down: queryInterface => queryInterface.bulkDelete('roles', null, {}),
};
