require('../bootstrap');

module.exports = {
  dialect: 'mysql',
  host: 'mysql669.umbler.com',
  port: 41890,
  username: 'rock01',
  password: 'jonasjonas',
  database: 'imaria_dev',
  storage: './__tests__/database.sqlite',
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
