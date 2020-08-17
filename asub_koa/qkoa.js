
// 手写Koa
// 该层文件只是为了了解KOA中间件等，外层才是例子（pos 命令通道）
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