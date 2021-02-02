const {Objective} = require('./../models');

class ObjectiveService {
    async all(query = {}, populate = '', sort = '') {
        let objectives = await Objective.find(query)
            .populate(populate)
            .sort(sort);
        return objectives;
    }

    async view(id, populate = '') {
        let objective = await Objective.findById(id).populate(populate);
        return objective;
    }

    async create(body) {
        let objective = {};
        objective.name = body.name;
        objective = Object.assign(body, objective);
        objective = new Objective(objective);
        objective = await objective.save();
        return objective;
    }

    async update(body, id) {
        let objective = {};
        objective.name = body.name;
        objective = Object.assign(body, objective);

        objective = await Objective.findByIdAndUpdate(
            id,
            objective
        ).setOptions({ new: true });
        return objective;
    }

    async remove(id) {
        let objective = await Objective.findByIdAndDelete(id);
        return objective;
    }

    async query(query = {}, populate = '', fields = '') {
        const objectives = await Objective.find(query, fields).populate(populate);
        return objectives;
    }

}

module.exports.objectiveService = new ObjectiveService();