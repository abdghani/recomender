var express = require('express');
var router = express.Router();
var moviesdb = require('../models/movies.js');
var imdb = require('imdb')
var request = require('request');
var api = require('../models/api.js')
var poster = require('../models/posters.js')
var fs = require('fs');
var imdbId = []
var movies = []
var count = 0
function make_imdb_id(x){
	x = x.toString()
	while(x.length<7){
			x = '0'+x
		}
	return(('tt'+x))
}

router.get("/",function(req,res){
	api.find({title:"imdb"},{description:1,_id:0},function(err,data){
		res.json(data)
	})
})
router.get('/:id',function(req,res){
	moviesdb.findOne({movieId:req.params.id},function(err,data){
		imdb(data.imdbId,function(err,data1){
			res.json(data1)
		})
	})
})

router.get('/:id/basics',function(req,res){
	moviesdb.findOne({movieId:req.params.id},function(err,data){
		imdb(make_imdb_id(data.imdbId),function(err,data1){
			var res_data = {
				title:data1.title,
				year:data1.year,
				contentRating:data1.contentRating,
				description:data1.description,
				poster:data1.poster,
				director:data1.director,
				writer:data1.writer
			}
			res.json(res_data)
		})
	})
})

router.get('/:id/poster',function(req,res){
	poster.findOne({movieId:req.params.id},{poster:1,_id:0},function(err,data){
		res.json(data)
	})
})

router.get('/:id/description',function(req,res){
	moviesdb.findOne({movieId:req.params.id},function(err,data){
		imdb(data.imdbId,function(err,data1){
			res.json(data1.description)
		})
	})
})



module.exports = router;