const express = require('express');
const smsController = require('./src/controllers/sms.controller');
const router  = express.Router();

const version = 'v1';

router.post(`/${version}/sms`, smsController.send);

module.exports = router;
