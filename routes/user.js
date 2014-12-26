var User = require('../models/user');
var auth = require('../middlewares/auth');
/*
 * GET users listing.
 */

module.exports = {
  listUser: function(req, res) {
    User.find(function(err, data){
      res.json(data);
    })
  },
  getLogin: function (req, res) {
  	res.render('user/login', { title: 'Express', user: req.user});
  },
  postLogin: function(req, res) {
    res.json(req,'\n', res);
  },
  logout: function (req, res) {
  	req.logout();
  	res.redirect('/user/login');
  }
}
