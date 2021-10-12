require('dotenv').config()
import { Context } from "koa";
import { carRouter } from "./routers/car.router";
import { healthRouter } from "./routers/healthcheck.router";
import { rentalRouter } from "./routers/rental.router";
import { headerAuth } from "./services/auth.service";
import { logger } from "./utils/logger";

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const app = new Koa();

// bodyparser & CORS
app.use(bodyParser())
app.use(cors());

// Health check route
app.use(healthRouter.routes());

// auth
app.use(headerAuth)

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

// Routing
app.use(carRouter.routes());
app.use(rentalRouter.routes());

// logger
app.use(logger());

// Start the app
const port = process.env.PORT || 8080; 
app.listen(port, () => {
    console.log(`Server started. Listening on port ${port}`);
});