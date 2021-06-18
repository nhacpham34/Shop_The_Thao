const express = require('express');
const router = express.Router();

const productController = require('../app/controllers/ProductController');

router.get('/create', productController.create);
router.post('/store', productController.store);
router.post('/handle-form-actions', productController.handleFormAction);
router.get('/:id/edit', productController.edit);
router.put('/:id', productController.update);
router.patch('/:id/restore', productController.restore);
router.delete('/:id/force', productController.deleteForce);
router.delete('/:id', productController.delete);
router.get('/:slug', productController.show);
router.get('/', productController.index);

module.exports = router;
