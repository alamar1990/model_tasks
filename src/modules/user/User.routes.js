const express = require('express');
const {controller} = require('./User.controller');
const { resource } = require('../../router/resource');
const {checkAppToken} = require('../middleware');

const api = express.Router();

api.use('/user', checkAppToken, resource(controller));

module.exports = api;
