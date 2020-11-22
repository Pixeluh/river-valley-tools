var express = require('express');
var router = express.Router();

// Require controller modules.
var product_controller = require('../controllers/productController');
var worker_controller = require('../controllers/workerController');

/// BOOK ROUTES ///

// GET catalog home page.
router.get('/', product_controller.index);

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get('/product/create', product_controller.product_create_get);

// POST request for creating Book.
router.post('/product/create', product_controller.product_create_post);

// GET request to delete Book.
router.get('/product/:id/delete', product_controller.product_delete_get);

// POST request to delete Book.
router.post('/product/:id/delete', product_controller.product_delete_post);

// GET request to update Book.
router.get('/product/:id/update', product_controller.product_update_get);

// POST request to update Book.
router.post('/product/:id/update', product_controller.product_update_post);

// GET request for one Book.
router.get('/product/:id', product_controller.product_detail);

// GET request for list of all Book items.
router.get('/product', product_controller.product_list);

/// AUTHOR ROUTES ///

// GET request for creating Author. NOTE This must come before route for id (i.e. display author).
router.get('/worker/create', worker_controller.worker_create_get);

// POST request for creating Author.
router.post('/worker/create', worker_controller.worker_create_post);

// GET request to delete Author.
router.get('/worker/:id/delete', worker_controller.worker_delete_get);

// POST request to delete Author.
router.post('/worker/:id/delete', worker_controller.worker_delete_post);

// GET request to update Author.
router.get('/worker/:id/update', worker_controller.worker_update_get);

// POST request to update Author.
router.post('/worker/:id/update', worker_controller.worker_update_post);

// GET request for one Author.
router.get('/worker/:id', worker_controller.worker_detail);

// GET request for list of all Authors.
router.get('/worker', worker_controller.worker_list);

module.exports = router;