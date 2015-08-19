var app = angular.module('angularjs-starter', []);

app.controller('SpicyCtrl', function($scope) {
  $scope.spice = 'very';
  $scope.spicy = function(spice) {
    $scope.spice = spice;
  };
});