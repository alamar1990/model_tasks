const message = require('../messages');
const {userService} = require('./User.service');

class UserController {

    // CRUD methods
    async all(req, res) {
        try {
            const users = await userService.all({});
            return res.status(200).send(users);
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
            const user = await userService.view(id);
            return res.status(200).send(user);
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
            const createdUser = await userService.create(req.body);
            return res.status(200).send(createdUser);
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
            const updatedUser = await userService.update(req.body, id);
            return res.status(200).send(updatedUser);
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
            const removedUser = await userService.remove(id);
            return res.status(200).send(removedUser);
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                error: message.error.delete,
                message: error.message
            });
        }
    }

}

module.exports.controller = new UserController();
