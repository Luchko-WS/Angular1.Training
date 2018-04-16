// Code goes here
(function(){

    var MainCtrl = function($scope, gitHub, $routeParams){
        
        var onUserComplete = function(data){
            $scope.user = data;
			gitHub.getRepos($scope.user).then(onRepos, onError);
        };
        
		var onRepos = function(data){
			$scope.repos = data;
		};
		
        var onError = function(reason){
			$scope.user = null;
			console.log($scope.user);
            $scope.error = "Couldn't fetch the user";
        };

        $scope.username = $routeParams.username;
		$scope.repoSortOrder = '-created_at';
        gitHub.getUser($scope.username).then(onUserComplete, onError);
    };
    
    app.controller("UserCtrl", UserCtrl);

}());