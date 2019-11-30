const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderDetailSchema = new Schema ({
  order_id: { 
    type: Schema.Types.ObjectId,
    ref: 'Orders'
  },
  produckt_id: { 
    type: Schema.Types.ObjectId,
    ref: 'Products'
  },
  quantity: { 
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Order_details', OrderDetailSchema);
