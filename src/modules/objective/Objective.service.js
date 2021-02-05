/**
 * A Rest Api basic CRUD service for Objective model
 */

const {Objective, Model, Task} = require('./../models');
const message = require('../messages');

class ObjectiveService {
    // Business Logic methods
    async plan(dates, objectiveId){
        try {
            if (!objectiveId || !dates.start || !dates.end) return
            await Objective.updateOne({_id: objectiveId},
                {
                    dates: {
                        start: dates.start,
                        end: dates.end
                    }
                });

            let taskIds = await Task.find({objectives: objectiveId}).select('id').lean()
            taskIds.reduce((acc, el) => acc.concat(el._id), [])
            for (const taskId of taskIds) {
                await Task.updateMany({_id: taskId},
                    {
                        date: {
                            start: dates.start,
                            end: dates.end
                        }
                    });
                await Model.updateMany(
                    {'sections.tasks': taskId},
                    {
                        'sections.$.date.start': dates.start,
                        'sections.$.date.end': dates.end
                    }
                );
            }
        } catch (e) {
            throw e;
        }
    }

    // CRUD methods
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
        objective = new Objective({...objective});
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
        objective = await Objective.findByIdAndUpdate(
            id,
            {...objective}
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
