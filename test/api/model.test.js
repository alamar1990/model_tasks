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

    it('should define a Model with section, task and/or objective', async function () {
        const modelData = {
            name: 'Vacuna Covid',
            type: 'Abierto',
            sections: [{
                name: 'Distribucion',
                description: 'Distribucion de los frascos',
                tasks: [
                    {
                        name: 'Rellenar combustible',
                        description: 'Rellenar tanques de combustible',
                        objectives: [{
                                name: 'Recargar tarjetas de combustible',
                                description: 'Recargar tarjetas',
                                observations: 'Ninguna',
                                mode: 'Ordinario',
                            },
                            {
                                name: 'Alistar transporte',
                                description: 'Dejar listo medios de transporte',
                                observations: 'Ninguna',
                                mode: 'Extraordinario',
                            }
                        ]
                    }
                ]
            }, {
                name: 'Aplicacion de la vacuna',
                description: 'Pinchar a to el que venga',
                objectives: [{
                    name: 'Esterilizar agujas',
                    description: 'Esterilizar agujas',
                    observations: 'Ninguna',
                    mode: 'Ordinario',
                },
                {
                    name: 'Aplicar vacuna',
                    description: 'Pinchar sin piedad',
                    observations: 'Ninguna',
                    mode: 'Extraordinario',
                }]
            }],
        }
        let model = await modelService.define(modelData);
        expect(model.name).toBe(modelData.name);
    });

});
