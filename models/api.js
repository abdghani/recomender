var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var apiSchema = new Schema({
	title:{type:String},
	description:
			{
				detail:{type:String},
				url:{type:String}
			}
	
})
module.exports = mongoose.model('apis',apiSchema);