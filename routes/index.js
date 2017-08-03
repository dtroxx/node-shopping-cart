const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const productController = require('../controllers/productController');
const cartController = require('../controllers/cartController');
const checkoutController = require('../controllers/checkoutController');
const { catchErrors } = require('../handlers/errorHandlers');

/* Home Page */
router.get('/', catchErrors(productController.getProducts));

/* Product Page */
router.get('/product/:id', catchErrors(productController.getProduct));

/* Shopping Cart Routes */
router.get('/add-to-cart/:id', cartController.addToCart);
router.get('/shopping-cart', cartController.getCart);
router.get('/minus/:id', cartController.reduceByOne);
router.get('/plus/:id', cartController.addByOne);
router.get('/remove/:id', cartController.removeItem);

/* Checkout Routes */
router.get('/checkout', ensureLoggedIn('/user/login'), checkoutController.getCheckout);
router.post('/checkout', ensureLoggedIn('/user/login'), checkoutController.postCheckout);

module.exports = router;
