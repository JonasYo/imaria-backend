import { Model, DataTypes } from 'sequelize';

class Services extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        price: DataTypes.INTEGER,
        duration: DataTypes.INTEGER,
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
      foreignKey: 'service_id',
      as: 'services',
    });
  }
}

export default Services;
