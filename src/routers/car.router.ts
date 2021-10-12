import { deleteCar, getAllCars, readCarById, updateCar, upsertCar } from "../services/car.service";
import { Context } from "koa";
const Router = require('@koa/router');

export const carRouter = new Router({
    prefix: '/cars'
});

carRouter.get('/', async (ctx) => {
    const carId = ctx.request.query.id
    ctx.body = await readCarById(carId);
});

carRouter.get('/all', async (ctx) => {
    ctx.body = await getAllCars();
});

carRouter.post('/', async (ctx) => {
    
    const carInfo = ctx.request.body
    try{
        validateCarInfo(carInfo)
    } catch(err) {
        ctx.status = 400
        ctx.body = String(err)
        return 
    }
        
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

    await updateCar(ctx.request.body, carId)

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
    ctx.body = {
        message: `Ok, deleted id #${carId}`
    }
});

function validateCarInfo(carInfo) { 
    if(!carInfo.model || !carInfo.year || !carInfo.color){
        throw new Error('Missing information on car')
    }
}