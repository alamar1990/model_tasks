const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const {Schema} = mongoose;
const {saltRounds} = require('../../configs/config');

const schema = new Schema({
        name: String,
        lastname: String,
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {type: String, required: true},
        active: Boolean,
    },
);

schema.pre('save', function (next) {
    if (!this.password) {
        next();
    }

    bcrypt.hash(this.password, saltRounds, (err, hash) => {
        if (err) {
            return next(err);
        }
        this.password = hash;
        next();
    });
});

schema.pre('findOneAndUpdate', function (next) {
    if (!this._update.password) {
        next();
    }

    bcrypt.hash(this._update.password, saltRounds, (err, hash) => {
        if (err) {
            return next(err);
        }
        this._update.password = hash;
        next();
    });
});

schema.methods.isPasswordCorrect = async function (password) {
    const match = await bcrypt.compare(password, this.password);
    return match;
};

module.exports = mongoose.model('User', schema);
