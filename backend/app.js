const express = require("express");
const app = express();
const Products = require("./router/products");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(Products);
module.exports = app;
