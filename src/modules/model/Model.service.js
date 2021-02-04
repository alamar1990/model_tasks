/**
 * A Rest Api basic CRUD service for Model model
 */

const {Model, Objective, Task} = require('./../models');
const message = require('../messages');

class ModelService {
    // Business logic methods
    async define(body) {
        if (!body) throw new Error('No data sent')
        let model = {};
        let sections = body.sections || null;
        let newSections = await Promise.all(sections.map(async (section) => {
                let taskIds = []
                if (section.tasks){
                    await Promise.all(section.tasks.map( async(tsk) => {
                        let task = {};
                        task.name = tsk.name
                        task.description = tsk.description
                        let objectivesIds = []
                        if (tsk.objectives) {
                            await Promise.all(tsk.objectives.map(async (obj) => {
                                let objective = {};
                                objective.name = obj.name
                                objective.description = obj.description
                                objective.observations = obj.observations
                                objective.mode = obj.mode
                                objective = await new Objective({...objective})
                                objective = await objective.save()
                                objectivesIds.push(objective.id)
                            }));
                        }
                        task.objectives = objectivesIds
                        if (!task.objectives.length) delete task.objectives
                        task = new Task({...task});
                        task = await task.save()
                        taskIds.push(task.id)
                    }));
                }
                if (section.objectives){
                    let objectivesIds = []
                    await Promise.all(section.objectives.map( async(obj) => {
                        let objective = {};
                        objective.name = obj.name
                        objective.description = obj.description
                        objective.observations = obj.observations
                        objective.mode = obj.mode
                        objective = new Objective({...objective})
                        objective = await objective.save()
                        objectivesIds.push(objective.id)
                    }));
                    section.objectives = objectivesIds
                    if (!section.objectives.length) delete section.objectives
                }
                section.tasks = taskIds
                if (!section.tasks.length) delete section.tasks
                return section
        })) || ''
        if (newSections) model.sections = newSections
        model.name = body.name;
        model.type = body.type;
        model = new Model({...model});
        model = await model.save();
        return model;
    }

    async query(query = {}, populate = '', fields = '') {
        const model = await Model.find(query, fields).populate(populate);
        return model;
    }

    // CRUD methods
    async all(populate = '', sort = '') {
        let models = await Model.find({})
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
        model = new Model({...model});
        model = await model.save();
        return model;
    }

    async update(body, id) {
        if (!id) throw new Error(message.crud.noIdSent);
        let model = {};
        model.name = body.name;
        model.type = body.type;
        model.sections = body.sections;
        model = await Model.findByIdAndUpdate(
            id,
            {...model}
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
