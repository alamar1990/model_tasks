const express = require('express');
const { resource } = require('../../router/resource');
const { controller } = require('./Task.controller');
const {checkAppToken} = require('../middleware');

const api = express.Router();

api.use('/task', checkAppToken, resource(controller));

module.exports = api;