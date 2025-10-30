const routes = require('express').Router();
const {signin, signup, signout, checkAuth} = require('../Controllers/authController.js');



routes.post("/auth/signin", signin);
routes.post("/auth/signup", signup);
routes.post("auth/signout", signout);
routes.post("auth/checkAuth",checkAuth );





module.exports = routes;