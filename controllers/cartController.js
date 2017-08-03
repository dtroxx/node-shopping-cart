const mongoose = require('mongoose');
const Cart = require('../models/Cart');
const Product = mongoose.model('Product');

exports.addToCart = (req, res) => {
  const productId = req.params.id;
  const cart = new Cart(req.session.cart ? req.session.cart : {});
  Product.findById(productId, (err, product) => {
    if (err) {
      return res.redirect('/');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    res.redirect('/');
  });
};

exports.getCart = (req, res) => {
  // if no cart
  if (!req.session.cart) {
    return res.render('shopping-cart', { products: null });
  }
  const cart = new Cart(req.session.cart);
  res.render('shopping-cart', { title: 'Shopping Cart', products: cart.generateArray(), totalPrice: cart.totalPrice });
};

exports.reduceByOne = (req, res) => {
  const productId = req.params.id;
  const cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.reduceByOne(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
};

exports.addByOne = (req, res) => {
  const productId = req.params.id;
  const cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.addByOne(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
};

exports.removeItem = (req, res) => {
  const productId = req.params.id;
  const cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
};
