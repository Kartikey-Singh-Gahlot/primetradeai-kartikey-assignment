const express = require('express');
const routes = require("./Routes/routes.js");

const app = express();

app.listen(8080);


app.use("/",routes);

module.exports = app;