import { readCar } from "../services/car.service";
import { getTodos } from "../misc/controlFlow";
import { Car, iCar } from "../interfaces/iCar";
import { Context } from "koa";
const Router = require('@koa/router');


export const carRouter = new Router({
    prefix: '/cars'
});

carRouter.get('/', async (ctx) => {
    ctx.body = 'Car route 1';
});

carRouter.post('/', (ctx) => {
    console.log('ctx.request.body: ', ctx.request.body);
    const newCar: Car = new Car(ctx.request.body);
    console.log('newCar: ', newCar);
    ctx.body = 'Car created';
});

carRouter.put('/', async (ctx) => {
    console.log('ctx.request.body: ', ctx.request.body);
    ctx.body = await getTodos();
});

carRouter.delete('/', (ctx: Context) => {
    const query = ctx.request.query;
    console.log('query: ', query);
    console.log('ctx.request.body: ', ctx.request.body);
    ctx.body = `Ok, deleted id#${query.id}`;
    // ctx.router available
});