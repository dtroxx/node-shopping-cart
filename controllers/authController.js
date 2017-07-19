const mongoose = require('mongoose');
const passport = require('passport');

exports.login = passport.authenticate('local', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/user/login',
  failureFlash: true
});

exports.registerLogin = passport.authenticate('local', {
  successReturnToOrRedirect: '/',
  successFlash: 'Thank you for registering! You are now logged in!',
  failureRedirect: '/user/register',
  failureFlash: true
});

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'You are now logged out!');
  res.redirect('/');
};
