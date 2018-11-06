var express = require("express");

var app = express();
var PORT = process.env.PORT || 8080;

// handle data parsing
app.use(express.urlencoded( { extended: true }));
app.use(express.json());

// ROUTER
// points our server to route files
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// LISTENER
app.listen(PORT, function() {
    console.log("App listening on PORT:" + PORT);
})