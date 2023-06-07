/**
 * GPT4 Prompt
 *     I want to have a simple server file I can use for testing it on my local machine.
 *     Here is what I have so far, but it cannot handle serving the other files used by the page.
 */

const http = require("http");
const fs = require("fs");
const path = require("path");

require("./templates/compile.js");
require("./styles/compile.js");

const server = http.createServer((req, res) => {
  let filePath = "." + req.url;
  if (filePath === "./") filePath = "./index.html";

  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
  };

  const contentType = mimeTypes[extname] || "application/octet-stream";

  fs.readFile(filePath, function(error, content) {
    if (error) {
      res.writeHead(500);
      res.end(`Sorry, check with the site admin for error: ${error.code} ..\n`);
      res.end(); 
    }
    else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

const port = process.env.PORT || 3000;
console.log(`Listening on port ${port}`);
server.listen(port);