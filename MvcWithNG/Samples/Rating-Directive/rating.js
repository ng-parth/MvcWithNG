
//========================STEP 1===========================//
//angular.module('FundooDirectiveTutorial', [])
//  .directive('fundooRating', function () {
//      return {
//          restrict: 'A',
//          link: function (scope, elem, attrs) {
//              console.log("Recognized the fundoo-rating directive usage");
//          }
//      }
//  });

//========================STEP 2===========================//
//angular.module('FundooDirectiveTutorial', [])
//  .directive('fundooRating', function () {
//      return {
//          restrict: 'A',
//          template: '<ul class="rating">' +
//                      '<li ng-repeat="star in stars" class="filled">' +
//                        '\u2605' +
//                      '</li>' +
//                    '</ul>',
//          scope: {
//              ratingValue: '='
//          },
//          link: function (scope, elem, attrs) {
//              scope.stars = [];
//              for (var i = 0; i < scope.ratingValue; i++) {
//                  scope.stars.push({});
//              }
//          }
//      }
//  });

//========================STEP 3===========================//
//angular.module('FundooDirectiveTutorial', [])
//  .directive('fundooRating', function () {
//      return {
//          restrict: 'A',
//          template: '<ul class="rating">' +
//                      '<li ng-repeat="star in stars" ng-class="star">' +
//                        '\u2605' +
//                      '</li>' +
//                    '</ul>',
//          scope: {
//              ratingValue: '=',
//              max: '='
//          },
//          link: function (scope, elem, attrs) {
//              scope.stars = [];
//              for (var i = 0; i < scope.max; i++) {
//                  scope.stars.push({ filled: i < scope.ratingValue });
//              }
//          }
//      }
//  });

//========================STEP 4===========================//
//angular.module('FundooDirectiveTutorial', [])
//  .directive('fundooRating', function () {
//      return {
//          restrict: 'A',
//          template: '<ul class="rating">' +
//                      '<li ng-repeat="star in stars" ng-class="star">' +
//                        '\u2605' +
//                      '</li>' +
//                    '</ul>',
//          scope: {
//              ratingValue: '=',
//              max: '='
//          },
//          link: function (scope, elem, attrs) {

//              var updateStars = function () {
//                  scope.stars = [];
//                  for (var i = 0; i < scope.max; i++) {
//                      scope.stars.push({ filled: i < scope.ratingValue });
//                  }
//              };

//              scope.$watch('ratingValue', function (oldVal, newVal) {
//                  if (newVal) {
//                      updateStars();
//                  }
//              });
//          }
//      }
//  });

//========================STEP 5===========================//
//angular.module('FundooDirectiveTutorial', [])
//  .directive('fundooRating', function () {
//      return {
//          restrict: 'A',
//          template: '<ul class="rating">' +
//                      '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
//                        '\u2605' +
//                      '</li>' +
//                    '</ul>',
//          scope: {
//              ratingValue: '=',
//              max: '='
//          },
//          link: function (scope, elem, attrs) {

//              var updateStars = function () {
//                  scope.stars = [];
//                  for (var i = 0; i < scope.max; i++) {
//                      scope.stars.push({ filled: i < scope.ratingValue });
//                  }
//              };

//              scope.toggle = function (index) {
//                  scope.ratingValue = index + 1;
//              };

//              scope.$watch('ratingValue', function (oldVal, newVal) {
//                  if (newVal) {
//                      updateStars();
//                  }
//              });
//          }
//      }
//  });

//========================STEP 6===========================//
//angular.module('FundooDirectiveTutorial', [])
//  .directive('fundooRating', function () {
//      return {
//          restrict: 'A',
//          template: '<ul class="rating">' +
//                      '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
//                        '\u2605' +
//                      '</li>' +
//                    '</ul>',
//          scope: {
//              ratingValue: '=',
//              max: '=',
//              readonly: '@'
//          },
//          link: function (scope, elem, attrs) {

//              var updateStars = function () {
//                  scope.stars = [];
//                  for (var i = 0; i < scope.max; i++) {
//                      scope.stars.push({ filled: i < scope.ratingValue });
//                  }
//              };

//              scope.toggle = function (index) {
//                  if (scope.readonly && scope.readonly === 'true') {
//                      return;
//                  }
//                  scope.ratingValue = index + 1;
//              };

//              scope.$watch('ratingValue', function (oldVal, newVal) {
//                  if (newVal) {
//                      updateStars();
//                  }
//              });
//          }
//      }
//  });

//========================STEP 7===========================//
angular.module('FundooDirectiveTutorial', [])
  .controller('FundooCtrl', function ($scope, $window, $compile) {


      //if (top.location != location) {
      //    top.location.href = document.location.href;
      //}
      //$(function () 
      //{
      //    //window.prettyPrint && prettyPrint();
      //    //$('#dp1').datepicker({
      //    //    format: 'mm-dd-yyyy'
      //    //});
      //    //$('#dp2').datepicker();
      //    //$('#dp3').datepicker();
      //    //$('#dp3').datepicker();
      //    //$('#dpYears').datepicker();
      //    //$('#dpMonths').datepicker();


      //    var startDate = new Date(2012, 1, 20);
      //    var endDate = new Date(2012, 1, 25);
      //    $('#dp4').datepicker()
      //        .on('changeDate', function (ev) {
      //            if (ev.date.valueOf() > endDate.valueOf()) {
      //                $('#alert').show().find('strong').text('The start date can not be greater then the end date');
      //            } else {
      //                $('#alert').hide();
      //                startDate = new Date(ev.date);
      //                $('#startDate').text($('#dp4').data('date'));
      //            }
      //            $('#dp4').datepicker('hide');
      //        });
      //    $('#dp5').datepicker()
      //        .on('changeDate', function (ev) {
      //            if (ev.date.valueOf() < startDate.valueOf()) {
      //                $('#alert').show().find('strong').text('The end date can not be less then the start date');
      //            } else {
      //                $('#alert').hide();
      //                endDate = new Date(ev.date);
      //                $('#endDate').text($('#dp5').data('date'));
      //            }
      //            $('#dp5').datepicker('hide');
      //        });

      //    // disabling dates
      //    var nowTemp = new Date();
      //    var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

      //    var checkin = $('#dpd1').datepicker({
      //        onRender: function (date) {
      //            return date.valueOf() < now.valueOf() ? 'disabled' : '';
      //        }
      //    }).on('changeDate', function (ev) {
      //        if (ev.date.valueOf() > checkout.date.valueOf()) {
      //            var newDate = new Date(ev.date)
      //            newDate.setDate(newDate.getDate() + 1);
      //            checkout.setValue(newDate);
      //        }
      //        checkin.hide();
      //        $('#dpd2')[0].focus();
      //    }).data('datepicker');
      //    var checkout = $('#dpd2').datepicker({
      //        onRender: function (date) {
      //            return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
      //        }
      //    }).on('changeDate', function (ev) {
      //        checkout.hide();
      //    }).data('datepicker');
      //});

      $scope.today = new Date();
      $scope.now = 'friday';
      //$scope.today = moment("12-25-2013", "MM-DD-YYYY");
      $scope.addNewDropdown = function () {
          var text = '';
          text += '<select ng-model="cModel" ><option ng-repeat="dropDown in dropDowns" value={{dropDown.id}}>{{dropDown.text}}</option> </select>'
          $('#test').append($compile(text)($scope));
          //$('#test').replaceWith($compile(text)($scope));
      };


      $scope.ddl = [2, 3];
      $scope.dropDowns = [{ id: 1, text: 'One World' }, { id: 2, text: 'Two Eyes' }, { id: 3, text: 'ThreeD Effect' }, { id: 4, text: 'Four Wheel Drive' }];
      $scope.rating = 5;
      $scope.alertPop = function (rating) {
          $window.alert('Rating selected - ' + rating);
      };
      $scope.placeHolderText = "Hi Texty";
      $scope.getText = function (text) {
          alert(text);
      };
      $scope.changeEvent = function () {
          debugger;

      };
      $scope.init = function () {
          $scope.dropDowns = [{ id: 1, text: 'One World' }, { id: 2, text: 'Two Eyes' }, { id: 3, text: 'ThreeD Effect' }, { id: 4, text: 'Four Wheel Drive' }];
      };


      $scope.getWeekDetail = function (date) {
          $.post('/api/bookme/date', date + ' ', function (response) {
              debugger;
              alert(response);
              $scope.$apply();
          });
      };

  })



  .directive('fundooRating', function () {
      return {
          restrict: 'A',
          template: '<ul class="rating">' +
                      '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
                        '\u2605' +
                      '</li>' +
                    '</ul>',
          scope: {
              ratingValue: '=',
              max: '=',
              readonly: '@',
              onRatingSelected: '&'
          },
          link: function (scope, elem, attrs) {
              var updateStars = function () {
                  scope.stars = [];
                  for (var i = 0; i < scope.max; i++) {
                      scope.stars.push({ filled: i < scope.ratingValue });
                  }
              };

              scope.toggle = function (index) {
                  if (scope.readonly && scope.readonly === 'true') {
                      return;
                  }
                  scope.ratingValue = index + 1;
                  scope.onRatingSelected({ rating: index + 1 });
              };

              scope.$watch('ratingValue', function (oldVal, newVal) {
                  if (newVal) {
                      updateStars();
                  }
              });
          }
      }
  })


.directive('pTextBox', function () {
    return {
        restrict: 'E',
        template: '<input type="text" ng-model="out" class={{pclass}} placeholder={{pHText}} />',
        scope: {
            out: '=obj',
            pclass: '@',
            //bgText: '@'
            bgText: '='
        },
        link: function (scope, elem, attrs) {
            scope.pHText = scope.bgText;
        }
    }
})

.directive('myRequired', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        //controller: function () { },
        link: function (scope, elem, attrs, ctrl) {

            $(elem).removeClass('valid');
            $(elem).addClass('invalid');

            scope.$watch(attrs.ngModel, function (viewValue) {
                if (attrs.type == 'text') {
                    if (viewValue != 'Parth!') {
                        $(elem).removeClass('valid');
                        $(elem).addClass('invalid');
                        ctrl.$setValidity(attrs.ngModel, false);
                    }
                    else {
                        $(elem).removeClass('invalid');
                        $(elem).addClass('valid');
                        ctrl.$setValidity(attrs.ngModel, true);
                    }
                }
                else {
                    $(elem).removeClass('valid');
                    $(elem).removeClass('invalid');
                }

            })
        }
    }
})
.directive('myDropdown', function () {
    return {
        restrict: 'E',
        require: 'ngModel',
        //controller: function () { },
        link: function (scope, elem, attrs, ctrl) {

            $(elem).removeClass('valid');
            $(elem).addClass('invalid');

            scope.$watch(attrs.ngModel, function (viewValue) {
                if (attrs.type == 'text') {
                    if (viewValue != 'Parth!') {
                        $(elem).removeClass('valid');
                        $(elem).addClass('invalid');
                        ctrl.$setValidity(attrs.ngModel, false);
                    }
                    else {
                        $(elem).removeClass('invalid');
                        $(elem).addClass('valid');
                        ctrl.$setValidity(attrs.ngModel, true);
                    }
                }
                else {
                    $(elem).removeClass('valid');
                    $(elem).removeClass('invalid');
                }

            })
        }
    }
})

.directive('rxNewDate', function ($parse) {
    return {
        restrict: 'A',
        require: "ngModel",
        link: function (scope, elm, attrs, ngModel) {
            $(elm).attr('placeholder', 'Hello world');

            scope.rxModel = 'Hello World';
            $(elm).datepicker({
                format: 'mm-dd-yyyy'
            }).on('changeDate', function (ev) {
                parsed = $parse(attrs.ngModel);
                moment = window.moment;
                var dt = moment(ev.date.valueOf());
                var dts = dt.format('MM-DD-YYYY');
                //var a = moment(dts, ["DD/MM/YYYY"]);
                //ngModel.$modeValue = dts;
                $(elm).datepicker('hide');
                scope.$apply(function () {
                    parsed.assign(scope, dts);
                    if (!angular.isUndefined(attrs.setRxgrid)) {
                        scope.$eval(attrs.ngChange);
                    }
                });
            }).on('click', function () {
                $(elm).datepicker('show');
            }).css("z-index", 3335);
        },
        transclude: false,
        template: '<div class="input-append" ng-transclude> <input class="span2" id="appendedInputButton" ng-model="' + scope.rxmodel + '" type="text"> <button class="btn" type="button"><i class="icon-calendar"></i></button>        </div>'
    };
})

//.directive('rxDate', function ($parse) {
//    return {
//        restrict: 'A',
//        require: "ngModel",
//        link: function (scope, elm, attrs, ngModel) {
//            $(elm).datepicker({
//                format: 'dd-mm-yyyy'
//            }).on('changeDate', function (ev) {
//                parsed = $parse(attrs.ngModel);
//                moment = window.moment;
//                var dt = moment(ev.date.valueOf());
//                var dts = dt.format('L');
//                var a = moment(dts, ["DD/MM/YYYY"]);
//                //ngModel.$modeValue = dts;
//                $(elm).datepicker('hide');
//                scope.$apply(function () {
//                    parsed.assign(scope, dts);
//                    if (!angular.isUndefined(attrs.setRxgrid)) {
//                        scope.$eval(attrs.ngChange);
//                    }
//                });
//            }).on('click', function () {
//                $(elm).datepicker('show');
//            }).css("z-index", 3335);
//        }
//    };
//})

.directive('rxDate', function ($parse) {
    return {
        restrict: 'A',
        require: "ngModel",
        link: function (scope, elm, attrs, ngModel) {

            var RenderDate = function (date) {
                var nowTemp = new Date();
                var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

                if (!angular.isUndefined(scope[attrs.endEnable]) && moment(scope[attrs.endEnable]).isValid())
                    now = scope[attrs.endEnable];
                return date.valueOf() > now.valueOf() ? 'disabled' : '';
            };



            //======================================Start Enable======================================//
            if (!angular.isUndefined(attrs.startEnable))
                $(elm).datepicker({
                    onRender: //RenderDate(date)
                        function (date) {
                            var nowTemp = new Date();
                            var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

                            if (!angular.isUndefined(scope[attrs.startEnable]) && moment(scope[attrs.startEnable]).isValid())
                                now = scope[attrs.startEnable];
                            return date.valueOf() < now.valueOf() ? 'disabled' : '';
                        }
                });
            //======================================Start Enable======================================//

            //======================================End Enable======================================//
            if (!angular.isUndefined(attrs.endEnable))
                $(elm).datepicker({
                    onRender: function (date) {
                        var nowTemp = new Date();
                        var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

                        if (!angular.isUndefined(scope[attrs.endEnable]) && moment(scope[attrs.endEnable]).isValid())
                            now = scope[attrs.endEnable];
                        return date.valueOf() > now.valueOf() ? 'disabled' : '';
                    }
                });
            //======================================End Enable======================================//
            $(elm).datepicker({
                format: 'dd-mm-yyyy',
                minViewMode: 1,
                viewMode: 1
                //format : 'dd/MMM/yyyy'
            }).on('changeDate', function (ev) {
                parsed = $parse(attrs.ngModel);
                moment = window.moment;
                var dt = moment(ev.date.valueOf());
                var dts = dt.format('DD-MMM-YYYY');
                //var a = moment(dts, ["DD/MM/YYYY"]);
                $(elm).datepicker('hide');
                scope.$apply(function () {
                    parsed.assign(scope, dts);
                    if (!angular.isUndefined(attrs.setRxgrid)) {
                        scope.$eval(attrs.ngChange);
                    }
                });
            }).on('click', function () {
                $(elm).datepicker('show');
            }).css("z-index", 3335)
            ;

            //scope.$watch(attrs.today, function (value) {
            //    debugger;
            //}, true);

            scope.$watch(attrs.endEnable, function (value) {
                //debugger;
                $(elm).datepicker({
                    onRender: function (date) {
                        var nowTemp = new Date();
                        var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
                        if (!angular.isUndefined(scope[attrs.endEnable]) && moment(scope[attrs.endEnable]).isValid())
                            now = scope[attrs.endEnable];
                        return date.valueOf() > now.valueOf() ? 'disabled' : '';
                    }
                });
            }, true);
        }
    };
})

.directive('pDropdown', function () {
    return {
        restrict: 'E',
        template: '<select ng-model="model" class="pValid"> <option ng-repeat=" item in items" ng-change="changeMe(item)" value={{item.id}}>{{item.text}} </option> </select>',
        scope: {
            obj: '=',
            onSelection: '&',
            model: '=output'
            //textField: '@',
            //valueField:'@'
        },
        link: function (scope, elem, attrs) {
            var head = [{ id: -1, text: "--Select--" }];
            scope.items = head;
            //scope.obj.push(head);
            //scope.items = scope.obj;
            for (var i = 0; i < scope.obj.length; i++)
                scope.items.push(scope.obj[i]);
            scope.changeMe = function (item) {
            };
        }
    }
})
.directive('myDropdown', function () {
    return {
        restrict: 'E',
        require: 'ngModel',
        //controller: function () { },
        scope: {
            rxText: '=',
            rxValue: '=',
            rxSource: '=',
            rxSelected: '=',
            rxFilter: '=',
            rxDisabled: '='
        },
        link: function (scope, elem, attrs, ctrl) {
            var HtmlTemplate = '';
            
            //$(elem).removeClass('valid');
            //$(elem).addClass('invalid');

            //scope.$watch(attrs.ngModel, function (viewValue) {
            //    if (attrs.type == 'text') {
            //        if (viewValue != 'Parth!') {
            //            $(elem).removeClass('valid');
            //            $(elem).addClass('invalid');
            //            ctrl.$setValidity(attrs.ngModel, false);
            //        }
            //        else {
            //            $(elem).removeClass('invalid');
            //            $(elem).addClass('valid');
            //            ctrl.$setValidity(attrs.ngModel, true);
            //        }
            //    }
            //    else {
            //        $(elem).removeClass('valid');
            //        $(elem).removeClass('invalid');
            //    }

            //})
        }
    }
})