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
        // The reference of task or objective in the current section
        sections_tasks: [{
            type: Schema.Types.ObjectId,
            required: true,
            refPath: 'sectionTaskDocument',
        }],
        sectionTaskDocument: {
            type: String,
            required: true,
            enum: ['Task', 'Objective']
        },
    },
);

schema.methods = {

};

module.exports = mongoose.model('Section', schema);
