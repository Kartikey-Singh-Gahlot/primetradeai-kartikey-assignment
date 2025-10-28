const routes = require('express').Router();
const {home} = require('../Controllers/utilityController.js');


routes.get("/", home);


module.exports = routes;