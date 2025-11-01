const routes = require('express').Router();
const {signin, signup, signout, checkAuth} = require('../Controllers/authController.js');
const { showNotes, editNote, getNote, addNote, deleteNote } = require('../Controllers/utilityController.js');



routes.post("/auth/signin", signin);
routes.post("/auth/signup", signup);
routes.post("/auth/signout", signout);

routes.get("/auth/checkAuth",checkAuth );

routes.get("/notes", showNotes);
routes.post("/notes", addNote);

routes.get("/notes/:noteId", getNote);
routes.patch("/notes/:noteId",editNote);
routes.delete("/notes/:noteId", deleteNote)





module.exports = routes;