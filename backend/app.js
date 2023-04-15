const express = require("express");
const app = express();
const path = require("path");
//here import the Routers
const Products = require("./router/products");
const user = require("./router/user");
const Order = require("./router/order");
//set up my requirements
const cors = require("cors");
const errorMiddelware = require("./middleware/errors");
const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieparser());
//Serve static files from the 'images' directory
app.use("/backend/images", express.static(path.join(__dirname, "images")));
//use cors
app.use(cors());
app.use("", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next(); // pass control to the next middleware function
});

//using of Routers & Middelwares
app.use(Products);
app.use(user);
app.use(errorMiddelware);
app.use(Order);

//exports of Application
module.exports = app;
