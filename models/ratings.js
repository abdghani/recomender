var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ratingsSchema = new Schema({

	userId:{type:Number},
	movieId:{type:Number},
	rating:{type:Number},
	timestamp:{type:Number}
	
})
module.exports = mongoose.model('ratings',ratingsSchema);