const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('../config/index');
const DBConnection = require('../db/connection');
const auth = require('../handlers/auth');

DBConnection.initialize(config.getConfig('db'));
app.use(bodyParser.json());

app.post('/app/v1/register', auth.register);
app.post('/app/v1/login', auth.login);
app.get('/app/v1/renew', auth.renew);
app.post('/app/v1/reset-link', auth.resetLink);
app.post('/app/v1/reset-password', auth.resetPassword);
app.post('/app/v1/change-password', auth.changePassword);

app.listen(8001, (err) => {
    if (err) {
        console.log("Server could not start");
        console.log(err);
        return;
    }
    console.log("Server started successfully on port 8001");
})