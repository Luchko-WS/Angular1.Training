// Code goes here
(function(){

    var app = angular.module('gitHubViewer', []);
    
    var MainCtrl = function($scope, $http, $interval, gitHub){
        
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
        
        var decrementCountdown = function(){
            $scope.countdown--;
            if($scope.countdown < 1){
                $scope.search($scope.username);
            }
        };
        
        var countdownInterval = null;
        var startCountDown = function(){
            countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
        };
        
		$scope.search = function(username){
            gitHub.getUser(username).then(onUserComplete, onError);
            if(countdownInterval){
                $interval.cancel(countdownInterval);
                $scope.countdown = null;
            }
		};
		
        $scope.message = 'GitHub Viewer';
		$scope.repoSortOrder = '-created_at';
        $scope.countdown = 5;
        startCountDown();
    };
    
    app.controller("MainCtrl", MainCtrl);

}());