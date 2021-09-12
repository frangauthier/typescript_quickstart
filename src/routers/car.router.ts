import { readCar } from "../services/car.service";

const Router = require('@koa/router');


export const carRouter = new Router({
    prefix: '/cars'
});

carRouter.get('/', async (ctx, next) => {
    ctx.body = 'Car route 1';
    await readCar('1234');
    // ctx.router available
});

carRouter.post('/', (ctx, next) => {
    // ctx.request.body
    console.log('ctx.request.body: ', ctx.request.body);
    ctx.body = 'Car route 2';
    // ctx.router available
});