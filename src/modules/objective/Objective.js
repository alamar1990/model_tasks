const mongoose = require('mongoose');
const {Schema} = mongoose;
const {Task} = require('../models');
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

async function updateParents(next, dates) {
    const id = mongoose.Types.ObjectId(this._id)
    Task.updateMany({objectives: id},
        {
            date: {
                start: dates.start,
                end: dates.end
            }
        });
}

schema.post('findOneAndUpdate', async function(next) {
    console.log('Ahora si')
    await updateParents(next)
});


module.exports = mongoose.model('Objective', schema);


