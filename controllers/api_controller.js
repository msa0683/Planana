var db = require('../models');
var express = require('express');
var router = express.Router();

// Require jQuery
var sget = require('simple-get');


router.get("/activities", function(req, res) {
  var formInput = req.query;
  var city = formInput.cityName;
  var options = Object.keys(formInput);
  var type = '';
  for (var i = 0; i < options.length; i++) {
    if(options[i] !== 'cityName') {
      if (i === options.length - 1) {
        type += options[i];
      } else {
        type += options[i] + "|";
      }
    }
  }
  console.log("type:", type)

  var query = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + city + "&type=" + type + "&key=AIzaSyDAWpS82SOzjGchLjXznjhyCoVC8zxQw_s";
  sget.concat(query, function(err, response, data) {
    if (err) throw err;
    console.log(JSON.parse(data.toString('utf-8')));
    res.json(JSON.parse(data.toString('utf-8')));
  })
});

module.exports = router;