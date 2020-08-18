// var Koa = require('koa');
var Koa = require('./qkoa');
var app = new Koa();

// response
// app.use(ctx => {
//     ctx.body = 'Hello Koa';
// });

const delay = () => new Promise(resolve => setTimeout(() => resolve() ,2000));
app.use(async (ctx, next) => {
    ctx.body = "1";
    await next();
    ctx.body += "5";
});
app.use(async (ctx, next) => {
    ctx.body += "2";
    await delay();
    await next();
    ctx.body += "4";
});
app.use(async (ctx, next) => {
    ctx.body += "3";
});

app.listen(3000, ()=>{
    console.log('listening 3000...');
});