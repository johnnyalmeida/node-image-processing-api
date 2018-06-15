import knex from '../config/db';
import UserModel from '../models/UserModel';
import toUnixEpoch from '../helpers/Datetime';

class UserService {
  static async list() {
    const list = await UserModel.list();

    list.map(user => ({
      id: user.id,
      name: user.name,
      status: user.status,
      createdAt: toUnixEpoch(user.createdAt),
      updatedAt: toUnixEpoch(user.updatedAt),
      deletedAt: user.deletedAt ? toUnixEpoch(user.deletedAt) : null,
    }));

    return list;
  }

  static async get(data) {
    let user = await UserModel.get(data);

    if (user) {
      user = {
        id: user.id,
        name: user.name,
        status: user.status,
        createdAt: toUnixEpoch(user.createdAt),
        updatedAt: toUnixEpoch(user.updatedAt),
        deletedAt: user.deletedAt ? toUnixEpoch(user.deletedAt) : null,
      };
    }

    return user;
  }

  static post(data) {
    return UserModel.post(data);
  }

  static put(userId, data) {
    return knex.transaction(async (trx) => {
      const user = await UserModel.get(userId)
        .transacting(trx);

      if (user) {
        await UserModel.put(user.id, data)
          .transacting(trx);

        return true;
      }

      return false;
    });
  }

  static delete(userId, data) {
    return knex.transaction(async (trx) => {
      const user = await UserModel.get(userId)
        .transacting(trx);

      if (user) {
        await UserModel.delete(user.id, data)
          .transacting(trx);

        return true;
      }

      return false;
    });
  }
}

export default UserService;
