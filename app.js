const dotenv = require("dotenv");
//const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(
  cors({origin: "http://localhost:3000",
  })
);

dotenv.config({ path: "./config.env" });
require("./db/conn");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
//const User = require("./model/userSchema");

app.use(require("./router/auth"));

//const User1 = require("./model/crudSchema");

app.use(require("./router/crudRouting"));

const PORT = process.env.PORT;

//Middleware

const middleware = (req, res, next) => {
  console.log(`This is middleware...`);
  next();
};

app.get("/", (req, res) => {
  res.send(`Hello World from the server app.js`);
});
app.get("/about", middleware, (req, res) => {
  console.log(`This is About`);
  res.send(`Hello About World from the server`);
});
app.get("/contact", (req, res) => {
  res.send(`Hello Contact World from the server`);
});
app.get("/services", (req, res) => {
  res.send(`Hello Services World from the server`);
});
app.get("/login", (req, res) => {
  res.send(`Hello Login World from the server`);
});
app.get("/signup", (req, res) => {
  res.send(`Hello Registration World from the server`);
});
app.get("/api/get", (req, res) => {
  res.send(`Hello info get World from the server`);
});
app.post
("/api/post", (req, res) => {
  res.send(`Hello info post World from the server`);
});
app.delete("/api/remove/:id", (req, res) => {
  res.send(`Hello info delete World from the server`);
});
app.get("/api/get/:id", (req, res) => {
  res.send(`Hello info get by id World from the server`);
});
app.put("/api/update/:id", (req, res) => {
  res.send(`Hello info post by id World from the server`);
});

app.listen(PORT, () => {
  console.log(`Server is running at port no ${PORT}`);
}); 