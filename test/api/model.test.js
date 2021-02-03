const dbHandler = require('../db_test_handler');
const {modelService} = require('../../src/modules/model/Model.service');

const {Model} = require('../../src/modules/models');

beforeAll(async () => {
    await dbHandler.connect();
    await dbHandler.clearDatabase();
});

afterEach(async () => {
    // Clear db after finish test
    await dbHandler.clearDatabase();
});

describe('Model', function () {
    it('should create a Model using the mongoose model', async function () {
        const modelData = {
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
        }
        let model = new Model(modelData);
        const createdModel = await model.save()
        expect(createdModel.name).toBe('Vacuna Covid');
    });

    it('should create a Model using the service', async function () {
        const modelData = {
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
        }
        let model = await modelService.create(modelData);
        expect(model.name).toBe('Vacuna Covid');
    });

    it('should define a Model with sections, tasks and objectives', async function () {
        const modelData = {
            name: 'Vacuna Covid',
            type: 'Abierto',
            sections: [{
                name: 'Distribucion',
                description: 'Distribucion de los frascos',
                date: {
                    start: '2021-02-03',
                    end: '2021-02-10'
                },
                tasks_objectives: [{
                    kind: 'Tarea',
                    name: 'Rellenar combustible',
                    description: 'Rellenar tanques de combustible',
                }]
            }],
        }
        let model = await modelService.create(modelData);
        expect(model.name).toBe('Vacuna Covid');
    });

});
