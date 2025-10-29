const routes = require('express').Router();
const {home} = require('../Controllers/utilityController.js');
const {signin, signup} = require('../Controllers/authController.js');


routes.get("/", home);

routes.post("/auth/signin", signin);
routes.post("/auth/signup", signup);



module.exports = routes;