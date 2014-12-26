var user = require('./user');
var Artical = require('../models/artical');
var passport = require('passport');
var auth = require('../middlewares/auth');
/*
 * GET home page.
 */
module.exports.init = function (app) {
	app.get('/', function (req, res) {
		Artical.find(function (err, articals) {
		  if (err) return console.error(err);
		  res.render('index', { title: 'Express', user: req.user, articles: articals});
		})
	});

	app.get('/user/login', user.getLogin);

	app.post('/user/login',
		passport.authenticate('local',
			{
				successRedirect: '/',
				failureRedirect: '/user/login',
				failureFlash: true
			}
		),
		user.postLogin);

	app.get('/user', auth.requireLogin, user.listUser);

	app.get('/user/logout', user.logout);

	app.get('/admin/editPost', auth.requireLogin, function(req, res) {
		res.render('admin/editor', {title: 'Editor', user: req.user});
	});

	app.post('/admin/createPost', auth.requireLogin, function(req, res) {
		var artical = new Artical(req.body);
		artical.save(function (err, artical) {
		  if (err) return console.error(err);
		});
  	res.render('admin/editor', {title: 'Editor', user: req.user});
	});

}
