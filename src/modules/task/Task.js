const mongoose = require('mongoose');
const {Schema} = mongoose;

const schema = new Schema({
        name: {
            type: String,
            unique: true,
        },
        description: String,
        date: {
            start: Date,
            end: Date,
        },
        objectives: [{
            type: mongoose.Types.ObjectId,
            ref: 'Objective',
        }],
    },
);

module.exports = mongoose.model('Task', schema);
