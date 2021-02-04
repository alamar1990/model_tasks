const mongoose = require('mongoose');
const {Schema} = mongoose;
const {Task} = require('../models');

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

function updateParents(dates) {

}

schema.pre('save', function(next) {
    updateParents(this);
    next();
});

schema.pre('findByIdAndUpdate', function(next) {
    updateParents(this);
    next();
});

module.exports = mongoose.model('Objective', schema);
