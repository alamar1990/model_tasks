const express = require('express');
const api = express.Router();
const swaggerUi = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc');
swaggerDocument = require('../../swagger.json');


api.use('/api', require('../modules/objective/Objective.routes'));
api.use('/api', require('../modules/model/Model.routes'));
api.use('/api', require('../modules/task/Task.routes'));
api.use('/api', require('../modules/user/User.routes'));
api.use('/api/auth', require('../modules/auth/Auth.routes'));

api.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = api;