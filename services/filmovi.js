const express = require('express');
const app = express();
const filmovi = require('../handlers/filmovi');

//connection from db/connection(mongodb with mongoose)
const config = require('../config/index.js')
const DBConnection = require('../db/connection');

var c = config.getConfig("db");
DBConnection.initialize(c);

var jwt = require('express-jwt');
// app.use(                                                       //sekoj req ke pomine niz ova i ke vrati req.user
//     jwt(
//         { secret: config.getConfig('jwt').key }
//     )   //na site ruti ocekuvame listanje(ne treba unless)
// );

const bodyParser = require("body-parser")
app.use(bodyParser.json())
const url = '/app/v1/filmovi/'

app.get('/app/v1/filmovi/', filmovi.getAll);
app.get('/app/v1/filmovi/:id', filmovi.getOne);
app.post('/app/v1/filmovi/', filmovi.save);
app.put('/app/v1/filmovi/', filmovi.replace);
app.patch('/app/v1/filmovi/', filmovi.update);
app.delete('/app/v1/filmovi/', filmovi.remove);

app.listen(8000, (err) => {
    if (err) {
        console.log("Server could not start");
        console.log(err);
        return;
    }
    console.log("Server started successfully on port 8000");
})

