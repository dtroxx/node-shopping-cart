const mongoose = require('mongoose');
const promisify = require('es6-promisify');
const User = mongoose.model('User');
const Order = mongoose.model('Order');
const Cart = require('../models/Cart');

exports.registerForm = (req, res) => {
  res.render('register', { title: 'Register' });
};

exports.register = async (req, res, next) => {
  // create new user
  const user = new User({ email: req.body.email, name: req.body.name });
  // User.register(user, req.body.password, function(err, user) {        
  // });
  // .register handles saving to database so there is no .save()
  // .register method comes from passportLocalMongoose in User.js model
  const register = promisify(User.register, User); 
  await register(user, req.body.password);   // 
  next(); // pass to authController.login to autologin after being registered
};

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('name'); // uses express-validator
  req.checkBody('name', 'Please enter your name.').notEmpty();
  req.checkBody('email', 'Please enter a valid email - example@example.com').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });
  req.checkBody('password', 'Password cannot be blank!').notEmpty();
  req.checkBody('password-confirm', 'Confirmed password cannot be blank!').notEmpty();
  req.checkBody('password-confirm', 'Oops! Your passwords do not match!').equals(req.body.password);
    // get errors
  const errors = req.validationErrors();
    // errors will contain an array of objects
    // including the error message and the field that contains the error
  if (errors) {
    req.flash('danger', errors.map(err => err.msg));
        // render the page again and pass in the info already entered in
        // the body along with the flash errors to the page. So user
        // does not need to reenter fields again / start over
    res.render('register', { title: 'Register', body: req.body, flashes: req.flash() });
    return; // stop the function from running
  }
  next(); // there were no errors!
};

exports.checkIfUserExist = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  const name = req.body.name;
  if (user) {
    req.flash('danger', 'User with that email already exist!');
    res.render('register', { title: 'Register', name: name, email: user.email, flashes: req.flash() });
    return;
  }
  next();
};

exports.loginForm = (req, res) => {
  res.render('login', { title: 'Login' });
};

exports.getProfile = (req, res) => {
  Order.find({ user: req.user }, (err, orders) => {
    if (err) {
      return res.write('Error!');
    }
    let cart;
    orders.forEach(function(order) {
      cart = new Cart(order.cart);
      order.items = cart.generateArray();
    });
    res.render('profile', { orders: orders });
    });
};
