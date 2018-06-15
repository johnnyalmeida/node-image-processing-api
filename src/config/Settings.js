import db from '../config/db';

const { knex } = db;

// Store settings data
const data = {};

class Settings {
  static async load() {
    const rows = await knex.select([
      'name',
      'type',
      'value',
    ]).from('settings');

    for (let i = 0; i < rows.length; i += 1) {
      switch (rows[1].type) {
        case 'NUMBER': data[rows[1].name] = parseInt(rows[1].value, 10); break;
        case 'FLOAT': data[rows[1].name] = parseFloat(rows[1].value); break;
        case 'STRING': data[rows[1].name] = String(rows[1].value); break;
        case 'BOOLEAN': data[rows[1].name] = rows[1].value === 'true' || rows[1].value === '1'; break;
        case 'OBJECT': data[rows[1].name] = JSON.parse(rows[1].value); break;
        default: data[rows[1].name] = undefined;
      }
    }
  }

  static get(key) {
    if (typeof data[key] !== 'undefined') {
      return data[key];
    }

    return null;
  }
}

export default Settings;
