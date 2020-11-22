var Worker = require('../models/worker');
var async = require('async');
const { body, validationResult } = require('express-validator');

exports.worker_list = function(req, res, next) {

    Worker.find()
        .sort([['family_name', 'ascending']])
        .exec(function (err, list_workers) {
            if (err) { return next(err); }
            //Successful, so render
            res.render('worker', { title: 'Worker List', worker_list: list_workers });
        });

};

exports.worker_detail = function(req, res) {
    res.send("Not working yet: worker details");
};

exports.worker_create_get = function(req, res) {
    res.render('worker_form');
};

exports.worker_create_post = [
    body('first_name', 'Title must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('last_name', 'Author must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('position', 'Summary must not be empty.').trim().isLength({ min: 1 }).escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        // Create a Book object with escaped and trimmed data.
        var worker = new Worker(
            {   first_name: req.body.first_name,
                last_name: req.body.last_name,
                position: req.body.position
            });
        // Data from form is valid. Save book.

        worker.save(function (err) {
            if (err) { return next(err); }
            //successful - redirect to new book record.
            res.redirect('/inventory/worker/');
        });
    }
];

exports.worker_delete_get = function(req, res) {
    res.send("Not working yet: worker delete");
};

exports.worker_delete_post = function(req, res) {
    res.send("Not working yet: worker delete");
};

exports.worker_update_get = function(req, res) {
    res.send("Not implemented: worker update");
};

exports.worker_update_post = function(req, res) {
    res.send("Not working yet: worker update");
};