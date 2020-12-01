var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WorkerSchema = new Schema (
    {
        first_name: { type: String, },
        last_name: { type: String, },
        position: { type: String },
        start_date: { type: Date },
        birth_date: { type: Date }
    }
);

// Virtual for worker's name
WorkerSchema
.virtual('name')
.get(function() {
    return this.last_name + ', ' + this.first_name;
});

// URL (?)
WorkerSchema
.virtual('url')
.get(function() {
    return '/worker/' + this._id;
});

module.exports = mongoose.model('Worker', WorkerSchema);