import { Model, DataTypes } from 'sequelize';

class Device extends Model {
  static init(sequelize) {
    super.init(
      {
        notification_id: DataTypes.STRING,
        name: DataTypes.STRING,
        platform: DataTypes.STRING,
        is_actived: DataTypes.TINYINT,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default Device;
