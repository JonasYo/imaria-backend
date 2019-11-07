import { Model, DataTypes } from 'sequelize';

class UserRole extends Model {
  static init(sequelize) {
    super.init(
      {
        is_actived: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'userRoles' });
    this.belongsTo(models.Role, { foreignKey: 'role_id', as: 'roles' });
  }
}

export default UserRole;
