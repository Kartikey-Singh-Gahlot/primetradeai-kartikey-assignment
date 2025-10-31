const routes = require('express').Router();
const {signin, signup, signout, checkAuth} = require('../Controllers/authController.js');
const { showNotes, editNote, getNote, addNote } = require('../Controllers/utilityController.js');



routes.post("/auth/signin", signin);
routes.post("/auth/signup", signup);
routes.post("/auth/signout", signout);
routes.get("/auth/checkAuth",checkAuth );

routes.get("/notes", showNotes);
routes.get("/notes/:id", getNote);
routes.post("/notes", addNote);





module.exports = routes;