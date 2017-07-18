const mongoose = require('mongoose');
const passport = require('passport');

exports.login = passport.authenticate('local', {
  failureRedirect: '/user/login',
  failureFlash: true
});

exports.registerLogin = passport.authenticate('local', {
  successRedirect: '/',
  successFlash: 'Thank you for registering! You are now logged in!',
  failureRedirect: '/user/register',
  failureFlash: true
}, (req, res) => {
  if (req.session.oldUrl) {
    const oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  } else {
    res.redirect('/user/profile');
  }
});

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'You are now logged out!');
  res.redirect('/');
};
