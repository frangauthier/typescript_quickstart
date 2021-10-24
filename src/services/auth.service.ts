import { Context } from "koa";
import { Constants } from "../utils/constants";

const apiKey = process.env.API_KEY;
const apiKeyHeader = Constants.X_API_KEY;

export async function headerAuth(ctx: Context, next) {
    if(ctx.headers && !ctx.headers[apiKeyHeader]){
        ctx.status = 401;
        ctx.body = 'Unauthorized: missing x-api-key header'
    } else if(ctx.headers && ctx.headers[apiKeyHeader] === apiKey) {
        await next();
    } else {
        ctx.status = 401;
        ctx.body = 'Unauthorized'
    }
}