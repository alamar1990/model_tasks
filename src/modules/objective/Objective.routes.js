const express = require('express');
const { resource } = require('../../router/resource');
const { controller } = require('./Objective.controller');
const {checkAppToken} = require('../middleware');

const api = express.Router();

api.use('/objective', checkAppToken, resource(controller));
api.post('/objective/:id/plan', checkAppToken, controller.plan);

module.exports = api;