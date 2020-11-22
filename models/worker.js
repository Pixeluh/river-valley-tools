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

// // Worker's start date
// WorkerSchema
// .virtual('start date')
// .get(function() {
//    return this.start_date;
// });
//
// // Worker's birthday
// WorkerSchema
// .virtual('birthday')
// .get(function() {
//     return this.birth_date;
// });
//
// // Worker's position
// WorkerSchema
// .virtual('position')
// .get(function() {
//     return this.position;
// });

// URL (?)
WorkerSchema
.virtual('url')
.get(function() {
    return '/worker/' + this._id;
});

module.exports = mongoose.model('Worker', WorkerSchema);