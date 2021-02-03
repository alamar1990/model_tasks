const dbHandler = require('../db_test_handler');
const {objectiveService} = require('../../src/modules/objectives/Objective.service');

const {Objective} = require('../../src/modules/models');

beforeAll(async () => {
    await dbHandler.connect();
    await dbHandler.clearDatabase();
});

afterEach(async () => {
    // Clear db after finish test
    await dbHandler.clearDatabase();
});

describe('Objective', function () {
    it('should create an Objective using the mongoose model', async function () {
        const objectiveData = {
            name: 'Ir al mercado',
            description: 'Ir al mercado para las compras',
            observations: 'Irme corriendo',
            mode: 'Ordinario',
            dates: ["2021-02-03", "2021-02-04"],
        }
        let objective = new Objective(objectiveData);
        const createdObjective = await objective.save()
        expect(createdObjective.name).toBe('Ir al mercado');
    });

    it('should create an Objective with Service', async function () {
        const objectiveData = {
            name: 'Ir al mercado',
            description: 'Ir al mercado para las compras',
            observations: 'Irme corriendo',
            mode: 'Ordinario',
            dates: ["2021-02-03", "2021-02-04"],
        }
        const createdObjective = await objectiveService.create(objectiveData)
        expect(createdObjective.name).toBe('Ir al mercado');
    });
});
