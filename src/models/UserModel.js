import db from '../config/db';
import userType from '../types/user.json';

const { knex } = db;

class UserModel {
  static list() {
    return knex
      .from('user')
      .whereNot('user.status', userType.DELETED);
  }

  static get(userId) {
    return knex
      .first('id, name, status')
      .from('user')
      .where('user.id', userId)
      .whereNot('user.status', userType.DELETED);
  }

  static post(data) {
    return knex
      .from('user')
      .insert(data);
  }

  static put(userId, data) {
    const query = knex
      .from('user');

    if (data.name) {
      query.update('name', data.name);
    }

    query.where('user.id', userId)
      .whereNot('user.status', userType.DELETED);

    return query;
  }

  static delete(userId) {
    return knex
      .from('user')
      .where('user.id', userId)
      .whereNot('user.status', userType.DELETED)
      .update({
        status: userType.DELETED,
        deletedAt: knex.raw('NOW()'),
      });
  }
}

export default UserModel;
