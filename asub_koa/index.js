// 法一：
// var Koa = require('koa');
var Koa = require('./qkoa');
var app = new Koa();
// response
app.use(ctx => {
    ctx.body = 'Hello Koa';
});
app.listen(3000, ()=>{
    console.log('listening 3000...');
});


// 法二：
// var Koa = require('koa');
// var http = require('http');
// var app = new Koa();
// // response
// app.use(ctx => {
//     ctx.body = 'Hello Koa';
// })
// http.createServer(app.callback()).listen(3000);