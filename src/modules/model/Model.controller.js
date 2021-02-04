const message = require('../messages');
const {modelService} = require('./Model.service');

// Populate and deep populate referenced collections
const populate = [{
        path: 'sections.tasks',
        populate: {
            path: 'objectives',
            model: 'Objective'
        }
    },
    {
        path: 'sections.objectives',
}]

// const populate = 'sections.tasks sections.tasks.objectives sections.objectives'
class ModelController {
    // Business Logic methods
    async define(req, res) {
        try {
            const model = await modelService.define(req.body);
            return res.status(200).send(model);
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                message: message.error.server
            });
        }
    }


    // CRUD methods
    async all(req, res) {
        try {
            const models = await modelService.all(populate);
            return res.status(200).send(models);
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
            const model = await modelService.view(id, populate);
            return res.status(200).send(model);
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
            const createdModel = await modelService.create(req.body);
            return res.status(200).send(createdModel);
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
            const updatedModel = await modelService.update(req.body, id);
            return res.status(200).send(updatedModel);
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
            const removedModel = await modelService.remove(id);
            return res.status(200).send(removedModel);
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                error: message.error.delete,
                message: error.message
            });
        }
    }

}

module.exports.controller = new ModelController();
