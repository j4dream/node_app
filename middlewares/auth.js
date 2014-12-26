
module.exports = {
	requireLogin: function(req, res, next) {
		if (!req.isAuthenticated()) {
			res.redirect('/user/login');
			return;
		};
		next();
	},
	getUser: function(req, res) {
		console.log(req.session.user);
		return req.isAuthenticated();
	}
}
