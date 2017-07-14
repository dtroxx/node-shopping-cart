const mongoose = require('mongoose');
const passport = require('passport');

exports.login = passport.authenticate('local', {
  failureRedirect: '/user/login',
  failureFlash: 'Failed Login!',
  successRedirect: '/',
  successFlash: 'Welcome back! Your are now logged in.'
});

exports.registerLogin = passport.authenticate('local', {
  successRedirect: '/',
  successFlash: 'Thank you for registering! You are now logged in!',
  failureRedirect: '/login',
  failureFlash: true
});

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'You are now logged out!');
  res.redirect('/');
};
