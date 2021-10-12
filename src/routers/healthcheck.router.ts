import { Context } from "koa";
const Router = require('@koa/router');

export const healthRouter = new Router({
    prefix: '/health'
});

healthRouter.get('/', (ctx:Context) => {  
    ctx.body = 'Healthy - Ok'
})
