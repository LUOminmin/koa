var http = require('http')
// 导入这三个类
const context = require("./context");
const request = require("./request");
const response = require("./response");
const compose = require("./compose")

class Qkoa {
    constructor() {
       this.middlewares = [] 
       this.callback = () => {}
    }
    listen(port, callback) {
        const server = http.createServer(async (req, res) => {
            // 创建上下文
            let ctx = this.createContext(req, res);

            // 中间件合成
            const fn = compose(this.middlewares);
            // 执行合成函数并传入上下文
            await fn(ctx);
            res.end(ctx.body);
            // this.callback(ctx)
            // 响应
            // res.end(ctx.body);
        })
        server.listen(port, callback)
    }

    use(middleware) {
        this.middlewares.push(middleware)
    }
    // 构建上下文, 把res和req都挂载到ctx之上，并且在ctx.req和ctx.request.req同时保存
    createContext(req, res) {
        const ctx = Object.create(context);
        ctx.request = Object.create(request);
        ctx.response = Object.create(response);
        ctx.req = ctx.request.req = req;
        ctx.res = ctx.response.res = res;
        return ctx;
    }
}

module.exports = Qkoa