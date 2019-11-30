const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema ({
  user_id: { 
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  product_id: { 
    type: Schema.Types.ObjectId,
    ref: 'Products' 
  },
  quantity: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Carts', CartSchema);
