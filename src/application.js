const express = require('express');

const app = express();

// Parse Json body requests
app.use(express.json());


app.get('/', ((req, res) => {
    res.send('HELLO Model Task app')
}))

module.exports = app;