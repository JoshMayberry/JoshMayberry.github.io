const http = require("http")
const fs = require("fs")

require("./templates/compile.js");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/html" })
  fs.createReadStream("index.html").pipe(res)
});

const port = process.env.PORT || 3000;
console.log(`Listening on port ${port}`)
server.listen(port)