import moment from 'moment-timezone';

class Datetime {
  static toUnixEpoch(dateString) {
    return moment.utc(dateString).valueOf();
  }
}

export default Datetime;
