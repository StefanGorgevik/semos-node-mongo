const express = require('express');
const config = require('../config/index.js');
const files = require('../handlers/files');
const fileupload = require('express-fileupload');
const jwt = require('express-jwt');

var app = express();

app.use(
    jwt(
        { secret: config.getConfig('jwt').key }
    )
);

app.use(fileupload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

app.post('/app/v1/files/upload', files.UploadFile);
app.get('/app/v1/files/upload/:filename', files.DownloadFile);

app.listen(8002, err => {
    if (err) {
        console.log('Could not start server');
        console.log(err);
        return;
    }
    console.log('Server successfully started on port 8002');
});

