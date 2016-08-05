var express = require('express');
var router = express.Router();
var api = require('../models/api.js');
var error = {
	error:"unable to fetch data"
}
router.get('/',function(req,res){
	api.find({title:"main"},{description:1,_id:0},function(err,data){
		if(err){
			res.json(error)
		}
		res.json(data)
	})
})

router.get('/all',function(req,res){

	api.find(function(err,data){
		if(err){
		res.json(error)
		}
		res.json(data)
	})
})

module.exports = router;