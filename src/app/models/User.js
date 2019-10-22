import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.INTEGER,
        password: DataTypes.VIRTUAL,
        password_hash: DataTypes.STRING,
        active: DataTypes.TINYINT,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      const { password } = user;

      if (password) {
        user.password_hash = await bcrypt.hash(password, 8);
      }
    });

    return this;
  }

  async checkPassword(password) {
    const res = await bcrypt.compare(password, this.password_hash);
    return res;
  }

  static associate(models) {
    this.hasMany(models.Schedules, { foreignKey: 'user_id', as: 'schedules' });
  }
}

export default User;
