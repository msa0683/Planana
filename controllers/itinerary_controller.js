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


router.post("/:username", function(req, res) {
	console.log("request", req.body);
	var body = req.body;
	var username = req.params.username;
	console.log("itinerary created by", username);
	// Dummy itinerary ID 
	// var itineraryID = 1;
	db.users.findOne({
		attributes: ['id'],
		where: {
			username: username
		}
	}).then(function(userObj) {
		console.log("userid", userObj.dataValues.id);
		var userId = userObj.dataValues.id;
		db.itineraries.create({itinerary_name: body.itinerary_name, userId: userId}).then(function(result) {
			var itineraryID = result.dataValues.id;
			console.log("itineraryID:", itineraryID);
			if (body.place_name.length > 1) {
				for (var i = 0; i < body.place_name.length; i++) {
					if (body.photo_ref[i] === null) body.photo_ref[i] = "";
					db.activities.create({activity_name: body.place_name[i], activity_address: body.place_address[i], activity_photo: body.photo_ref[i], itineraryId: itineraryID}).then(function() {});
				}
		    	res.redirect("/");
			} else {
				db.activities.create({activity_name: body.place_name, activity_address: body.place_address, activity_photo: body.photo_ref, itineraryId: itineraryID}).then(function() {
			      res.redirect("/");
			    });
			}
		})	
	});

	

});

module.exports = router;

