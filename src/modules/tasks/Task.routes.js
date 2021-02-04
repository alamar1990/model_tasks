const express = require('express');
const { resource } = require('../../router/resource');
const { controller } = require('./Task.controller');

const api = express.Router();

api.use('/tasks', resource(controller));

module.exports = api;