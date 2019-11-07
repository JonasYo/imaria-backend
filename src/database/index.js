import Sequelize from 'sequelize';

import User from '../app/models/User';
import Services from '../app/models/Services';
import Schedules from '../app/models/Schedules';
import Times from '../app/models/Times';
import Role from '../app/models/Role';
import UserRole from '../app/models/UserRole';
import Tokens from '../app/models/Tokens';
import Device from '../app/models/Device';

import databaseConfig from '../config/database';

const models = [
  User,
  Services,
  Schedules,
  Times,
  Role,
  UserRole,
  Tokens,
  Device,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    try {
      this.connection = new Sequelize(databaseConfig);

      models
        .map(model => model.init(this.connection))
        .map(
          model => model.associate && model.associate(this.connection.models)
        );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

export default new Database();
