import { createCar, deleteCar, readCarById, updateDoc, upsertCar } from "../services/car.service";
import { getTodos } from "../misc/controlFlow";
import { Context } from "koa";
const Router = require('@koa/router');

export const carRouter = new Router({
    prefix: '/cars'
});

carRouter.get('/all', ctx => {
    const cars = [{
        carId: 123,
        color: 'blue',
        model: 'civic',
        year: 1999,
        inRental: true
    },{
        carId: 234,
        color: 'red',
        model: 'Tesla',
        year: 2016,
        inRental: false
    }]
    ctx.body = cars;
})

carRouter.get('/', async (ctx) => {
    const carId = ctx.request.query.id
    ctx.body = await readCarById(carId);
    // ctx.body = 'Car route 1';
});

carRouter.post('/', async (ctx) => {
    // await createCar(ctx.request.body)
    const carId = await upsertCar(ctx.request.body)
    ctx.body = {
        message: 'Car created',
        id: carId
    };
});

carRouter.put('/:id', async (ctx) => {
    const path = ctx.request.path
    const pathItems = path.split('/')
    const carId = pathItems[2]
    // console.log('ctx.request.body: ', ctx.request.body);
    await updateDoc(ctx.request.body, carId)
    ctx.body = {
        message: 'Car updated',
        id: carId
    };
});

carRouter.delete('/:id', async (ctx: Context) => {
    const path = ctx.request.path
    const pathItems = path.split('/')
    const carId = pathItems[2]
    await deleteCar(carId)
    ctx.body = `Ok, deleted id#${carId}`;
    // ctx.router available
});