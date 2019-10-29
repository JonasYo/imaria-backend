import { Model, DataTypes } from 'sequelize';

class Schedules extends Model {
  static init(sequelize) {
    super.init(
      {
        date_start: DataTypes.DATE,
        date_end: DataTypes.DATE,
        realized: DataTypes.TINYINT,
        active: DataTypes.TINYINT,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Services, {
      foreignKey: 'service_id',
      as: 'services',
    });
    this.belongsTo(models.Times, { foreignKey: 'hour_id', as: 'hour' });
  }
}

export default Schedules;
