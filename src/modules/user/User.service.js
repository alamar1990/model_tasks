/**
 * A Rest Api basic CRUD service for User model
 */

const {User} = require('./../models');
const message = require('../messages');

class UserService {

    async all(query = {}, populate = '', sort = '') {
        let users = await User.find(query)
            .populate(populate)
            .sort(sort);
        return users;
    }

    async view(id, populate = '') {
        if (!id) throw new Error(message.crud.noIdSent);
        let user = await User.findById(id).populate(populate);
        return user;
    }

    async create(body) {
        let user = {};
        user.name = body.name;
        user.lastname = body.lastname;
        user.email = body.email;
        user.password = body.password;
        user.active = body.active;
        user = new User({...user});
        user = await user.save();
        return user;
    }

    async update(body, id) {
        let user = {};
        user.name = body.name;
        user.lastname = body.lastname;
        user.email = body.email;
        user.password = body.password;
        user.active = body.active;
        user = await User.findByIdAndUpdate(
            id,
            {...user}
        ).setOptions({ new: true });
        if (!user) throw new Error(message.crud.noIdFound);
        return user;
    }

    async remove(id) {
        let user = await User.findByIdAndDelete(id);
        if (!user) throw new Error(message.crud.noIdFound);
        return user;
    }

    async query(query = {}, populate = '', fields = '') {
        const user = await User.find(query, fields).populate(populate);
        return user;
    }

}

module.exports.userService = new UserService();
