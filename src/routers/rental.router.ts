import { deleteRental, getAllRentals, readRentalById, updateRental, upsertRental } from "../services/rental.service";
import { Context } from "koa";
const Router = require('@koa/router');

export const rentalRouter = new Router({
    prefix: '/rentals'
});

rentalRouter.get('/', async (ctx) => {
    const rentalId = ctx.request.query.id
    ctx.body = await readRentalById(rentalId);
});

rentalRouter.get('/all', async (ctx) => {
    ctx.body = await getAllRentals();
});

rentalRouter.post('/', async (ctx) => {
    const rentalInfo = ctx.request.body;
    try{
        validateRentalInfo(rentalInfo)
    } catch(err){
        ctx.status = 400
        ctx.body = String(err)
        return 
    }
    try{
        const rentalId = await upsertRental(rentalInfo)
        ctx.body = {
            message: 'Rental created',
            id: rentalId
        };
    } catch(err) {
        ctx.body = String(err)
        if(String(err).indexOf('Could not find car') !== -1){
            ctx.status = 404
        } else if(String(err).indexOf('Car is unavailable') !== -1){
            ctx.status = 409
        } else {
            ctx.status = 500
        }
    }
});

rentalRouter.put('/:id', async (ctx) => {
    const path = ctx.request.path
    const pathItems = path.split('/')
    const rentalId = pathItems[2]
    await updateRental(ctx.request.body, rentalId)
    ctx.body = {
        message: 'Rental updated',
        id: rentalId
    };
});

rentalRouter.delete('/:id', async (ctx: Context) => {
    const path = ctx.request.path
    const pathItems = path.split('/')
    const rentalId = pathItems[2]
    await deleteRental(rentalId)
    ctx.body = {
        message: `Ok, deleted id #${rentalId}`
    };
});

function validateRentalInfo(rentalInfo) { 
    if(!rentalInfo.carId || !rentalInfo.startTime || !rentalInfo.endTime){
        throw new Error('Missing information on rental')
    }
}