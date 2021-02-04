const express = require('express');
const { resource } = require('../../router/resource');
const { controller } = require('./Model.controller');

const api = express.Router();

api.use('/model', resource(controller));
api.post('/model/define', controller.define);

module.exports = api;