const application = require('./application');

let server;
const port = 3000

server = application.listen(port, () => {
    console.log(`Listening to port ${port}`);
});

//Capture the terminal
process.on('SIGTERM', () => {
    console.log('SIGTERM received');
    if (server) {
        server.close();
    }
});