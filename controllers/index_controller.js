var db = require('../models');
var express = require('express');
var router = express.Router();
var bcrypt = require("bcrypt");

var saltRounds = 10;

router.get("/", function(req, res) {
	res.render("index");
});

router.get("/login", function(req, res) {
	res.render("login");
});

router.post("/login", function(req,res) {
});

router.get("/signup", function(req, res) {
	res.render("signup")
});

router.post("/signup", function(req, res) {
	var user = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
  		user_name: req.body.user_name,
  		password:  bcrypt.hashSync(req.body.password, saltRounds) 
  	};

	db.users.create(user).then(function (err) {
		res.redirect("/");
	});
});



// router.get('/auth/facebook', passport.authenticate('facebook'));

// router.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { successRedirect: '/',
//                                       failureRedirect: '/login' }));


module.exports = router;
