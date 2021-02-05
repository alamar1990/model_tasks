const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../configs/config');
const { User } = require('../modules/models');

const getDataFromToken = async(req) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!token) {
        throw 'Token no enviado';
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (token) {
        const decoded = jwt.verify(token, jwtSecret);

        if (!decoded) {
            throw 'Token Incorrecto';
        }

        return decoded;
    }
    throw 'Auth token no incluido';
};

let checkAppToken = async(req, res, next) => {
    try {
        const decoded = await getDataFromToken(req);
        decoded.user = await User.findOne({ _id: decoded.user._id });

        req.decoded = decoded;
        next();
    } catch (e) {
        console.error(e);
        return res.status(403).send({
            message: e
        });
    }
};


module.exports = {
    checkAppToken: checkAppToken,
};
