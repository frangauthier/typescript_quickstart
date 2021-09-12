import { Context } from "koa";
import { getTodos } from "./misc/controlFlow";
import { carRouter } from "./routers/car.router";
import { logger } from "./utils/logger";

const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
// const auth = require('koa-basic-auth');
const app = new Koa();
// const router = new Router();

// bodyparser
app.use(bodyParser())

// Routing
/* 
Add routing here
*/
app.use(carRouter.routes());

// logger
app.use(logger());

// error handling
app.use(async (ctx: Context, next) => {
    try {
        await next();
    } catch (err: any) {
        // will only respond with JSON
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
            message: err.message
        };
    }
})

// // require auth
// app.use(auth({ name: 'me', pass: '1234' }));

// homemade auth
// const apiKey = '123456';
// app.use(async (ctx: Context, next) => {
//     if(ctx.headers && ctx.headers['x-api-key'] === apiKey) {
//         await next();
//     } else {
//         ctx.status = 401;
//         ctx.body = 'Unauthorized: missing x-api-key header'
//     } 
// })

const port = process.env.PORT || 8080; 
app.listen(port, () => {
    console.log(`Server started. Listening on port ${port}`);
});