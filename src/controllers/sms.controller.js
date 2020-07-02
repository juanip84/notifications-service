const { codes } = require('../conf/config');
const smsService = require('../services/sms.service');

class smsController {
    static async send(req, res) {
        const { phoneNumber, msg, channel }= req.body;
    
        if (!phoneNumber || !msg || !channel) {
            res
              .status(errorCodes.badRequest)
              .send({ channel, msg: 'Missing phoneNumber, msg or channel' });
            return;
        }

        if (channel !== 'sns' && channel !== 'twilio') {
          res
            .status(errorCodes.badRequest)
            .send({ channel, msg: 'Then channel doesnt exist' });

          return;
        }
    
        try {
            await smsService.send(msg, phoneNumber, channel);

            res.status(codes.success).send({
              channel,
              msg: 'sms sent',
            });
        } catch (error) {
          console.log(`error sending sms to ${phoneNumber}, ${error}`);

          res.status(codes.serverError).send({
            channel,
            msg: 'error sending sms',
            dev_msg: `error: ${error}`,
          });
        }
    }
}

module.exports = smsController;