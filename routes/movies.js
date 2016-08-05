var express = require('express');
var router = express.Router();
var async = require('async')
var moviesdb = require('../models/movies.js');
var links = require('../models/links.js');
var api = require('../models/api.js')
var meansize = require('../models/meansize.js');
var imdb = require('imdb')

//list of movie apis
router.get("/",function(req,res){
	api.find({title:"movies"},{description:1,_id:0},function(err,data){
		res.json(data)
	})
})

router.post('/',function(req,res){
	console.log(typeof(req.body))
	console.log(req.body)
	res.json(req.body)
})

//get all movies
router.get("/all",function(req,res){
	moviesdb.find({},{movieId:1,title:1,genres:1,genresV:1,_id:0},function(err,data){
		res.json(data)
	})
})

//get a movie by its id
router.get("/:movieid",function(req,res){
	moviesdb.findOne({movieId:req.params.movieid},function(err,data1){
		if(err){
			res.json({
				error:"unable to fetch data"
			})
		}
		var x = data1.imdbId
		while(x.length<7){
				x = '0'+x
		}
		x='tt'+x
		data1.imdbId=x
		res.json(data1)
	})
})

//get the title of a movie by id
router.get("/:movieid/title",function(req,res){
	moviesdb.findOne({movieId:req.params.movieid},{title:1,_id:0},function(err,data){
		if(err){
			res.json({
				error:"unable to fetch data"
			})
		}
		res.json(data)
	})
})

//get the genre of movie by id
router.get("/:movieid/genre",function(req,res){
	moviesdb.findOne({movieId:req.params.movieid},{genres:1,_id:0},function(err,data){
		if(err){
			res.json({
				error:"unable to fetch data"
			})
		}
		res.json(data)
	})
})

//get the genre vector of movie by its id
router.get("/:movieid/genreV",function(req,res){
	moviesdb.findOne({movieId:req.params.movieid},{genresV:1,_id:0},function(err,data){
		if(err){
			res.json({
				error:"unable to fetch data"
			})
		}
		res.json(data)
	})
})

//get genres of all movies
router.get('/genreV/all',function(req,res){
	moviesdb.find({},{movieId:1,genresV:1,_id:0},function(err,data){
		res.json(data)
	})
})

//get details of movies by imdbid

router.get('/:imdbid/imdbid',function(req,res){
	moviesdb.findOne({imdbId:req.params.imdbid},function(err,data){
		if(err){
			res.json({
				error:"unable to fetch data"
			})
		}
		res.json(data)
	})
})

router.get('/:movieId/mean',function(req,res){
	meansize.findOne({movie_id:req.params.movieId},{movie_id:1,size:1,mean:1,_id:0},function(err,data){
		if(err){
			res.json({
				error:"unable to fetch data"
			})
		}
		res.json(data)
	})
})

router.get('/mean/all',function(req,res){
	meansize.find({},{movie_id:1,size:1,mean:1,_id:0},function(err,data){
		if(err){
			res.json({
				error:"unable to fetch data"
			})
		}	
		res.json(data)
	})
})

router.get('/all',function(req,res){
	moviesdb.find(function(err,data){
		res.json(data)
	})
})

router.get('/search/:name/name',function(req,res){
	
	moviesdb.find({title:req.params.name},function(err,data){
		if(err){
			res.json({
				error:"unable to fetch data"
			})
		}	
		res.json(data)
	})
})

router.get('/all/movies/x',function(req,res){

	moviesdb.findOne({},{title:1,_id:0}).exec(function(err,data){
		res.json(data)
	})

})

module.exports = router;
