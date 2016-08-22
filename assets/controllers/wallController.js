app.controller('wallController', ['$scope','$location', 'userFactory', function($scope, $location, userFactory){
	$scope.user;
	var display = function(){
		userFactory.getuser(function(data){
			$scope.user = data;
			console.log($scope.user)

		})
	}
	display()
	$scope.logout = function(){
		userFactory.clearuser(function(data){
			$scope.user = data;
		})
		$location.url('/home')
	}

}]);