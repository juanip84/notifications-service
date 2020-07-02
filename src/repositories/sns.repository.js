let AWS = require('aws-sdk');
const { promisify } = require('util');
const { sns, env } = require('../conf/config');

const snsCred = { apiVersion: '2010-03-31', region: sns.region };

if (env && env === 'local') {
  snsCred.endpoint = 'http://localstack:4575';
}

const snsObject = new AWS.SNS(snsCred);
snsObject.publish = promisify(snsObject.publish);

class snsRepository {
  static async sendSMS(msg, phoneNumber) {
    const params = {
      Message: msg,
      PhoneNumber: phoneNumber,
    };

    return snsObject.publish(params);
  }
}

module.exports = snsRepository;