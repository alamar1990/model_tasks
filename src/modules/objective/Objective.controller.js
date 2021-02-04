

const message = require('../messages');
const mongoose = require('mongoose');
const {objectiveService} = require('./Objective.service');
const {Task} = require('../models');

class ObjectiveController {
    // Business Logic methods
    async plan(req, res){
        try {
            const dates = req.body.dates
            // let tasks = await Task.find({objectives: mongoose.Types.ObjectId('601c58d2c202f63ad8227985')})



            // for (let task of tasks){
            //     task.dates.start = dates.start
            //     task.dates.end = dates.end
            //     task.save()
            // }
            // await Promise.all(tasks.map( (task) => {
            //
            //
            // }));

            return res.status(200).send(tasks);
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                error: message.error.update,
                message: error.message
            });
        }
    }

    // CRUD methods
    async all(req, res) {
        try {
            const objectives = await objectiveService.all();
            return res.status(200).send(objectives);
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                message: message.error.server
            });
        }
    }

    async view(req, res) {
        try {
            let id = req.params.id;
            const objective = await objectiveService.view(id);
            return res.status(200).send(objective);
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                error: message.error.server,
                message: error.message
            });
        }
    }

    async create(req, res) {
        try {
            const createdObjective = await objectiveService.create(req.body);
            return res.status(200).send(createdObjective);
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                error: message.error.create,
                message: error.message
            });
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;
            const createdObjective = await objectiveService.update(req.body, id);
            return res.status(200).send(createdObjective);
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                error: message.error.update,
                message: error.message
            });
        }
    }

    async remove(req, res) {
        try {
            const id = req.params.id;
            const removedObjective = await objectiveService.remove(id);
            return res.status(200).send(removedObjective);
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                error: message.error.delete,
                message: error.message
            });
        }
    }

}

module.exports.controller = new ObjectiveController();
