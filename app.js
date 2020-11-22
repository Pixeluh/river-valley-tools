// var indexRouter = require('./routes/index');
var inventoryRouter = require('./routes/inventory');

// app.use('/', indexRouter);
app.use('/inventory', inventoryRouter);