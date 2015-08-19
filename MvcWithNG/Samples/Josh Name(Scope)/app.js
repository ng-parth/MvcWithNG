var app = angular.module('angularjs-starter', []);

app.controller('MainCtrl', function($scope) {
  $scope.name = 'World';
  var user = {
    name: 'Josh',
    roles: [
      {name: 'Updater'}, 
      {name: 'Developer'}, 
      {name: 'User'}
    ]
  };
  
  $scope.user = user;
});