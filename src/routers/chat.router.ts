import { Context } from "koa";
import { getAllCars } from "../services/car.service";
import { executeQuery } from "../services/chat.service";
const Router = require('@koa/router');

export const chatRouter = new Router({
    prefix: '/chat'
});

chatRouter.post('/message', async (ctx) => {

    const query = ctx.request.body.query

    await executeQuery(query)

    ctx.body = {
        botMessage: 'Ok'
    }

});

chatRouter.post('/webhook', async (ctx) => {

    // ctx.request.body
    // console.log('ctx.request.body: ', ctx.request.body);

    const intentName = ctx.request.body.queryResult.intent.displayName
    // console.log('intentName: ', intentName);
    const color = ctx.request.body.queryResult.parameters.color


    if(intentName === 'myWebhook'){
        ctx.body = {
            "fulfillmentMessages": [
                {
                    "text": {
                        "text": [
                            "Text response from webhook"
                        ]
                    }
                }
            ]
        }
    } else if(intentName === 'carAvailable') {
        // get number of cars free
        let numberOfCarsAvailable = 0;

        const allCars = await getAllCars();
        const coloredCars = allCars.filter(car => {
            return car.color === color;
        })
        numberOfCarsAvailable = color ? coloredCars.length : allCars.length;

        ctx.body = {
            "fulfillmentMessages": [
                {
                    "text": {
                        "text": [
                            `There are ${numberOfCarsAvailable} ${color ? color + ' ' : '' }cars available`
                        ]
                    }
                }
            ]
        }
    }

    
})