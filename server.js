var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require("method-override");
var path = require("path");

var port = process.env.PORT || 3000;
var app = express();

var db = require("./models");

app.use(express.static("public"));
app.use(methodOverride('_method'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(bodyParser.text());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
// =============================================================
var api = require('./controllers/api_controller.js');
var itinerary = require('./controllers/itinerary_controller.js');
app.use('/api', api);
app.use('/itinerary', itinerary)


// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
  app.listen(port, function() {
    console.log("App listening on PORT " + port);
  });
});
