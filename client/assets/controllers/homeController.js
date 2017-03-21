app.controller('homeController', ['$scope', 'userFactory', '$location', function($scope, userFactory, $location) {

    $scope.errors = false;
    $scope.messages = [];
    $scope.user;

    $scope.create = function() {
        userFactory.create($scope.newUser, function(data) {
            $scope.messages = [];
            if (data.errors) {
                $scope.errors = true;
                for (err in data.errors) {
                    console.log(data.errors[err].message);
                    $scope.messages.push(data.errors[err].message);
                }
            } 

            else if (data.code == 11000) {
                console.log(data);
                $scope.errors = true;
                $scope.messages.push("User already exists, please login");
            }

            else {
                $location.url('enterTheWall')
            }
        });
    };


    $scope.login = function() {
        userFactory.login($scope.loginUser, function(data) {
            $scope.messages = []
            if (data.errors) {
                $scope.errors = true;
                console.log(data.errors)
            } else if (data.data) {
                $scope.errors = true;
                $scope.messages.push(data.data)
            } else {
                $location.url('/enterTheWall')

            }
        })
    }

}]);
