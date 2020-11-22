#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);

var async = require('async')
var Product = require('./models/product')
var Worker = require('./models/worker')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var products = []
var workers = []

function workerCreate(first_name, last_name, position, s_date, b_date, cb) {
    workerdetail = {first_name:first_name , last_name: last_name }
    var worker = new Worker(workerdetail);
    worker.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New Worker: ' + worker);
        workers.push(worker)
        cb(null, worker)
    }  );
}

function productCreate(name, price, productType, upc, cb) {
    productdetail = {
        name: name,
        price: price,
        productType: productType,
        upc: upc
    }

    var product = new Product(productdetail);
    product.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New Product: ' + product);
        products.push(product)
        cb(null, product)
    }  );
}

function createWorkers(cb) {
    async.series([
            function(callback) {
                workerCreate('Patrick', 'Rothfuss', 'Manager', '2020-08-23', '1997-05-03', callback);
            },
            function(callback) {
                workerCreate('Ben', 'Bova', 'Assistant Manager', '2020-02-22', '1990-08-03', callback);
            },
            function(callback) {
                workerCreate('Isaac', 'Asimov', 'Database Admin', '1992-04-06', '1987-07-19', callback);
            },
            function(callback) {
                workerCreate('Bob', 'Billings', 'Inventory Stocker', '2019-03-24', '1999-03-21', callback);
            },
            function(callback) {
                workerCreate('Jim', 'Jones', 'Inventory Stocker', '2018-09-08', '2002-02-14', callback);
            }
        ],
        // optional callback
        cb);
}

function createProducts(cb) {
    async.parallel([
            function(callback) {
                productCreate("Chainsaw", "59.99", "outdoors", "01102200", callback);
            },
            function(callback) {
                productCreate("Shovel", "19.99", "outdoors", "02102200", callback);
            },
            function(callback) {
                productCreate("Garden Hoe", "9.99", "outdoors", "01402200", callback);
            },
            function(callback) {
                productCreate("Phillip's Screwdriver Set", "79.99", "indoors", "01102500", callback);
            },
            function(callback) {
                productCreate("Flathead Set", "29.99", "indoors", "01102600", callback);
            }
        ],
        // optional callback
        cb);
}

async.series([
        createWorkers,
        createProducts
    ],
// Optional callback
    function(err) {
        if (err) {
            console.log('FINAL ERR: '+err);
        }
        mongoose.connection.close();
});



