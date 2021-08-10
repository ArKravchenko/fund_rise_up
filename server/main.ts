require('dotenv-flow').config()
import config from "@root/nuxt.config"
import {Builder, Nuxt} from 'nuxt';

const bodyParser = require('koa-body');
const Koa = require('koa');
const app = new Koa();
const router = require('./router');


app.use(bodyParser({
    multipart: true,
    urlencoded: true
}));
app.use(router.routes())
    .use(router.allowedMethods());


let nuxt;

if (process.env.NODE_ENV === 'production') {
    config.dev = false;
    nuxt = new Nuxt(config);
} else {
    nuxt = new Nuxt(config);
    new Builder(nuxt).build();
}

app.use(ctx => {
    ctx.status = 200
    ctx.respond = false
    ctx.req.ctx = ctx
    nuxt.render(ctx.req, ctx.res)
})


app.listen(3000, () => {
    console.log('server is listening on http://localhost:3000')
});

