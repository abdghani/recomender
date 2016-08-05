var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var posterSchema = new Schema({

	poster:{type:String},
	movieId:{type:Number}
	
})
module.exports = mongoose.model('posters',posterSchema);