// Code goes here
(function(){

    var MainCtrl = function($scope, $interval, $location){
        
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
            if(countdownInterval){
                $interval.cancel(countdownInterval);
                $scope.countdown = null;
            }
            $location.path("/user/" + username);
		};
		
        $scope.countdown = 5;
        startCountDown();
    };
    
    app.controller("MainCtrl", MainCtrl);

}());