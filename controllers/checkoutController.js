const mongoose = require('mongoose');
const Cart = require('../models/Cart');
const Order = require('../models/Order');

exports.getCheckout = (req, res) => {
  if (!req.session.cart || req.session.cart.totalQty === 0) {
    req.flash('warning', 'Your shopping cart is empty');
    return res.redirect('/shopping-cart');
  }
  const cart = new Cart(req.session.cart);
  const errMsg = req.flash('error')[0]; // stores any errors from stripe creating charge
  res.render('checkout', { total: cart.totalPrice, errMsg: errMsg, noError: !errMsg });
};

exports.postCheckout = (req, res) => {
  if (!req.session.cart) {    
    return res.redirect('/shopping-cart');
  }
  const cart = new Cart(req.session.cart);
  
  const stripe = require("stripe")(
  "sk_test_RDtaLjxLJ8AV9ULqeH9gghtA"
);

  stripe.charges.create({
    amount: cart.totalPrice * 100,
    currency: 'usd',
    source: req.body.stripeToken, // obtained with Stripe.js passed via form in hidden input
    description: 'Test Charge'
}, function(err, charge) {
    if (err) {
        req.flash('error', err.message);
        return res.redirect('/checkout');
    }
    const order = new Order({
      user: req.user,
      cart: cart,
      address: req.body.address,
      name: req.body.name,
      paymentId: charge.id  // passed to callback of stripe.charges.create
    });
    order.save(function(err, result){ // save order to database
      if (err) {
        console.log(err);
      }
      req.flash('success', 'Purchase Successful!');
      req.session.cart = null; // clear the cart
      res.redirect('/');
    });
  });
};
