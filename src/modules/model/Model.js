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
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Section',
        }]
    },
);

module.exports = mongoose.model('Model', schema);
