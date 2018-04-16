// Code goes here
(function(){

    var app = angular.module("gitHubViewer", []);
    
    var MainCtrl = function($scope, $http){
        
        var onUserComplete = function(response){
            $scope.user = response.data;
        };
        
        var onError = function(reason){
            $scope.error = "Couldn't fetch the user";
        };
        
        $http.get("https://api.github.com/users/Luchko-WS")
            .then(onUserComplete, onError);
        
        $scope.message = "Hello, Angular!";
    };
    
    app.controller("MainCtrl", ["$scope", "$http", MainCtrl])

}());