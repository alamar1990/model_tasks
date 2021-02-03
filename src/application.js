const express = require('express');
const router = require('./router/router');

const app = express();

// Parse Json body requests
app.use(express.json());

// Configure Routes
app.use(router);


app.get('/', ((req, res) => {
    res.send('HELLO Model Task app')
}))

module.exports = app;