
module.exports = {
	requireLogin: function(req, res, next) {
		if(!req.isAuthenticated()){
			res.setHeader('Location', "/");
			res.send();
			return;
		}
		next();
	},
	getUser: function(req, res) {
		console.log(req.session.user);
		return req.isAuthenticated();
	},
	authUser: function (req, res, next) {
		next();
	}
}