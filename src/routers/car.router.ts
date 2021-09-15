import { createCar, deleteCar, readCarById, readCars, updateCar } from "../services/car.service";
import { Context } from "koa";
const Router = require('@koa/router');


export const carRouter = new Router({
    prefix: '/cars'
});

carRouter.get('/', async (ctx) => {
    await readCarById('gzMgNG8KeSusbzHchWgq');
    ctx.body = 'Car route 1';
});

carRouter.get('/all', async (ctx) => {
    await readCars();
    ctx.body = 'Car route all';
});

carRouter.post('/', async (ctx) => {
    // console.log('ctx.request.body: ', ctx.request.body);
    // const newCar: Car = new Car(ctx.request.body);
    const newCar = ctx.request.body;
    // console.log('newCar: ', newCar);
    const refCar = await createCar(newCar);
    // console.log('refCar: ', refCar);
    ctx.body = {
        message: 'Car created',
        id: refCar
    };
});

carRouter.put('/:id', async (ctx) => {
    console.log('ctx.request.body: ', ctx.request.body);
    const pathSections = ctx.path.split('/');
    const carsIndex = pathSections.indexOf('cars')
    const carId = pathSections[carsIndex + 1];
    console.log('pathSections: ', pathSections);
    console.log('carId: ', carId);
    await updateCar(carId, ctx.request.body);
    ctx.body = {
        message: 'Update successful'
    }
});

carRouter.delete('/', async (ctx: Context) => {
    const { id } = ctx.request.query;
    // console.log('typeof id: ', typeof id);
    if(!id) {
        ctx.status = 400;
        ctx.body = {
            message: 'No id provided'
        }
    } else if(typeof id !== 'string') {
        ctx.status = 400;
        ctx.body = {
            message: 'Provide only one id'
        }
    } else {
        ctx.body = await deleteCar(id)
    }
});