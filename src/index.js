const mongoose = require('mongoose');
const application = require('./application');
const {config} = require('./configs/config');

let server;

const mongooseOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}

mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, mongooseOptions).then(() => {
    console.log('Connected to MongoDB');
    server = application.listen(config.app.port, () => {
        console.log(`Listening to port ${config.app.port}`);
    });
});

//Capture the terminal
process.on('SIGTERM', () => {
    console.log('SIGTERM received');
    if (server) {
        server.close();
    }
});