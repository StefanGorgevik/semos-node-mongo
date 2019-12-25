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

app.listen(5000)

