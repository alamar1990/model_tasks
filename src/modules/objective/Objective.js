const mongoose = require('mongoose');
const {Schema} = mongoose;
const {Task, Model} = require('../models');
const {taskService} = require('../task/Task.service');

const schema = new Schema({
        name: {
            type: String,
            unique: true
        },
        description: String,
        observations: String,
        mode: {
            type: String,
            enum: ['Ordinario', 'Extraordinario'],
        },
        dates: {
            start: Date,
            end: Date,
        }
    },
);

async function updateParents(result) {
    const objectiveId = result._id || null
    if (!objectiveId || !result.dates.start || !result.dates.end) return

    let taskIds = await Task.find({objectives: objectiveId}).select('id').lean()
    taskIds.reduce((acc, el) => acc.concat(el._id), [])

    for (const taskId of taskIds) {
        await Task.updateMany({_id: taskId},
        {
            date: {
                start: result.dates.start,
                end: result.dates.end
            }
        });
        await Model.updateMany(
            {'sections.tasks': taskId},
            {
                'sections.$.date.start': result.dates.start,
                'sections.$.date.end': result.dates.end
            }
        );
    }
}

schema.post(/^(updateOne|updateMany|save|findOneAndUpdate)/, async function(result) {
    await updateParents(result)
});

module.exports = mongoose.model('Objective', schema);


