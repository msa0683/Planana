var db = require('../models');
var express = require('express');
var router = express.Router();

var GoogleImages = require('google-images');
 
var imageSearch = new GoogleImages('014302329711232858745:kmu70nd-fok', 'AIzaSyBclnF5fngJWo6yb1A_FQvu6giC7YpSraY');

// William this is the method for image search. Replace index2 with actual handlebar file. 
// ============================================================================================
// imageSearch.search(cityName, {size:"large"}).then(function(images) {
//     var cityImage = images[0].url;
//   	res.render("index2", {cityImage: cityImage});
// });


router.get("/:city/:type", function(req, res) {

});

module.exports = router;

