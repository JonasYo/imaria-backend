require('../bootstrap');

module.exports = {
  dialect: 'mysql',
  host: 'mysql669.umbler.com',
  port: 41890,
  username: 'rock01',
  password: 'jonasjonas',
  database: 'imaria_dev',
  storage: './__tests__/database.sqlite',
  logging: true,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
  timezone: '-03:00',
};

// module.exports = {
//   dialect: 'mysql',
//   host: '127.0.0.1',
//   port: 3306,
//   username: 'root',
//   // password: 'jonasjonas',
//   database: 'imaria_dev',
//   storage: './__tests__/database.sqlite',
//   logging: false,
//   define: {
//     timestamps: true,
//     underscored: true,
//     underscoredAll: true,
//   },
// };
