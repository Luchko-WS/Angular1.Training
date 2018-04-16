// Code goes here
(function(){

    var app = angular.module('gitHubViewer', []);
    
    var MainCtrl = function($scope, $http){
        
        var onUserComplete = function(response){
            $scope.user = response.data;
			$http.get($scope.user.repos_url)
				.then(onRepos, onError);
        };
        
		var onRepos = function(response){
			$scope.repos = response.data;
			console.log($scope.repos);
		};
		
        var onError = function(reason){
			$scope.user = null;
			console.log($scope.user);
            $scope.error = "Couldn't fetch the user";
        };
        
		$scope.search = function(username){
			        $http.get('https://api.github.com/users/' + username)
            .then(onUserComplete, onError);
		};
		
        $scope.message = 'GitHub Viewer';
		$scope.repoSortOrder = '-created_at';
    };
    
    app.controller("MainCtrl", ["$scope", "$http", MainCtrl])

}());