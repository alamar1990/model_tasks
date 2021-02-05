const env = process.env.NODE_ENV;

const dev = {
    app: {
        port: parseInt(process.env.DEV_APP_PORT) || 3000
    },
    db: {
        host: process.env.DEV_DB_HOST || 'localhost',
        port: parseInt(process.env.DEV_DB_PORT) || 27017,
        name: process.env.DEV_DB_NAME || 'dofleini_models_task'
    }
};

const test = {
    app: {
        port: parseInt(process.env.TEST_APP_PORT) || 3000
    },
    db: {
        host: process.env.TEST_DB_HOST || 'localhost',
        port: parseInt(process.env.TEST_DB_PORT) || 27017,
        name: process.env.TEST_DB_NAME || 'dofleini_models_task_testdb'
    }
};

const config = {
    dev,
    test
};

module.exports = {
    config: config[env || 'dev'],
    jwtSecret: 'hereIsASecret_CodeMoreThanStudy',
    jwtExpiration: '45d',
    saltRounds: 10
};