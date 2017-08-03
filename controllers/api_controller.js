var db = require('../models');
var express = require('express');
var router = express.Router();

// Require jQuery
var sget = require('simple-get');

//Google require
var GoogleImages = require('google-images');
 
var client = new GoogleImages('014302329711232858745:kmu70nd-fok', 'AIzaSyBclnF5fngJWo6yb1A_FQvu6giC7YpSraY');



router.post("/city", function(req, res) {
  var city = req.params.city;
  var type = req.params.type;
  var search = req.body.cityName;

  client.search(search).then(function(images) {
    var cityImage = images[0].url;
  	res.render("index2", {cityImage: cityImage});
});
  // var query = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + city + "&type=" + type + "&key=AIzaSyDAWpS82SOzjGchLjXznjhyCoVC8zxQw_s";
  // sget.concat(query, function(err, response, data) {
  //   if (err) throw err;
  //   console.log(JSON.parse(data.toString('utf-8')));
  //   res.json(JSON.parse(data.toString('utf-8')));
  // })
});

router.get("/", function(req, res, next) {
	res.render("index");

});



    
module.exports = router;