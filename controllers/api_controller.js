var db = require('../models');
var express = require('express');
var router = express.Router();

// Require jQuery
var sget = require('simple-get');

var allResults = {results: [{ formatted_address: 'San Francisco, CA, United States',
    geometry: { location: [Object], viewport: [Object] },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/generic_recreational-71.png',
    id: '26542c7c02ab2795925b9cec81f7bac6047fd102',
    name: 'Golden Gate Park',
    opening_hours: { open_now: true, weekday_text: [] },
    photos: [ [Object] ],
    place_id: 'ChIJY_dFYHKHhYARMKc772iLvnE',
    price_level: 0,
    rating: 4.7,
    reference: 'CmRRAAAANipIgqbnqdMSAjom08HhvidFOwY5oVyVnR1ZLO2SB4qLu1rFM4L_qfkwJS6Duc57wUItihR1lHJf_4FQkO0PFcKxttlHXOYDEM5hNDOH6eALb-H40r_-zVMLX2Km1jt6EhAyMfrrXbJVpUqpjK0vLZCkGhR8XT2_bcP6rHad0SXhz8v8G5ZkNw',
    types: [ 'park', 'point_of_interest', 'establishment' ] },

  { formatted_address: '800 North Point St, San Francisco, CA 94109, United States',
    geometry: { location: [Object], viewport: [Object] },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png',
    id: '25be2a94b0c307fb1bd92fef211a7e98ecf99674',
    name: 'Gary Danko',
    opening_hours: { open_now: true, weekday_text: [] },
    photos: [ [Object] ],
    place_id: 'ChIJq342JeGAhYARwdtH9tlX7gg',
    price_level: 4,
    rating: 4.5,
    reference: 'CmRRAAAAn0VrzoeZt97tkVqIYYSB9lP3jEKwvjs7f4_EYy_I1EA-FtOHelZ_I1yPMNzUp80flJcR0PMc9uVkLOkbVU8a7slb0rmR3UGMj3mY7N3o1BG8Y3yApAEKVvQuczCIQWzQEhAKanAViEQXqKJEvdFxmiwTGhQ50vuc-IClVAUIjkR_0Abr4HAP7w',
    types: 
     [ 'bar',
       'restaurant',
       'food',
       'point_of_interest',
       'establishment' ] } ] };

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

  var query = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + city + "&type=" + type + "&key=AIzaSyDAWpS82SOzjGchLjXznjhyCoVC8zxQw_s";
  sget.concat(query, function(err, response, data) {
    if (err) throw err;
    // var allResults = JSON.parse(data.toString('utf-8'));
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
    console.log(allLists.restaurants);
    // console.log(allLists)
    // res.json(allLists);
    res.render('results', allLists);
  })
});

module.exports = router;