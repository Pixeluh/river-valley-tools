const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser")

var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://bneveu:Flowers123@cluster0.kitui.mongodb.net/local_inventory?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { urlNewParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

app.use(express.static('public'))

router.get('/', function(req, res) {
   res.redirect('/inventory');
});

var inventoryRouter = require('./routes/inventory');
app.use('/inventory', inventoryRouter);

app.listen(3000, () => { console.log("LISTENING")});