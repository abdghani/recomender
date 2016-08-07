var mongoose = require('mongoose');
var genv = mongoose.Schema({

	movieId:{type:Number},
	title:{type:String},
	genresV:{type:String}
	
})

module.exports = mongoose.model('genvs',genv);