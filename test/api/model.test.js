const dbHandler = require('../db_test_handler');

const {Model} = require('../../src/modules/models');

beforeAll(async () => {
    await dbHandler.connect();
    await dbHandler.clearDatabase();
});

afterEach(async () => {
    // Clear db after finish test
    // await dbHandler.clearDatabase();
});

describe('Model', function () {
    it('should create a Model', async function () {
        // Arrange
        let model = new Model({
            name: 'Vacuna Covid',
            type: 'Abierto',
            sections: [{
                name: 'Distribucion',
                description: 'Distribucion de los frascos',
                date: {
                    start: '2021-02-03',
                    end: '2021-02-10'
                },
            }],
        });
        const createdModel = await model.save()

        // Assert
        expect(createdModel.name).toBe('Vacuna Covid');
    });

});
