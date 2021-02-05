const express = require('express');
const api = express.Router();

api.use('/api', require('../modules/objective/Objective.routes'));
api.use('/api', require('../modules/model/Model.routes'));
api.use('/api', require('../modules/task/Task.routes'));
api.use('/api', require('../modules/user/User.routes'));


module.exports = api;