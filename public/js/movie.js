app.controller('movie',function ($scope,$http,$window) {


	$scope.rec_movies_show = false;
	$scope.movie_result_show = false;
	$scope.movie_result_show = false
	$scope.imdbid 
	$scope.search_imdbid
	$scope.search_movieId
	$scope.allMovies = []
	$scope.allMovies_index = []
	var baseurl = 'http://localhost:2000';
	var baseurl2 = 'http://localhost:5000';
	var url = baseurl+'/api'

	$http.jsonp("http://www.omdbapi.com/?t=batman&y=&plot=large&r=json&callback=JSON_CALLBACK&page=10")
	.success(function(response){
		$scope.movies = response;
	});

	$http.get(url+'/movies/all')
		.success(function(data){
			for (i in data){
				$scope.allMovies.push(data[i]['title'])
				$scope.allMovies_index.push(i)
			}
		})
	
	$scope.findmovie = function(movie){
		$scope.rec_movies_show = true;
		$http.get(url+'/movies/search/'+movie.name+'/name')
			.success(function(data){
				$scope.search_movieId = data[0].movieId;
				$scope.search_imdbid = data[0].imdbId
				var url_s ="http://www.omdbapi.com/?i="+$scope.search_imdbid+"&y=&plot=short&r=json$callback=JSON_CALLBACK&page=10";
				$http.get("http://www.omdbapi.com/?i="+$scope.search_imdbid+"&y=&plot=short&r=json$callback=JSON_CALLBACK&page=10")
				.success(function(response){
					console.log(response)
					$scope.movie_result_show = true
					
					$scope.movies = response;
					$scope.imdbid = response.imdbID;
					$scope.rec_movies
					var url1 = url+'/movies/'+response.imdbID+'/imdbid';
					location.href=baseurl+'/#movie_result_ptr'
					$http.get(url1)
						.success(function(movie_data){

							var url2 = baseurl2+'/recomend/'+movie_data.movieId;
							$http.get(url2)
								.success(function(data){
									location.href=baseurl+'/#rec_movies_ptr'
									console.log('received')
									var arr = []
									for(var i in data){
										var temp = {
											id:data[i][0],
											name:data[i][1],
											poster:data[i][2]
										}
										arr.push(temp)
									}
									console.log(arr)
									$scope.rec_movies = arr
							})
						})
					
	});

		})

	}

})