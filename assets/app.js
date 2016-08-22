var app = angular.module('Login_Registration', ['ngRoute'])
app.config(function($routeProvider){
    $routeProvider
        .when('/home', {
            templateUrl: 'partials/home.html',
            controller: 'homeController'
        })

        .when('/enterTheWall',{
        	templateUrl: 'partials/wall.html',
            controller: 'wallController'
        })
     
        .otherwise({
            redirectTo:'/home'
        })
})

