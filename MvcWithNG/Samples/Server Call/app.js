var app = angular.module('server-call-example', []);
//app.factory('json', function () {
//    var json = {
//        friends: [
//    {
//        "id": 1,
//        "isActive": true,
//        "name": "Kayla Wainwright",
//        "company": "Safetrust",
//        //"phone": "898-527-28018",
//        "email": "kayla@safetrust.com",
//        "city": "Cary"
//    },
//    {
//        "id": 2,
//        "isActive": true,
//        "name": "Faith Charlson",
//        "company": "Anagraph",
//        //"phone": "892-538-30157",
//        "email": "faith@anagraph.com",
//        "city": "Cleveland"
//    },
//    {
//        "id": 3,
//        "isActive": false,
//        "name": "Vanessa Ward",
//        "company": "iOptystix",
//        //"phone": "868-523-20884",
//        "email": "vanessa@ioptystix.com",
//        "city": "Chandler"
//    },
//    {
//        "id": 4,
//        "isActive": true,
//        "name": "Alexandra Miers",
//        "company": "Netseco",
//        //"phone": "864-570-29626",
//        "email": "alexandra@netseco.com",
//        "city": "Charleston"
//    },
//    {
//        "id": 5,
//        "isActive": false,
//        "name": "Mya Nelson",
//        "company": "Titanirola",
//        //"phone": "855-418-33856",
//        "email": "mya@titanirola.com",
//        "city": "Chesapeake"
//    },
//    {
//        "id": 6,
//        "isActive": true,
//        "name": "Avery Goodman",
//        "company": "Syssoft",
//        //"phone": "812-464-20644",
//        "email": "avery@syssoft.com",
//        "city": "Boise"
//    },
//    {
//        "id": 7,
//        "isActive": true,
//        "name": "Molly Oswald",
//        "company": "Anaframe",
//        //"phone": "870-561-25093",
//        "email": "molly@anaframe.com",
//        "city": "Buffalo"
//    },
//    {
//        "id": 8,
//        "isActive": false,
//        "name": "Nevaeh Morrison",
//        "company": "Turbomart",
//        //"phone": "872-478-29154",
//        "email": "nevaeh@turbomart.com",
//        "city": "Austin"
//    },
//    {
//        "id": 9,
//        "isActive": false,
//        "name": "Melanie Webster",
//        "company": "Superscope",
//        //"phone": "826-459-29370",
//        "email": "melanie@superscope.com",
//        "city": "FortLauderdale"
//    },
//    {
//        "id": 10,
//        "isActive": true,
//        "name": "Allison Gill",
//        "company": "Rapigrafix",
//        //"phone": "874-444-27047",
//        "email": "allison@rapigrafix.com",
//        "city": "Burbank"
//    }],
//    }
//    return { json: json }
//});
app.controller('timeCtrl', function ($scope, $http, json) {
    $scope.name = "Parth in scope";
    $scope.init = function () {
    };
    $scope.getTime = function () {
        var data = parseInt(1);
        var json = [{ Me: 'Parth', U: 'SmartPC' }];
        var winLoc = window.location.host;

        $http({ method: 'GET', url: '/api/values/1' }).
            success(function (data, status, headers, config) {
                $scope.time = 'Current Date/Time: ' + data;
                $scope.$apply();
            }).
            error(function (data, status, headers, config) {
            });
    };

    $scope.click1 = function () {
        var i = 1;
    };
    $scope.click = function (id) {
       // $.post("/api/values", { value: "abcd" }, function (v) { debugger; });
        var val = parseInt(id);
        var val = { value: "abc" };
       
        $.ajax({
            type: "GET",
            url: "/api/values/jsonvalues",
            //data: val, //"123ac" ,
        //    //contentType: "application/json; charset=utf-8",
        //    //dataType: string,
        //    //success: OnSuccess,
            success: function (response) {
                alert(response);
            },
            error: function (response) {
                alert(response.d);
            }
        });
    }
    $scope.sampleJsons = json.json.friends;
    //$scope.sampleJsons = [
    //{
    //    "id": 1,
    //    "isActive": true,
    //    "name": "Kayla Wainwright",
    //    "company": "Safetrust",
    //    //"phone": "898-527-28018",
    //    "email": "kayla@safetrust.com",
    //    "city": "Cary"
    //},
    //{
    //    "id": 2,
    //    "isActive": true,
    //    "name": "Faith Charlson",
    //    "company": "Anagraph",
    //    //"phone": "892-538-30157",
    //    "email": "faith@anagraph.com",
    //    "city": "Cleveland"
    //},
    //{
    //    "id": 3,
    //    "isActive": false,
    //    "name": "Vanessa Ward",
    //    "company": "iOptystix",
    //    //"phone": "868-523-20884",
    //    "email": "vanessa@ioptystix.com",
    //    "city": "Chandler"
    //},
    //{
    //    "id": 4,
    //    "isActive": true,
    //    "name": "Alexandra Miers",
    //    "company": "Netseco",
    //    //"phone": "864-570-29626",
    //    "email": "alexandra@netseco.com",
    //    "city": "Charleston"
    //},
    //{
    //    "id": 5,
    //    "isActive": false,
    //    "name": "Mya Nelson",
    //    "company": "Titanirola",
    //    //"phone": "855-418-33856",
    //    "email": "mya@titanirola.com",
    //    "city": "Chesapeake"
    //},
    //{
    //    "id": 6,
    //    "isActive": true,
    //    "name": "Avery Goodman",
    //    "company": "Syssoft",
    //    //"phone": "812-464-20644",
    //    "email": "avery@syssoft.com",
    //    "city": "Boise"
    //},
    //{
    //    "id": 7,
    //    "isActive": true,
    //    "name": "Molly Oswald",
    //    "company": "Anaframe",
    //    //"phone": "870-561-25093",
    //    "email": "molly@anaframe.com",
    //    "city": "Buffalo"
    //},
    //{
    //    "id": 8,
    //    "isActive": false,
    //    "name": "Nevaeh Morrison",
    //    "company": "Turbomart",
    //    //"phone": "872-478-29154",
    //    "email": "nevaeh@turbomart.com",
    //    "city": "Austin"
    //},
    //{
    //    "id": 9,
    //    "isActive": false,
    //    "name": "Melanie Webster",
    //    "company": "Superscope",
    //    //"phone": "826-459-29370",
    //    "email": "melanie@superscope.com",
    //    "city": "FortLauderdale"
    //},
    //{
    //    "id": 10,
    //    "isActive": true,
    //    "name": "Allison Gill",
    //    "company": "Rapigrafix",
    //    //"phone": "874-444-27047",
    //    "email": "allison@rapigrafix.com",
    //    "city": "Burbank"
    //}];
    //};


});

