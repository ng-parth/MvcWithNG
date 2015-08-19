var app = angular.module('search-example', []);

app.controller('SearchCtrl', function($scope) {
  $scope.users = [
    {name: 'Josh',
      roles: [
        {name: 'User'},
        {name: 'Developer'},
        {name: 'Publisher'}
        ]
    },
    {name: 'Dave',
      roles: [
        {name: 'Guru'},
        {name: 'User'},
        {name: 'Developer'},
        {name: 'Publisher'}
        ]
    }
  ];
});