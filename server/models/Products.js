const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  latin_name: {
    type: String
  },   
  category_id: {
    type: Schema.Types.ObjectId,
    ref: 'Categories'
  },
  image: {
    type: Buffer,
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
