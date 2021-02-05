const message = require('../messages');
const {authService} = require('./Auth.service');

class AuthController {

    async register(req, res) {
        try {
            const auth = await authService.register(req.body);
            res.status(200).json(auth)
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                message: message.error.server
            });
        }
    }

    async authenticateUser(req, res) {
        try {
            const login = await authService.authenticateUser(req.body);
            res.send({
                success: true,
                message: 'Authentication successful!',
                token: login.token,
                user: login.user
            });
        } catch (e) {
            console.error(e);
            res.status(403).send({
                message: message.error.server
            });
        }
    }
}

module.exports.controller = new AuthController();
