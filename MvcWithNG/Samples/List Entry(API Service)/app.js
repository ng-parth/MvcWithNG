var app = angular.module('service-example', []);

app.controller('FirstCtrl', function($scope, $timeout, ListService) {
  $scope.listSize = ListService.size();
  $scope.addToList = function(value) {
    ListService.addItem(value);
    $scope.listSize = ListService.size();
  };
  
  function startPolling() {
    $scope.listSize = ListService.size();
    timeoutId = $timeout(function() {
      $scope.listSize = ListService.size();
      startPolling();
    }, 1000);
  }
  startPolling();
});

app.controller('SecondCtrl', function($scope, $timeout, ListService) {
  $scope.listSize = ListService.size();
  $scope.addToList = function(value) {
    ListService.addItem(value);
    $scope.listSize = ListService.size();
  };
  
  function startPolling() {
    $scope.listSize = ListService.size();
    timeoutId = $timeout(function() {
      $scope.listSize = ListService.size();
      startPolling();
    }, 1000);
  }
  startPolling();
});

app.controller('ThridCtrl', function($scope, ListService) {
  $scope.refresh = function() {
    $scope.list = angular.copy(ListService.getAllItems());
  };
});

app.controller('FourthCtrl', function($scope, ListService) {
  $scope.list = ListService.getAllItems();
});

// The Service
app.factory('ListService', function() {
  var ListService = {};
  var list = [];
  ListService.getItem = function(index) { 
    return list[index];
  };
  ListService.addItem = function(item) {
    list.push(item);
  };
  ListService.removeItem = function(item) {
    list.splice(list.indexOf(item), 1);
  };
  ListService.size = function() { 
    return list.length;
  };
  ListService.getAllItems = function() {
    return list;
  };

  return ListService;
});