const message = require('../messages');
const {taskService} = require('./Task.service');
const populate = [{
    path: 'objectives'
}]
class TaskController {

    // CRUD methods
    async all(req, res) {
        try {
            const tasks = await taskService.all({}, populate);
            return res.status(200).send(tasks);
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
            const task = await taskService.view(id, populate);
            return res.status(200).send(task);
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
            const createdTask = await taskService.create(req.body);
            return res.status(200).send(createdTask);
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
            const updatedTask = await taskService.update(req.body, id);
            return res.status(200).send(updatedTask);
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
            const removedTask = await taskService.remove(id);
            return res.status(200).send(removedTask);
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                error: message.error.delete,
                message: error.message
            });
        }
    }

}

module.exports.controller = new TaskController();
