var express = require('express');
var router = express.Router();

// Require controller modules.
var product_controller = require('../controllers/productController');
var worker_controller = require('../controllers/workerController');


// GET catalog home page.
router.get('/', product_controller.index);

// GET request for creating a product.
router.get('/product/create', product_controller.product_create_get);

// POST request for creating product.
router.post('/product/create', product_controller.product_create_post);

// GET request to delete product.
router.get('/product/:id/delete', product_controller.product_delete_get);

// POST request to delete product.
router.post('/product/:id/delete', product_controller.product_delete_post);

// GET request to update product.
router.get('/product/:id/update', product_controller.product_update_get);

// POST request to update product.
router.post('/product/:id/update', product_controller.product_update_post);

// GET request for one product.
router.get('/product/:id', product_controller.product_detail);

// GET request for list of all product items.
router.get('/product', product_controller.product_list);

/// WORKER ROUTES ///

// GET request for creating worker.
router.get('/worker/create', worker_controller.worker_create_get);

// POST request for creating worker.
router.post('/worker/create', worker_controller.worker_create_post);

// GET request to delete worker.
router.get('/worker/:id/delete', worker_controller.worker_delete_get);

// POST request to delete worker.
router.post('/worker/:id/delete', worker_controller.worker_delete_post);

// GET request to update worker.
router.get('/worker/:id/update', worker_controller.worker_update_get);

// POST request to update worker.
router.post('/worker/:id/update', worker_controller.worker_update_post);

// GET request for one worker.
router.get('/worker/:id', worker_controller.worker_detail);

// GET request for list of all worker.
router.get('/worker', worker_controller.worker_list);

module.exports = router;