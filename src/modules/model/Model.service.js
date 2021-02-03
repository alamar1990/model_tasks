/**
 * A Rest Api basic CRUD service for Model model
 */

const {Model} = require('./../models');
const message = require('../messages');

class ModelService {
    // Metho
    async create(body) {
        let model = {};
        model.name = body.name;
        model.type = body.type;
        model.sections = body.sections;
        model = Object.assign(body, model);
        model = new Model(model);
        model = await model.save();
        return model;
    }

    async query(query = {}, populate = '', fields = '') {
        const model = await Model.find(query, fields).populate(populate);
        return model;
    }

    // CRUD methods
    async all(query = {}, populate = '', sort = '') {
        let models = await Model.find(query)
            .populate(populate)
            .sort(sort);
        return models;
    }

    async view(id, populate = '') {
        if (!id) throw new Error(message.crud.noIdSent);
        let model = await Model.findById(id).populate(populate);
        return model;
    }

    async create(body) {
        let model = {};
        model.name = body.name;
        model.type = body.type;
        model.sections = body.sections;
        model = Object.assign(body, model);
        model = new Model(model);
        model = await model.save();
        return model;
    }

    async update(body, id) {
        if (!id) throw new Error(message.crud.noIdSent);
        let model = {};
        model.name = body.name;
        model.type = body.type;
        model.sections = body.sections;
        model = Object.assign(body, model);
        model = await Model.findByIdAndUpdate(
            id,
            model
        ).setOptions({ new: true });
        if (!model) throw new Error(message.crud.noIdFound);
        return model;
    }

    async remove(id) {
        if (!id) throw new Error(message.crud.noIdSent);
        let model = await Model.findByIdAndDelete(id);
        if (!model) throw new Error(message.crud.noIdFound);
        return model;
    }


}

module.exports.modelService = new ModelService();
