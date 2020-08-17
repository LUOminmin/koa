石墨地址：https://shimo.im/docs/VtCcjGvHT3qqwP8g/read
Koa源码解读
koa介绍
koa简介
Koa 是一个类似于 Express 的Web开发框架，创始人也都是TJ。Koa 的主要特点是，使用了 ES6 的 Generator 函数，进行了架构的重新设计。Koa 的原理和内部结构很像 Express，但是语法和内部结构进行了升级。

koa是一个精简的node框架，它主要做了以下事情：

基于node原生req和res为request和response对象赋能，并基于它们封装成一个context对象。
基于async/await（generator）的中间件洋葱模型机制。




洋葱圈模型
Koa中间件机制：Koa中间件机制就是函数式 组合概念 Compose的概念，将一组需要顺序执行的 函数复合为一个函数，外层函数的参数实际是内层函数的返回值。洋葱圈模型可以形象表示这种机制，是源码中的精髓和难点。 





node之http服务器
1.安装nodejs，推荐使用nvm
在我们的日常开发中经常会遇到这种情况：手上有好几个项目，每个项目的需求不同，进而不同项目必须依赖不同版的 NodeJS 运行环境。如果没有一个合适的工具，这个问题将非常棘手。

nvm 应运而生，nvm 是 Mac 下的 node 管理工具，有点类似管理 Ruby 的 rvm，如果需要管理 Windows 下的 node，官方推荐使用 nvmw 或 nvm-windows。不过，nvm-windows 并不是 nvm 的简单移植，他们也没有任何关系。

注：8.11以上版本的node版本对应的npm都没法自动安装，所以需要我们单独下载安装对应的npm版本，解决方案参考：https://blog.csdn.net/weixin_42031119/article/details/104158628

2.创建hello-world.js
Plain  Text
// 一个 nodejs 的入门级 http 服务代码
const http = require('http')
const server = http.createServer((req, res) => {
  res.writeHead(200)
  res.end('hello nodejs')
})
server.listen(3000, () => {
  console.log('server started at port 3000')
})
3.命令行运行
Plain  Text
node hello-world.js
4.浏览器访问：http://localhost:3000


koa简单使用
1.安装koa
Plain  Text
cnpm install -S koa
2.新增index.js文件：
创建一个 koa 非常简单：

Plain  Text
var Koa = require('koa');
var app = new Koa();
// response
app.use(ctx => {
    ctx.body = 'Hello Koa';
});
app.listen(3000, ()=>{
    console.log('listening 3000...');
});
或者可以酱紫：

Plain  Text
var Koa = require('koa');
var http = require('http');
var app = new Koa();
// response
app.use(ctx => {
    ctx.body = 'Hello Koa';
})
http.createServer(app.callback()).listen(3000);
 

3.命令行运行
Plain  Text
node index.js
4.浏览器访问：http://localhost:3000
koa的常见中间件
静态文件服务
Plain  Text
app.use(require('koa-static')(__dirname + '/'))
路由
Plain  Text
const router = require('koa-router')() router.get('/string', async (ctx, next) => { 
  ctx.body = 'koa2 string' }
) 
router.get('/json', async (ctx, next) => { 
  ctx.body = { title: 'koa2 json' } 
}) 
app.use(router.routes())
日志
Plain  Text
app.use(async (ctx,next) => { 
  const start = Date.now() 
  await next() 
  const end = Date.now()  
  console.log(`请求${ctx.url} 耗时${parseInt(end - start)}ms`) 
}) 
app.use(async (ctx,next) => { 
  const expire = Date.now() + 102; 
  while (Date.now() < expire) 
  ctx.body = [ { name:'tom' } ] 
}) 
手写koa源码
推荐安装nodemon
Plain  Text
cnpm install -g nodemon
修改index.js文件
Plain  Text
// var Koa = require('koa');
var Koa = require('./qkoa');




新增qkoa.js文件
Plain  Text
var http = require('http')
class Qkoa {
    constructor() {
       this.middlewares = [] 
    }
    listen(port, callback) {
        const server = http.createServer((req, res) => {
            res.end('hello world')
        })
        server.listen(port, callback)
    }
    use(middleware) {
        this.middlewares.push(middleware)
    }
}
module.exports = Qkoa
运行命令
Plain  Text
nodemon .\index.js


目前为止，Qkoa只是个架子，要真正实现目标还需要引入上下文（context）和中间件机制 （middleware）


引入上下文
koa为了能够简化API，引入上下文context概念，将原始请求对象req和响应对象res封装并挂载到 context上，并且在context上设置getter和setter，从而简化操作。 

Plain  Text
// index.js 
app.use(ctx => {
    ctx.body = 'Hello Koa';
});


扩展知识

Object.create介绍
getter/setter


中间件
同步中间件：将一组需要顺序执行的 函数复合为一个函数，外层函数的参数实际是内层函数的返回值。

Plain  Text
const add = (x, y) => x + y 
const square = z => z * z
const compose = (...[first,...other]) => (...args) => {
  let ret = first(...args) 
  other.forEach(fn => { 
    ret = fn(ret) 
  }) 
  return ret 
} 
const fn = compose(add,square) 
console.log(fn(1, 2)) 
异步中间件：上面的函数都是同步的，挨个遍历执行即可，如果是异步的函数呢，是一个 promise，我们要支持async + await的中间件，所以我们要等异步结束后，再执行下一个中间 件。 

Plain  Text
const compose = (middlewares) => {
    return function(ctx, next) {
        dispatch(0)
        function dispatch(i) {
            let fn = middlewares[i]
            if (i === middlewares.length) fn = next;
            if(!fn) return Promise.resolve()
            return Promise.resolve(fn(ctx, dispatch.bind(null, i+1)))
        }
    }
}
源代码



八  阅

