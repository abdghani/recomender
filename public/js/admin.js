var admin_ctrl = angular.module('admin',[])

admin_ctrl.controller('admin_ctrl',function($scope,$http){
	
	 $http.get('/api/movies').success(function(data){
					$scope.movieapi = data
		})

	 $http.get('/api/ratings').success(function(data){
					$scope.ratingapi = data
	 	})
	 $http.get('/api/imdb').success(function(data){
					$scope.imdbapi = data
	 	})
})