const express = require('express');
const {controller} = require('./User.controller');
const { resource } = require('../../router/resource');

const api = express.Router();

api.use('/user', resource(controller));

module.exports = api;
