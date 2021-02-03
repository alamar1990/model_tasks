const express = require('express');
const { resource } = require('../../router/resource');
const { controller } = require('./Objective.controller');

const api = express.Router();

api.use('/objective', resource(controller));

module.exports = api;