const express = require("express");
const app = express();
const Products = require("./router/products");

const user = require("./router/user");
const errorerrorMiddleware = require("./middleware/errors");
const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieparser());

app.use(Products);
app.use(user);
app.use(errorerrorMiddleware);
module.exports = app;