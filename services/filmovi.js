const express = require('express');
const app = express();
const filmovi = require('../handlers/filmovi');

//connection from db/connection(mongodb with mongoose)
const config = require('../config/index.js')
const DBConnection = require('../db/connection');

var c = config.getConfig("db");
DBConnection.initialize(c);

var jwt = require('express-jwt');
app.use(                                                       //sekoj req ke pomine niz ova i ke vrati req.user
    jwt(
        { secret: config.getConfig('jwt').key }
    )   //na site ruti ocekuvame listanje(ne treba unless)
);

const bodyParser = require("body-parser")
app.use(bodyParser.json())
const url = '/app/v1/filmovi'

app.get(url, filmovi.getAll);
app.get(url + '/:id', filmovi.getOne);
app.post(url, filmovi.save);
app.put(url + '/:id', filmovi.replace);
app.patch(url + '/:id', filmovi.update);
app.delete(url + '/:id', filmovi.remove);

app.listen(8000, (err) => {
    if (err) {
        console.log("Server could not start");
        console.log(err);
        return;
    }
    console.log("Server started successfully");
})