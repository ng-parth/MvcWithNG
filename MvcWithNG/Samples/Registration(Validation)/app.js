var app = angular.module('validation-example', []);

app.controller('MainCtrl', function ($scope, UserService) {
    $scope.users = UserService.getAllUsers();
    $scope.user = {};

    $scope.addUser = function (user) {
        UserService.addUser(user);
        $scope.user = {};
    };

    $scope.isDuplicate = function (user) {
        var found = false;

        angular.forEach($scope.users, function (currentUser) {
            found = angular.equals(currentUser, user);
            if (found) {
                return found;
            }
        });

        return found;
    };

    $scope.removeUser = function (user) {
        UserService.removeUser(user);
    };
});


// The Service
app.factory('UserService', function () {
    var UserService = {};
    var users = [];
    UserService.getUser = function (index) {
        return users[index];
    };
    UserService.addUser = function (user) {
        users.push(user);
    };
    UserService.removeUser = function (user) {
        users.splice(users.indexOf(user), 1);
    };
    UserService.size = function () {
        return users.length;
    };
    UserService.getAllUsers = function () {
        return users;
    };

    return UserService;
});