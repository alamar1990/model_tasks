/**
 * A Rest Api basic CRUD service for Objective model
 */

const {Objective} = require('./../models');
const message = require('../messages');

class ObjectiveService {
    async all(query = {}, populate = '', sort = '') {
        let objectives = await Objective.find(query)
            .populate(populate)
            .sort(sort);
        return objectives;
    }

    async view(id, populate = '') {
        if (!id) throw new Error(message.crud.noIdSent);
        let objective = await Objective.findById(id).populate(populate);
        return objective;
    }

    async create(body) {
        let objective = {};
        objective.name = body.name;
        objective.description = body.description;
        objective.observations = body.observations;
        objective.mode = body.mode;
        objective.dates = body.dates;
        objective = Object.assign(body, objective);
        objective = new Objective(objective);
        objective = await objective.save();
        return objective;
    }

    async update(body, id) {
        if (!id) throw new Error(message.crud.noIdSent);
        let objective = {};
        objective.name = body.name;
        objective.description = body.description;
        objective.observations = body.observations;
        objective.mode = body.mode;
        objective.dates = body.dates;
        objective = Object.assign(body, objective);
        objective = await Objective.findByIdAndUpdate(
            id,
            objective
        ).setOptions({ new: true });
        if (!objective) throw new Error(message.crud.noIdFound);
        return objective;
    }

    async remove(id) {
        if (!id) throw new Error(message.crud.noIdSent);
        let objective = await Objective.findByIdAndDelete(id);
        if (!objective) throw new Error(message.crud.noIdFound);
        return objective;
    }

    async query(query = {}, populate = '', fields = '') {
        const objectives = await Objective.find(query, fields).populate(populate);
        return objectives;
    }

}

module.exports.objectiveService = new ObjectiveService();
