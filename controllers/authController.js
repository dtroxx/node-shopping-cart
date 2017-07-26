const mongoose = require('mongoose');
const passport = require('passport');

exports.login = passport.authenticate('local', {
  successReturnToOrRedirect: '/',
  successFlash: `Welcome! You are now logged in`,
  failureRedirect: '/user/login',
  failureFlash: true
});

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'You are now logged out!');
  res.redirect('/');
};
