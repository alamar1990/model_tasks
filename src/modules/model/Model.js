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
            tasks: [{
                type: Schema.Types.ObjectId,
                ref: 'Task'
            }],
            objectives: [{
                type: Schema.Types.ObjectId,
                ref: 'Objective'
            }]
        }]
    },
);

module.exports = mongoose.model('Model', schema);
