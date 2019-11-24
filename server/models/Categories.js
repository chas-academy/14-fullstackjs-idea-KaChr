const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('../utils');

const CategorySchema = new Schema({
  category_name: {
    type: String,
    required: true
  },
  category_url_slug: {
    type: String
  }
});

CategorySchema.pre('save', function(next) {
  this.category_url_slug = slugify(this.category_name);
  return next();
});

module.exports = mongoose.model('Categories', CategorySchema);
