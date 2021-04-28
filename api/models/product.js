const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({

  name: { type: String, Required:  'Product name cannot be left blank.' },

  sku:    { type: String, Required:  'Product sku cannot be left blank.'},

  description: { type: String, Required:  'Product description cannot be left blank.' }
});

module.exports = mongoose.model('Products', productSchema);