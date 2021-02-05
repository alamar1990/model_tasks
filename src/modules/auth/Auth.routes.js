const express = require('express');
const {controller} = require('./Auth.controller');

const api = express.Router();

api.post('/register', controller.register);
api.post('/login', controller.authenticateUser);

module.exports = api;
