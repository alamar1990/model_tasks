const {Model} = require('./../models');

class ModelService {
    async all(query = {}, populate = '', sort = '') {
        let models = await Model.find(query)
            .populate(populate)
            .sort(sort);
        return models;
    }

    async view(id, populate = '') {
        let model = await Model.findById(id).populate(populate);
        return model;
    }

    async create(body) {
        let model = {};
        model.name = body.name;
        model = Object.assign(body, model);
        model = new Model(model);
        model = await model.save();
        return model;
    }

    async update(body, id) {
        let model = {};
        model.name = body.name;
        model = Object.assign(body, model);

        model = await Model.findByIdAndUpdate(
            id,
            model
        ).setOptions({ new: true });
        return model;
    }

    async remove(id) {
        let model = await Model.findByIdAndDelete(id);
        return model;
    }

    async query(query = {}, populate = '', fields = '') {
        const model = await Model.find(query, fields).populate(populate);
        return model;
    }

}

module.exports.modelService = new ModelService();
