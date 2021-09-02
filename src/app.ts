import { Context } from "koa";
import { getTodos } from "./misc/controlFlow";
import { logger } from "./utils/logger";

const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const router = new Router();

// bodyparser
app.use(bodyParser())

// Routing
/* 
Add routing here
*/
app.use(router.routes());

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

// Entry point
app.use(async (ctx: Context) => {
    console.log('ctx: ', ctx.path);
    if(ctx.path === '/todos') {
        ctx.body = await getTodos();
    } else if (ctx.path === '/'){
        ctx.body = 'Health check: Ok'
    } else {
        ctx.response.status = 404;
    }
})

const port = process.env.PORT || 8080; 
app.listen(port, () => {
    console.log(`Server started. Listening on port ${port}`);
});