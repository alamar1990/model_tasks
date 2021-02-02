const mongoose = require('mongoose');
const {config} = require('../src/configs/config');

module.exports.connect = async () => {
    const url = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
}

module.exports.clearDatabase = async () => {
    const collections = Object.keys(mongoose.connection.collections);

    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName]
        await collection.deleteMany()
    }
}
