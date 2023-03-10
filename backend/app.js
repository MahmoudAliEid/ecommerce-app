const express = require("express");
const app = express();
//here import the Routers
const Products = require("./router/products");
const user = require("./router/user");
const Order = require("./router/order");
//set up my requirements
const errorMiddelware = require("./middleware/errors");
const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieparser());
//using of Routers & Middelwares
app.use(Products);
app.use(user);
app.use(errorMiddelware);
app.use(Order);

//exports of Application
module.exports = app;