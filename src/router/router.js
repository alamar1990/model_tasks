const express = require('express');
const api = express.Router();

api.use('/api', require('../modules/objectives/Objective.routes'));
api.use('/api', require('../modules/model/Model.routes'));


module.exports = api;