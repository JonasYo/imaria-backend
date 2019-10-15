import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        phone: Sequelize.INTEGER,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
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

  static associate() {
    // this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }
}

export default User;
