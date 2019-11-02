const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  latin_name: {
    type: String
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Categories',
    required: true
  },
  image: {
    type: String,
    contentType: String
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Products', ProductSchema);
