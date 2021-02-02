const mongoose = require('mongoose');
const {Schema} = mongoose;

const schema = new Schema({
        name: {
            type: String,
            unique: true,
            required: true,
        },
        type: {
            type: String,
            enum: ['Abierto', 'Cerrado', 'Híbrido'],
        },
        sections: [{
            name: {
                type: String,
                unique: true,
            },
            description: String,
            date: {
                start: Date,
                end: Date,
            },

            // The reference of task or objective in the current section
            tasks_objectives: [{
                type: Schema.Types.ObjectId,
                refPath: 'tasksObjectivesDocument',
            }],
            tasksObjectivesDocument: {
                type: String,
                enum: ['Task', 'Objective']
            },
        }]
    },
);

module.exports = mongoose.model('Model', schema);
