var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  author: String,
  title: String,
  link: String,
  rating: Number,
  'creation date': Date,
  comments: Array
});

module.exports = mongoose.model('Article', ArticleSchema);
