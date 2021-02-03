const express = require('express');
const api = express.Router();

api.use('/api', require('../modules/objectives/Objective.routes'));


module.exports = api;