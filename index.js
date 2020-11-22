const express = require('express');
const app = express();
const path = require('path');
// const dataModel = require('../models/data-model.js');
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }));
var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://bneveu:Flowers123@cluster0.kitui.mongodb.net/local_inventory?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { urlNewParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

app.use(express.static('public'))

app.get('/', (req,res) => {
   // res.send('Dashboard / Homepage')
    res.render('home')
})

// app.get('/products', (req,res) => {
//     // res.render('products')
// });

var inventoryRouter = require('./routes/inventory');

// app.use('/', indexRouter);
app.use('/inventory', inventoryRouter);

/*app.get('*', (req, res) => {
    res.send('I don\'t know this page')
})*/

app.listen(3000, () => { console.log("LISTENING")});