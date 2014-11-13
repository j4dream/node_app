(function() {
  var Schema, User, mongoose;

  mongoose = require('mongoose');

  Schema = mongoose.Schema;

  User = new Schema({
    email: {
      type: String
    },
    password: {
      type: String
    },
    name: {
      type: String
    },
    phone: {
      type: String
    },
    gender: {
      type: String
    }
  });

  module.exports = mongoose.model('User', User);

}).call(this);
