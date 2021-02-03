const mongoose = require('mongoose');
const {Schema} = mongoose;

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

module.exports = mongoose.model('Objective', schema);
