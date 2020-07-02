// Check for mandatory environment variables
const required = ['REGION_SNS',
'TWILIO_SID', 'TWILIO_AUTH_TOKEN','TWILIO_MESSAGING_SERVICE_ID'];

required.forEach(param => {
    if (!process.env[param]) {
        throw new Error(`Environment parameter ${param} is missing`);
    }
});

const config = {
	env: process.env["NODE_ENV"],
	sns: {
		region: process.env['REGION_SNS']
	},
	twilio: {
        sid: process.env['TWILIO_SID'],
        authToken: process.env['TWILIO_AUTH_TOKEN'],
		messagingServiceSid: process.env['TWILIO_MESSAGING_SERVICE_ID']
	},
	codes: {
		serverError: 500,
		badRequest: 400,
		success: 200	
	}
}

module.exports = config;