var app = angular.module('angularjs-starter', []);

app.controller('SpicyCtrl', function($scope) {
    $scope.spice = 'very';
    
    $scope.spicy = function(spice) {
        $scope.spice = spice;
    };
    //$scope.total = null;
    $scope.addCity = function (city) {
        $scope.total = $scope.city + $scope.state;
        $scope.$apply();
    };

    $scope.addLocation = function () {
        //debugger;
       // if (($scope.city != undefined && $scope.city == "" && $scope.city == null) || ($scope.state == undefined || $scope.state == "" || $scope.state == null)) {

            if ($scope.city == undefined || $scope.city == "" || $scope.city == null) {
                $scope.total = $scope.state;
                $scope.$apply();
            }
            else if ($scope.state == undefined || $scope.state == "" || $scope.state == null) {
                $scope.total = $scope.city;
                $scope.$apply();
            }
            else {
                $scope.total = $scope.city + " , " + $scope.state;
                $scope.$apply();
            }
        //}
        //else
        //{ }

    //$scope.total = $scope.city +" , "+ $scope.state;
    //$scope.$apply();
};
function addState(state)
{
    debugger;
    $scope.total = $scope.total + state;
    $scope.$apply();
};
$scope.addState = function (state) {
    $scope.total = $scope.total + state;
};
  

});