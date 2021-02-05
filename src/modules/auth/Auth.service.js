const {User} = require('./../models');
const jwt = require('jsonwebtoken');
const {jwtSecret, jwtExpiration} = require('../../configs/config');
const message = require('../messages');


const genToken = (user) => {
    let token = '';
    if (user) {
        token = jwt.sign({user: user},
            jwtSecret,
            {
                expiresIn: jwtExpiration
            }
        );
    }
    return token;
};

const logInUser = async (email, password) => {
    let user = await User.findOne({ email: email });
    if (!user) {
        throw { message: 'El usuario o la contraseña estan incorrectos' };
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password, user.password);
    if (!isPasswordCorrect) {
        throw { message: 'El usuario o la contraseña estan incorrectos' };
    }

    let token = genToken(user);
    user = user.toObject();
    delete user.password;

    return {
        token,
        user,
    };
}

class AuthService {

    async register(body) {
        try {
            const { email, password } = body;

            //Check If User Exists
            let foundUser = await User.findOne({ email });
            if (foundUser) {
                return {message: 'El email esta en uso'}
            }

            let newUser = new User({ email, password})
            newUser = await newUser.save()
            const token = genToken(newUser)
            return {user: newUser, token: token}
        } catch (error) {
            console.error(error);
            throw error
        }
    }

    async authenticateUser(body) {
        try {
            const { email, password } = body;
            const login = await logInUser(email, password);
            return {
                success: true,
                message: 'Authentication successful!',
                token: login.token,
                user: login.user
            }

        } catch (e) {
            console.error(e);
            return e
        }
    }

}

module.exports.authService = new AuthService();
