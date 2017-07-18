const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const cartController = require('../controllers/cartController');
const checkoutController = require('../controllers/checkoutController');
const { catchErrors } = require('../handlers/errorHandlers');

/* Home Page */
router.get('/', catchErrors(productController.getProducts));

/* Shopping Cart Routes */
router.get('/add-to-cart/:id', cartController.addToCart);
router.get('/shopping-cart', cartController.getCart);
router.get('/reduce/:id', cartController.reduceByOne);
router.get('/remove/:id', cartController.removeItem);

/* Checkout Routes */
router.get('/checkout', checkoutController.getCheckout);
router.post('/checkout', checkoutController.postCheckout);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.oldUrl = req.url; // url where non logged in user came from
  res.redirect('/user/login');
}

module.exports = router;
