var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Artical = new Schema({
  title: {
    type: String
  },
  time: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String
  },
  micPic: {
    type: String
  },
  content: {
    type: String
  }
});

module.exports = mongoose.model('Article', Artical);
