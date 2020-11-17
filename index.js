const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

app.use(express.static('public'))

app.get('/', (req,res) => {
   // res.send('Dashboard / Homepage')
    res.render('home')
})

app.get('/products', (req,res) => {
    res.render('products')
})

app.get('/purchases', (req,res) => {
    res.render('purchases')
})

app.get('/suppliers', (req,res) => {
    res.render('suppliers')
})

/*app.get('*', (req, res) => {
    res.send('I don\'t know this page')
})*/

app.listen(3000, () => { console.log("LISTENING")});