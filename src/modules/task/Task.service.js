/**
 * A Rest Api basic CRUD service for Task model
 */

const {Task} = require('./../models');
const message = require('../messages');

class TaskService {

    async all(query = {}, populate = '', sort = '') {
        let tasks = await Task.find(query)
            .populate(populate)
            .sort(sort);
        return tasks;
    }

    async view(id, populate = '') {
        if (!id) throw new Error(message.crud.noIdSent);
        let task = await Task.findById(id).populate(populate);
        return task;
    }

    async create(body) {
        let task = {};
        task.name = body.name;
        task.description = body.description;
        task.observations = body.observations;
        task.mode = body.mode;
        task.dates = body.dates;
        task = new Task({...task});
        task = await task.save();
        return task;
    }

    async update(body, id) {
        if (!id) throw new Error(message.crud.noIdSent);
        let task = {};
        task.name = body.name;
        task.description = body.description;
        task.observations = body.observations;
        task.mode = body.mode;
        task.dates = body.dates;
        task = await Task.findByIdAndUpdate(
            id,
            {...task}
        ).setOptions({ new: true });
        if (!task) throw new Error(message.crud.noIdFound);
        return task;
    }

    async remove(id) {
        if (!id) throw new Error(message.crud.noIdSent);
        let task = await Task.findByIdAndDelete(id);
        if (!task) throw new Error(message.crud.noIdFound);
        return task;
    }

    async query(query = {}, populate = '', fields = '') {
        const task = await Task.find(query, fields).populate(populate);
        return task;
    }

}

module.exports.taskService = new TaskService();
