const application = require('./application');
const {config} = require('./configs/config');

let server;

server = application.listen(config.app.port, () => {
    console.log(`Listening to port ${config.app.port}`);
});

//Capture the terminal
process.on('SIGTERM', () => {
    console.log('SIGTERM received');
    if (server) {
        server.close();
    }
});