var db = require('../models');
var express = require('express');
var router = express.Router();

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
	console.log(req.body)
	db.users.create(req.body, function (err) {
		if (err) throw err
		console.log('Success')
	});
});

// router.get('/auth/facebook', passport.authenticate('facebook'));

// router.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { successRedirect: '/',
//                                       failureRedirect: '/login' }));


module.exports = router;
