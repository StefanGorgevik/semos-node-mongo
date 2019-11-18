const express = require('express');
const app = express();
const filmovi = require('./handlers/filmovi');

//connection from db/connection(mongodb with mongoose)
const DBConnection = require('./db/connection');
DBConnection.initialize();

const bodyParser = require("body-parser")
app.use(bodyParser.json())
const url = '/app/v1/filmovi'

app.get(url, filmovi.getAll);
app.get(url + '/:id', filmovi.getOne);
app.post(url, filmovi.save);
app.put(url + '/:id', filmovi.replace);
app.patch(url + '/:id', filmovi.update);
app.delete(url + '/:id', filmovi.remove);

app.listen(8080, (err) => {
    if (err) {
        console.log("Server could not start");
        console.log(err);
        return;
    }
    console.log("Server started successfully");
})