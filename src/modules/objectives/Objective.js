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
        dates: [{
            type: Date,
            validate: {
                validator: function() {
                    return this.dates.length <= 2;
                },
                message: 'El limite maximo de fechas es de 2'
            }
        }]
    },
);

module.exports = mongoose.model('Objective', schema);
