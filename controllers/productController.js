var Product = require('../models/product');
var Worker = require('../models/worker');
var async = require('async');
const { body, validationResult } = require('express-validator');

exports.index = function(req, res) {
    async.parallel({
        product_count: function(callback) {
            Product.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        worker_count: function(callback) {
            Worker.countDocuments({}, callback);
        }
    }, function(err, results) {
        res.render('home', { title: 'Product', error: err, data: results });
    });
};

// exports.index = function(req, res, next) {
//     res.send('NOT IMPLEMENTED: Site Home Page');
// }

// Display list of all product.
exports.product_list = function(req, res, next) {
    Product.find({}, 'price name upc productType')
        .populate('product')
        .exec(function (err, list_products) {
            if (err) { return next(err); }
            //Successful, so render
            res.render('product', { title: 'Product List', product_list: list_products });
        });

};

// Display detail page for a specific product.
// exports.product_detail = function(req, res) {
//     // res.send('NOT IMPLEMENTED: product detail: ' + req.params.id);
//     res.render('product_detail');
// };


exports.product_detail = function (req, res, next) {
    Product.findById(req.params.id).then((product) => {
        res.render('product_detail', { title: product.name, product });
    });
};



// Display product create form on GET.
exports.product_create_get = function(req, res) {
    // Get all authors and genres, which we can use for adding to our book.
        res.render('product_form');
};

// Handle product create on POST.
exports.product_create_post = [
    body('name', 'Title must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('productType', 'Author must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('price', 'Summary must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('upc', 'Summary must not be empty.').trim().isLength({ min: 1 }).escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        // Create a product object with escaped and trimmed data.
        var product = new Product(
            {   name: req.body.name,
                price: req.body.price,
                productType: req.body.productType,
                upc: req.body.upc
            });
            // Data from form is valid. Save product.

        product.save(function (err) {
                if (err) { return next(err); }
                //successful - redirect to new book product.
                res.redirect('/inventory/product/');
            });
        }
];

// Display product delete form on GET.
exports.product_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: product delete GET');
};

// Handle product delete on POST.
exports.product_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: product delete POST');
};

// Display product update form on GET.
exports.product_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: product update GET');
};

// Handle product update on POST.
exports.product_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: product update POST');
};