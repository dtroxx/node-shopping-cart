const express = require('express');
const router = express.Router();
const passport = require('passport');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { catchErrors } = require('../handlers/errorHandlers');

/* User Routes */
router.get('/register', userController.registerForm);
router.post('/register',
  userController.validateRegister,
  userController.checkIfUserExist,
  userController.register,
  authController.registerLogin
);
router.get('/login', userController.loginForm);
router.post('/login', authController.login);

router.get('/logout', authController.logout);

router.get('/profile', ensureLoggedIn('/user/login'), catchErrors(userController.getProfile));

module.exports = router;
