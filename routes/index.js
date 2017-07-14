const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(productController.getProducts));

module.exports = router;
