import { Model, DataTypes } from 'sequelize';

class Times extends Model {
  static init(sequelize) {
    super.init(
      {
        hour: DataTypes.STRING,
        active: DataTypes.TINYINT,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Schedules, {
      foreignKey: 'hour_id',
      as: 'hours',
    });
  }
}

export default Times;
