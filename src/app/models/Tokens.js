import { Model, DataTypes } from 'sequelize';

class Tokens extends Model {
  static init(sequelize) {
    super.init(
      {
        token: DataTypes.STRING,
        type: DataTypes.STRING,
        is_revoked: DataTypes.TINYINT,
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

export default Tokens;
