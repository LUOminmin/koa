// 一个 nodejs 的入门级 http 服务代码
const http = require('http')
const server = http.createServer((req, res) => {
  res.writeHead(200)
  res.end('hello nodejs')
})

server.listen(3000, () => {
  console.log('server started at port 3000')
})