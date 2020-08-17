// 新建简单的node服务器？？
const http = require("http");
const server = http.createServer((req,res) => {
    res.writeHead(200)
    res.end('hello')
})

server.listen(3000,() => {
    console.log('server started at 3000')
})