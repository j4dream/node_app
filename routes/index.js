var user = require('./user');
var passport = require('passport');
var auth = require('../middlewares/auth');
/*
 * GET home page.
 */
module.exports.init = function (app) {
	app.get('/', function (req, res) {
		res.render('index', { title: 'Express', user: req.user});
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
}
