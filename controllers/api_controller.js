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
  var tabList = [];
  for (var i = 0; i < options.length; i++) {
    if(options[i] !== 'cityName') {
      tabList.push(options[i]);
      if (i === options.length - 1) {
        type += options[i];
      } else {
        type += options[i] + "|";
      }
    }
  }
  console.log("type:", type)

  var query = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + city + "&type=" + type + "&key=AIzaSyDpBYxlhAV09XgxayrKh5c1Cry96YquNt0";
  sget.concat(query, function(err, response, data) {
    if (err) throw err;
    var allResults = JSON.parse(data.toString('utf-8'));
    allResults.results.forEach(function(activity){
      var stars = Math.round(activity.rating);
      var starsSTR = "";
      for (var i = 0; i < stars; i++) {
        starsSTR += "&#11088;";
      }
      activity.rating = starsSTR;
    });
    console.log(allResults.results[0].rating);
    var parkList = [];
    var museumList = [];
    var restaurantsList = [];
    var shoppingList = [];
    var nightlifeList = [];
    for (var i = 0; i < allResults.results.length; i++) {
      if (allResults.results[i].types.indexOf('park') >= 0) parkList.push(allResults.results[i]);
      if (allResults.results[i].types.indexOf('museum') >= 0) museumList.push(allResults.results[i]);
      if (allResults.results[i].types.indexOf('restaurant') >= 0 || allResults.results[i].types.indexOf('cafe') >= 0) restaurantsList.push(allResults.results[i]);
      if (allResults.results[i].types.indexOf('shopping_mall') >= 0 || allResults.results[i].types.indexOf('department_store') >= 0) shoppingList.push(allResults.results[i]);
      if (allResults.results[i].types.indexOf('night_club') >= 0 || allResults.results[i].types.indexOf('bar') >= 0) nightlifeList.push(allResults.results[i]);
    }
    var allLists = {
      tabs: tabList,
      parks: parkList,
      museums: museumList,
      restaurants: restaurantsList,
      malls: shoppingList,
      nightlife: nightlifeList
    };

    console.log("Park ---",parkList+"\n");
    console.log("Rest---",restaurantsList+"\n");
    //res.json(allLists);
    res.render("thingstodo.handlebars",allLists);
  });
});

module.exports = router;