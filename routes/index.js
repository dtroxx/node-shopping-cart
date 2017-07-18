const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
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
router.get('/checkout', ensureLoggedIn('/user/login'), checkoutController.getCheckout);
router.post('/checkout', ensureLoggedIn('/user/login'), checkoutController.postCheckout);

module.exports = router;
