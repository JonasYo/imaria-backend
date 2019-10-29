import { Model } from 'sequelize';

class UserRole extends Model {
  static init(sequelize) {
    super.init(
      {},
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
