const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      default: 'No Brand',
    },
    category: {
      type: String,
      default: 'General',
    },
    description: {
      type: String,
      default: 'No description',
    },
    price: {
      type: Number,
      required: true,
    },
    countInStock: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);