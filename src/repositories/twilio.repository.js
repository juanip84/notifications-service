const config = require('../conf/config');
const client = require('twilio')(config.twilio.sid, config.twilio.authToken);

class twilioRepository {
    static async sendSMS(msg, phoneNumber) {
        return client.messages.create({
          body: msg,
          messagingServiceSid: config.twilio.messagingServiceSid,
          to: phoneNumber,
        });
    }
}

module.exports = twilioRepository;
