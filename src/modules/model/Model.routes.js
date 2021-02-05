const express = require('express');
const { resource } = require('../../router/resource');
const { controller } = require('./Model.controller');

const api = express.Router();

api.use('/model', resource(controller));
api.post('/model/define', controller.define);
api.post('/model/:id/implant', controller.implant);

module.exports = api;