module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('times', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      hour: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      is_actived: {
        type: Sequelize.TINYINT,
        defaultValue: '1',
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable('times');
  },
};
