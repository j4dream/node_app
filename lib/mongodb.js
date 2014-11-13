(function() {
  var conf, mongoose;

  mongoose = require('mongoose');

  conf = require('../conf');

  module.exports = {
    _db: null,
    connect: function(callback) {
      mongoose.connect("mongodb://" + conf.mongoServer + "/" + conf.mongoDbName);
      this._db = mongoose.connection;
      this._db.on('error', console.error.bind(console, 'connection error:'));
      return this._db.on('open', function() {
        return console.log("Connected to Mongoose...");
      });
    },
    db: function() {
      return this._db;
    }
  };

}).call(this);
