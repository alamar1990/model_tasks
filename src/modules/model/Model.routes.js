const express = require('express');
const { resource } = require('../../router/resource');
const { controller } = require('./Model.controller');
const {checkAppToken} = require('../middleware');

const api = express.Router();

api.use('/model', checkAppToken, resource(controller));
api.post('/model/define', checkAppToken, controller.define);
api.post('/model/:id/implant', checkAppToken, controller.implant);

module.exports = api;