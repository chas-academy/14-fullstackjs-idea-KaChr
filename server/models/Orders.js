const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema ({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'Categories'
  },
  total: { 
    type: Number
  }
});

module.exports = mongoose.model('Orders', OrderSchema);
