require('../bootstrap');

module.exports = {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
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
//   logging: false,
//   define: {
//     timestamps: true,
//     underscored: true,
//     underscoredAll: true,
//   },
//   timezone: '-03:00',
// };
