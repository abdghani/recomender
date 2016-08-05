var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moviesSchema = new Schema({

	movieId:{type:Number},
	imdbId:{type:String},
	title:{type:String},
	genres:{type:String},
	genresV:{type:String}
	
})
module.exports = mongoose.model('movies',moviesSchema);