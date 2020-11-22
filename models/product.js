var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema(
    {
        name: { type: String },
        price: { type: Number },
        productType: { type: String},
        upc: { type: Number }
    }
);

// product URL
ProductSchema
.virtual('url')
.get(function() {
    return '/products/' + this._id;
});

module.exports = mongoose.model('Product', ProductSchema);