import knex from 'knex';
import config from './config';

let db = null;

if (typeof global.database === 'object') {
  db = global.database;
} else {
  db = {
    client: 'mysql2',
    debug: false,
    connection: {
      host: config.db.host,
      user: config.db.user,
      password: config.db.pass,
      database: config.db.database,
      supportBigNumbers: true,
      bigNumberStrings: true,
      multipleStatements: true,
      timezone: 'UTC',
      dateStrings: true,
    },
    pool: {
      min: parseInt(config.db.pool_min || 0, 10),
      max: parseInt(config.db.pool_max || 1, 10),
    },
  };
}

// main connections
const main = knex(db);

export default {
  knex: main,
  raw: main.raw, // alias to knex.raw
};
