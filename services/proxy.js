const express = require('express');
const proxy = require('http-proxy');

var app = express();
var apyProxy = proxy.createProxyServer();

app.all('/app/v1/filmovi/*', (req, res) => {
    apyProxy.web(req, res, {target: 'https://localhost:8000'})
})

app.all('/app/v1/auth/*', (req, res) => {
    apyProxy.web(req, res, {target: 'https://localhost:8001'})
})

app.all('/app/v1/files/*', (req, res) => {
    apyProxy.web(req, res, {target: 'https://localhost:8002'})
})

app.all('/*', (req, res) => {
    res.status(404).send('Not Found!')
})

const porta = process.env.PORT;

app.listen(porta, err => {
    if(err) {
        console.log(err);
        return;
    }
    console.log(`Server started successfully on port 5000 ${porta}`)
})

