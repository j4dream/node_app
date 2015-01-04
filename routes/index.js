var user = require('./user');
var Artical = require('../models/artical');
var passport = require('passport');
var auth = require('../middlewares/auth');
/*
 * GET home page.
 */
module.exports.init = function (app) {
	app.get('/', function (req, res) {
		Artical
		.find()
		.limit(99)
		.sort({time:'desc'})
		.exec(function (err, articals) {
			if (err) return console.error(err);
			res.render('index', { title: 'Express', user: req.user, articles: articals});
		});
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

	app.get('/article/:id', function(req, res) {
		Artical.findOne({_id: req.params.id}, function(err, article) {
			if (err) return console.error(err);
			res.render('article-detail', {title: 'Editor',user: req.user, article: article});
		});
	});

	app.get('/admin/delArticle/:id', auth.requireLogin, function(req, res) {
		Artical.remove({_id: req.params.id}, function(err, article) {
			if (err) return console.error(err);
			res.json({code: 0, msg: 'success'});
		});
	});

	app.get('/admin/editPost', auth.requireLogin, function(req, res) {
		res.render('admin/editor', {title: 'Editor', user: req.user, article: {}});
	});

	app.get('/admin/editPost/:id', auth.requireLogin, function(req, res) {
		Artical.findOne({_id: req.params.id}, function(err, article) {
			if (err) return console.error(err);
			res.render('admin/editor', {title: 'Editor',user: req.user, article: article});
		});
	});

	app.post('/admin/createPost', auth.requireLogin, function(req, res) {
		var artical = new Artical(req.body);
		artical.save(function (err, artical) {
		  if (err) return console.error(err);
		});
  	 res.redirect('/');
	});

	app.get('/admin/listPost', auth.requireLogin, function(req, res) {
		Artical
		.find()
		.sort({time:'desc'})
		.exec(function (err, articals) {
			if (err) return console.error(err);
			res.render('admin/list-post', { title: 'Express', user: req.user, articles: articals});
		});
	});

}
