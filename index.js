const express = require('express');
const app = express();
const filmovi = require('./handlers/filmovi');

//connection from db/connection(mongodb with mongoose)
const DBConnection = require('./db/connection');
DBConnection.init();

const bodyParser = require("body-parser")
app.use(bodyParser.json())

app.get('/app/v1/filmovi', filmovi.getAll);
app.get('/app/v1/filmovi/:id', filmovi.getOne);
app.post('/app/v1/filmovi', filmovi.save);
app.put('/app/v1/filmovi/:id', filmovi.replace);
app.patch('/app/v1/filmovi/:id', filmovi.update);
app.delete('/app/v1/filmovi/:id', filmovi.remove);

app.listen(8080, (err) => {
    if (err) {
        console.log("Server could not start");
        console.log(err);
        return;
    }
    console.log("Server started successfully");
})