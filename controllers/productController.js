const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const Cart = require('../models/Cart')

exports.getProducts = async (req, res) => {
  const products = await Product.find(); // find all products
  const productChunks = [];
  const chunkSize = 3;
  // checking if there is a cart on the session if not cart is an empty object
  const cart = new Cart(req.session.cart ? req.session.cart : {});
  req.session.cart = cart; // to pass to page
  // iterate through products and slice into sets of 3 to push into array
  for (let i = 0; i < products.length; i += chunkSize) {
    productChunks.push(products.slice(i, i + chunkSize));
  }
  res.render('products', { title: 'Node Demo Shopping', productChunks, cart });
};
