const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('../config/index');
const DBConnection = require('../db/connection');
const auth = require('../handlers/auth');
const path = require('path')

DBConnection.initialize(config.getConfig('db'));
app.use(bodyParser.json());


// //////////////////////////
// only for testing purposes
// //////////////////////////
var pub = path.join(__dirname, '..', 'public');
app.use('/public', express.static(pub));
// //////////////////////////
// only for testing purposes
// //////////////////////////

var jwt = require('express-jwt');
//https://www.npmjs.com/package/express-jwt
//npm install express-jwt
app.use(                                                       //sekoj req ke pomine niz ova i ke vrati req.user
    jwt(
        { secret: config.getConfig('jwt').key }
    )
        .unless(
            { path: ['/app/v1/auth/register', '/app/v1/auth/login','/public', '/app/v1/auth/confirm/*'] }
        )
);

app.post('/app/v1/auth/register', auth.register);
app.get('/api/v1/auth/confirm/:confirm_hash', auth.confirm);
app.post('/app/v1/auth/login', auth.login);
app.get('/app/v1/auth/renew', auth.renew);
app.post('/app/v1/auth/reset-link', auth.resetLink);
app.post('/app/v1/auth/reset-password', auth.resetPassword);
app.post('/app/v1/auth/change-password', auth.changePassword);

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send({message: 'Invalid token'});
    } else {
        next(err);
    }
});

app.listen(8001, (err) => {
    if (err) {
        console.log("Server could not start");
        console.log(err);
        return;
    }
    console.log("Server started successfully on port 8001");
})

//https://octokit.github.io/rest.js/
//https://sendgrid.com/