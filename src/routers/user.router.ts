import { authenticate, createUser, deleteUser, readUserById, updateUser, upsertUser } from "../services/user.service";
import { Context } from "koa";
const Router = require('@koa/router');

export const userRouter = new Router({
    prefix: '/users'
});

userRouter.get('/', async (ctx) => {
    const userId = ctx.request.query.id
    ctx.body = await readUserById(userId);
    // ctx.body = 'Car route 1';
});

userRouter.post('/', async (ctx) => {
    // await createUser(ctx.request.body)
    const userId = await upsertUser(ctx.request.body)
    ctx.body = {
        message: 'User created',
        id: userId
    };
});

userRouter.post('/authenticate', async (ctx) => {

    const user = ctx.request.body;

    const isAuthenticated = await authenticate(user.username, user.password);

    if(isAuthenticated) {
        ctx.status = 200
    } else {
        ctx.status = 403
    }
})

userRouter.put('/:id', async (ctx) => {
    const path = ctx.request.path
    const pathItems = path.split('/')
    const userId = pathItems[2]
    // console.log('ctx.request.body: ', ctx.request.body);
    await updateUser(ctx.request.body, userId)
    ctx.body = {
        message: 'User updated',
        id: userId
    };
});

userRouter.delete('/:id', async (ctx: Context) => {
    const path = ctx.request.path
    const pathItems = path.split('/')
    const userId = pathItems[2]
    await deleteUser(userId)
    ctx.body = `Ok, deleted id#${userId}`;
    // ctx.router available
});