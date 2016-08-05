var mongoose = require('mongoose');
var linkSchema = mongoose.Schema({

	movieId:{type:Number},
	imdbId:{type:Number},
	tmdbId:{type:Number}
	
})
module.exports = mongoose.model('links',linkSchema);