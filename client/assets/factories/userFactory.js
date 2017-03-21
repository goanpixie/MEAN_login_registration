app.factory('userFactory', ['$http', function($http) {
    function userFactory() {
        var user;

        this.create = function(createuser, callback) {
            $http.post('/register', createuser).then(function(returned_data) {
                user = returned_data.data;
                callback(returned_data.data)

            })
        }

        this.getuser = function(callback) {
            callback(user)
        }

        this.login = function(olduser, callback){
            $http.post('/login', olduser).then(function(returned_data){
                user = returned_data.data
                callback(returned_data.data)
            })
        }

        this.clearuser = function(callback){
            user = {}
            callback(user)
        }


        
    }
    return new userFactory();

}])
