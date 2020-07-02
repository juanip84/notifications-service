const snsRepository = require('../repositories/sns.repository');
const twilioRepository = require('../repositories/twilio.repository');

class smsService {
  static async send(msg, phoneNumber, channel) {

    if (channel === 'sns')
      return snsRepository.sendSMS(msg, phoneNumber);
    else if (channel === 'twilio') 
      return twilioRepository.sendSMS(msg, phoneNumber);
  }
}

module.exports = smsService;