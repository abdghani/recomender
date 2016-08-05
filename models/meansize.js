var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var meansizeSchema = new Schema({

	movie_id:{type:Number},
	size:{type:Number},
	mean:{type:Number}
	
})
module.exports = mongoose.model('meansizes',meansizeSchema);