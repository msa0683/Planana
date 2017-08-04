var db = require('../models');
var express = require('express');
var router = express.Router();

// Require jQuery
var sget = require('simple-get');

router.get("/user/:username/api/activities", function(req, res) {
  var username = req.params.username;
  var formInput = req.query;
  var city = formInput.cityName;
  var options = Object.keys(formInput);
  var type = '';
  var tabList = [];
  for (var i = 0; i < options.length; i++) {
    if(options[i] !== 'cityName') {
      tabList.push(options[i]);
    }
  }
  var parkList = [];
  var museumList = [];
  var restaurantsList = [];
  var shoppingList = [];
  var nightlifeList = [];

  console.log("tabList:", tabList);

  var counter = 0;
  var newQuery = function() {
    var query = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + city + "&type=" + tabList[counter] + "&key=AIzaSyDpBYxlhAV09XgxayrKh5c1Cry96YquNt0";
    // Exit condition
    if (counter >= tabList.length) {
      var allLists = {
        username: username,
        tabs: tabList,
        parks: parkList,
        museums: museumList,
        restaurants: restaurantsList,
        malls: shoppingList,
        nightlife: nightlifeList
      };
      console.log("allLists:", allLists)
      res.render("thingstodo.handlebars",allLists);
      return;
    }
    // GET request to google api
    sget.concat(query, function(err, response, data) {
      if (err) throw err;
      var typeResults = JSON.parse(data.toString('utf-8'));
      typeResults.results.forEach(function(activity){
        var stars = Math.round(activity.rating);
        var starsSTR = "";
        console.log("stars", stars);
        for (var j = 0; j < stars; j++) {
          starsSTR += "&#11088;";
        }
        activity.rating = starsSTR;
      });
      console.log("results:", typeResults.results);
      console.log("tabList[counter]", tabList[counter]);
      switch(tabList[counter]) {
        case "park":
            parkList = typeResults.results;
            break;
        case "museum":
            museumList = typeResults.results;
            break;
        case "restaurant":
            restaurantsList = typeResults.results;
            break;
        case "shopping_mall":
            shoppingList = typeResults.results;
            break;
        case "night_club":
            nightlifeList = typeResults.results;
            break;            
        default:
            park = typeResults.results;
      }
      counter ++;
      newQuery();
    });
  }

  newQuery();
});



  // for (var i = 0; i < tabList.length; i++) {
  //   var query = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + city + "&type=" + tabList[i] + "&key=AIzaSyDpBYxlhAV09XgxayrKh5c1Cry96YquNt0";
  //   // GET request to google api
  //   sget.concat(query, function(err, response, data) {
  //     if (err) throw err;
  //     var typeResults = JSON.parse(data.toString('utf-8'));
  //     typeResults.results.forEach(function(activity){
  //       var stars = Math.round(activity.rating);
  //       var starsSTR = "";
  //       console.log("stars", stars);
  //       for (var j = 0; j < stars; j++) {
  //         starsSTR += "&#11088;";
  //       }
  //       activity.rating = starsSTR;
  //     });
  //     console.log("results:", typeResults.results);
  //     console.log("tabList", tabList);
  //     console.log("i", i)
  //     console.log("tabList[i]:", tabList[i]);
  //     switch(tabList[i]) {
  //       case "park":
  //           parkList = typeResults.results;
  //           break;
  //       case "museum":
  //           museum = typeResults.results;
  //           break;
  //       case "restaurant":
  //           restaurant = typeResults.results;
  //           break;
  //       case "shopping_mall":
  //           shopping_mall = typeResults.results;
  //           break;
  //       case "night_club":
  //           night_club = typeResults.results;
  //           break;            
  //       default:
  //           park = typeResults.results;
  //     }
  //     if (i === tabList.length - 1) {
  //       var allLists = {
  //         tabs: tabList,
  //         parks: parkList,
  //         museums: museumList,
  //         restaurants: restaurantsList,
  //         malls: shoppingList,
  //         nightlife: nightlifeList
  //       };
  //       console.log("allLists:", allLists)
  //       res.render("thingstodo.handlebars",allLists);
  //     }
  //   });
  // }

module.exports = router;