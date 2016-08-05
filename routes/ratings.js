var express = require('express');
var router = express.Router();
var moviesdb = require('../models/movies.js');
var links = require('../models/links.js');
var ratings = require('../models/ratings.js')
var api = require('../models/api.js');
var imdb = require('imdb')
var error = {
	error:"unable to fetch data"
}

//list of rating api
router.get('/',function(req,res){
	api.find({title:"ratings"},{description:1,_id:0},function(err,data){
		res.json(data)
	})
})

//review  of a particular user
router.get('/:userid/userid',function(req,res){
	ratings.find({userId:req.params.userid},{userId:1,movieId:1,rating:1,_id:0},function(err,data){
		if(err){
			res.json(error)
		}
		res.json(data)
	})
})

//review of a particular movie
router.get('/:movieid/movieid',function(req,res){
	ratings.find({movieId:req.params.movieid},{userId:1,movieId:1,rating:1,_id:0},function(err,data){
		if(err){
			res.json(error)
		}
		res.json(data)
	})
})

module.exports = router;