const express = require('express');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const AWS = require('aws-sdk');
const router = require('./router');
const swaggerDocument = require('./swagger.json');

const PORT_NUMBER = 3000;

console.log("Starting SMS component");

app.use(cors());
// Fire up healthcheck endpoint
app.use(bodyParser.json());

// Swagger
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.get('/health', (req, res) => {
    res.sendStatus(200);
});

app.use('/', router);

app.use(function (req, res) {
    res.status(404);
    res.send({ error: "not Found - error 404" });
});

app.listen(PORT_NUMBER, () => {
    console.info(`Server listening @ http://localhost:${PORT_NUMBER}`);
});