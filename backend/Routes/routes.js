const routes = require('express').Router();
const {home} = require('../Controllers/utilityController.js');
const {signin, signup} = require('../Controllers/authController.js');


routes.get("/", home);

routes.get("/auth/signin", signin);
routes.get("/auth/signup", signup);



module.exports = routes;