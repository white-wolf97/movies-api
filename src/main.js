const express = require('express');
const config = require('./config');
const app = express();
const apiV1Router = require('./routes/apiv1.js');
app.use('/', apiV1Router);


app.listen(config.port, () => {
    console.log('listening on port ' + config.port);
})