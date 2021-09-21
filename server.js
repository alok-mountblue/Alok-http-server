// const http = require("http");
// const fs = require("fs");
const express = require("express");

const app = express();

const uuid = {
  uuid: "14d96bb1-5d53-472f-a96e-b3a1fa82addd",
};

app.get("/", (req, res) => {
  res.status(200).send("<h1>hello from the other side :)<h1>");
});

app.get("/html", (req, res) => {
  res.status(200).sendFile(__dirname + "/Data/first.html");
});

app.get("/json", (req, res) => {
  const path = __dirname + "/Data/first.json";
  res.status(200).sendFile(path);
});

app.get("/uuid", (req, res) => {
  res.json(uuid);
});

app.get("/status/:code", (req, res) => {
  res
    .status(req.params.code)
    .send(`<h1>Response with status code ${req.params.code}.<h1>`);
});

app.get("/delay/:time", (req, res) => {
  setTimeout(() => {
    res.write(`<h1>Response in ${req.params.time} sec.<h1>`);
  }, req.params.time * 1000);
});

app.listen(9000, () => {
  console.log("server running on port " + 9000);
});
