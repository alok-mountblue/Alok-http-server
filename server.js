const http = require("http");
const fs = require("fs");

const uuid = {
  uuid: "14d96bb1-5d53-472f-a96e-b3a1fa82addd",
};

const readFile = (file, res) => {
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h4>404 Not Found<h4>");
      return res;
    }
    res.write(data);
    res.end();
    return res;
  });
};

const httpServer = http.createServer((req, res) => {
  const arr = req.url.split("/");
  let statusCode = arr[2];
  let delayTime = arr[2];

  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>Hello from the other side<h1>");
  } else if (req.url === "/html") {
    res.writeHead(200, { "Content-Type": "text/html" });
    readFile("./Data/first.html", res);
  } else if (req.url === "/json") {
    res.writeHead(200, { "Content-Type": "application/json" });
    readFile("./Data/first.json", res);
  } else if (req.url === "/uuid") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(uuid));
  } else if (req.url === `/status/${statusCode}`) {
    res.writeHead(statusCode, http.STATUS_CODES[statusCode]);
    res.write(`<h1>Response with status code ${statusCode}.<h1>`);
    res.end();
  } else if (req.url === `/delay/${delayTime}`) {
    setTimeout(() => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(`Response ${delayTime}s`);
      res.end();
    }, delayTime * 1000);
  }
});

httpServer.listen(8000, () => {
  console.log("Server is running on port 8000...");
});
