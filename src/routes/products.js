const express = require('express');
const router = express.Router();

const productController = require('../app/controllers/ProductController');

router.get('/:slug', productController.show);
                                   router.get('/', productController.index);

module.exports = router;
