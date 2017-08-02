var db = require('../models');
var express = require('express');
var router = express.Router();

// Require jQuery
var sget = require('simple-get');


router.get("/:city/:type", function(req, res) {
  var city = req.params.city;
  var type = req.params.type;
  var query = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + city + "&type=" + type + "&key=AIzaSyDAWpS82SOzjGchLjXznjhyCoVC8zxQw_s";
  sget.concat(query, function(err, response, data) {
    if (err) throw err;
    console.log(JSON.parse(data.toString('utf-8')));
    res.json(JSON.parse(data.toString('utf-8')));
  })
});

module.exports = router;