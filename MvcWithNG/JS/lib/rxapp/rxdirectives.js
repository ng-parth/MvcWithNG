
rx.directive('rxFadein', function () {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs) {
            var duration = parseInt(attrs.rxfadein);
            if (isNaN(duration)) {
                duration = 500;
            }
            elm = jQuery(elm);
            elm.hide();
            elm.fadeIn(duration)

            scope.destroy = function (complete) {
                elm.fadeOut(duration, function () {
                    if (complete) {
                        complete.apply(scope);
                    }
                });
            };
        }
    };
});

rx.directive('rxTooltip', function () {
    'use strict';
    return {
        restrict: 'C',
        require: 'ngModel',
        link: function (scope, element, attrs) {
            if (!angular.isUndefined(attrs.rxTiptext)) {
                $(element).tooltip({
                    title: attrs.rxTiptext,
                    html: true,
                    trigger: attrs.rxTipevent,
                    placement: attrs.rxTipposition,
                    delay: { show: 200, hide: 0 }
                });
            }
            if (!angular.isUndefined(attrs.rxMessageScope)) {
                scope.$watch(attrs.rxMessageScope, function (viewValue) {
                    if (!angular.isUndefined(viewValue)) {
                       var viewTip = viewValue;
                       $(element).tooltip('destroy')
                       var t = setTimeout(function () {
                           $(element).tooltip({
                               title: viewTip,
                               html: true,
                               trigger: attrs.rxTipevent,
                               placement: !angular.isUndefined(attrs.rxTipposition) ? attrs.rxTipposition : 'right',
                               delay: { show: 200, hide: 0 }
                           });
                       }, 500);
                    }
                }, true);
            }
        }
    };

});

rx.directive('rxAdvancetab', function (appconfig) {
    return {
        restrict: 'A',
        scope: {
            'advancetabObj': '=',
            'activeTab': '=',
            'cssConfig': '=',
            'rxTabevent': '=',
            'changedData':'='
        },
        controller: function ($scope, $element) {

            var panes = $scope.panes = [];
            var i = 0;

            $scope.rxtemptabs = {};
            angular.forEach($scope.advancetabObj, function (pane) {
                if (angular.isUndefined(pane.icon)) {
                    pane.icon = '';

                }
                else {
                    pane.title = " " + pane.title + " ";
                }
                if (i == $scope.activeTab) {
                    pane.selected = true;
                    $scope.rxtemptabs = pane;
                }
                else {
                    pane.selected = false;
                }
                pane.index = i;
                if (angular.isUndefined(pane.iconTitle)) {
                    pane.iconTitle = "";
                }
                $scope.panes.push(pane);
                i++;
            });
            $scope.select = function (pane) {
                angular.forEach(panes, function (pane) {
                    pane.selected = false;
                });
                pane.selected = true;
                $scope.rxtemptabs = pane;
                if (!(angular.isUndefined($scope.rxTabevent))) {
                    var a = $scope.attrs.rxTabevent + "(" + pane.index + ")";
                    $scope.$parent.$eval(a);
                }
            }

            this.addcls = function (clsname, attr) {
                $scope.clsname = clsname;
                $scope.attrs = attr;

            }
            var inc = 0;
            this.activetabchanged = function (v) {
                $scope.panes[v].selected = true;
                $scope.rxtemptabs = $scope.panes[v];

            }

            this.dataChanged = function () {
                panes = $scope.panes = [];
                angular.forEach($scope.advancetabObj, function (pane) {
                    if (angular.isUndefined(pane.icon)) {
                        pane.icon = '';

                    }
                    else {
                        pane.title = " " + pane.title + " ";
                    }
                    if (i == $scope.activeTab) {
                        pane.selected = true;
                        $scope.rxtemptabs = pane;
                    }
                    else {
                        pane.selected = false;
                    }
                    pane.index = i;
                    if (angular.isUndefined(pane.iconTitle)) {
                        pane.iconTitle = "";
                    }
                    $scope.panes.push(pane);
                    i++;
                });
            }
        },
        link: function (scope, element, attrs, tabsCtrl) {
            switch (attrs.rxAdvancetab) {
                case "left":
                    element.addClass("tabs-left");
                    tabsCtrl.addcls("nav-tabs", attrs);
                    break;
                case "right":
                    element.addClass("tabs-right");
                    tabsCtrl.addcls("nav-tabs", attrs);
                    break;
                case "stacked":
                    tabsCtrl.addcls("nav-tabs nav-stacked", attrs);
                    break;
                case "pils":
                    tabsCtrl.addcls("nav-pills", attrs);
                    break;
                case "stackedpils":
                    tabsCtrl.addcls("nav-pills nav-stacked", attrs);
                    break;
                case "top":
                    tabsCtrl.addcls("nav-tabs", attrs);
                    break;
            }
            function changedactivetab(v) {
                if (!angular.isUndefined(v)) {
                    tabsCtrl.activetabchanged(v)
                }
            }
            scope.$watch("activeTab", changedactivetab, true)
            scope.$watch("changedData", function (v) {
                if (!angular.isUndefined(v)) {
                    if (v) {
                        tabsCtrl.dataChanged();
                    }
                }
            }, true)

        },
        template:
          '<div class="tabbable {{cssConfig.headerclass}}" >' +
            '<ul class="nav {{clsname}}">' +
              '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">' +
                '<a href="" ng-click="select(pane)"><i class="{{pane.icon}}" title="{{pane.iconTitle}}"></i>{{pane.title}}</a>' +
              '</li>' +
            '</ul>' +
            '<div class="{{cssConfig.contentclass}}/>' +
            '<div class="tab-content" >' +
          '<div class="tab-pane active"  >' +
          '<div ng-include src="rxtemptabs.url"></div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>',
        replace: true
    };
});

rx.directive('rxCustomizetab', function (appconfig) {
    return {
        restrict: 'A',
        scope: {
            'advancetabObj': '=',
            'activeTab': '=',
            'cssConfig': '='
        },
        controller: function ($scope, $element) {
            var panes = $scope.panes = [];
            var i = 0;
            $scope.rxtemptabs = {};
            angular.forEach($scope.advancetabObj, function (pane) {
                if (angular.isUndefined(pane.cssclass)) {
                    pane.cssclass = '';

                }
                else {
                    pane.title = " " + pane.title + " ";
                }
                if (i == $scope.activeTab) {
                    pane.selected = true;
                    $scope.rxtemptabs = pane;
                }
                else {
                    pane.selected = false;
                }
                if (angular.isUndefined(pane.iconTitle)) {
                    pane.iconTitle = "";
                }
                $scope.panes.push(pane);
                i++;
            });

            $scope.select = function (pane) {
                angular.forEach(panes, function (pane) {
                    pane.selected = false;
                });
                pane.selected = true;
                $scope.rxtemptabs = pane;
            }

            this.addcls = function (clsname) {
                $scope.clsname = clsname;

            }
            this.activetabchanged = function (v) {
                $scope.panes[v].selected = true;
                $scope.rxtemptabs = $scope.panes[v];

            }
        },
        link: function (scope, element, attrs, tabsCtrl) {
            function changedactivetab(v) {
                if (!angular.isUndefined(v)) {
                    tabsCtrl.activetabchanged(v)
                }
            }
            scope.$watch("activeTab", changedactivetab, true)
        },
        template:
          '<div class="{{cssConfig.headerclass}}" >' +
            '<ul class="{{cssConfig.ulclass}}">' +
              '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">' +
                '<a href="" ng-click="select(pane)"><div class="helper-font-16 input-icon-prepend"><i class="{{pane.cssclass}}" title="{{pane.iconTitle}}"></i></div>{{pane.title}}</a>' +
              '</li>' +
            '</ul>' +
            '<div class="{{cssConfig.contentclass}}"/>' +
            '<div class="tab-content" >' +
          '<div class="tab-pane active"  >' +
          '<div ng-include src="rxtemptabs.url"></div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>',
        replace: true
    };
});

rx.directive('rxMultiGrid', function ($compile, cookieconfig, rxGridService) {
    return {
        restrict: 'E',
        scope: {
            'gridObj': '=',
            'gridCols': '=',
            'gridOptions': '='
        },
        controller: function ($scope, $element) {
            $scope.ths = [];
            $scope.pagefilterresults = '';
            $scope.resultfilterresults = '';
            $scope.predicate = '';
            $scope.reverse = false;
            $scope.currentPage = 0;
            $scope.pageSize = 10;
            var rxgs = $scope.rxgs = [];
            var arrcols = [];
            $scope.filteredrxgs = [];
            $scope.rxgsettings = [];
            var hideclass = '';
            $scope.popups = [];
            var ss = 0;

            $scope.changeSorting = function (theading) {
                checkcols = theading.dbcolname;
                if (!$scope.getdisablesortcols()) {
                    if (theading.sort == "a") {
                        theading.sort = "" + $scope.reverse + "";
                        $scope.predicate = theading.dbcolname;
                        $scope.reverse = false;
                        theading.sortingclass = "sorting_asc";
                    }
                    else if (theading.sort == "false") {
                        $scope.predicate = theading.dbcolname;
                        $scope.reverse = !$scope.reverse;
                        theading.sortingclass = "sorting_desc";
                        theading.sort = "" + $scope.reverse + "";

                    }
                    else {
                        $scope.predicate = theading.dbcolname;
                        $scope.reverse = false;
                        theading.sortingclass = "sorting_asc";
                        theading.sort = "" + $scope.reverse + "";

                    }

                }

            };

            var updateObj = 0;
            $scope.editicon = "icofont-pencil helper-font-24";
            $scope.editEvent = function (rxg) {
                if (rxg.editing) {
                    updateObj = 2;
                    rxg.editing = false;
                    rxg.editicon = "icofont-pencil helper-font-24";
                    rxGridService.BroadCastEvent("save", rxg, $scope.rxgs, '');
                    $scope.$parent.$eval($scope.gridObj.crud.edit.eventname + "()");
                }
                else {
                    updateObj = 1;
                    rxg.editing = true;
                    rxg.editicon = "icofont-save helper-font-24";
                }
            }
            $scope.deleteEvent = function (rxg) {
                rxg.editing = false;
                rxg.editicon = "icofont-pencil helper-font-24";
                rxGridService.BroadCastEvent("delete", rxg, $scope.rxgs, '');
                $scope.$parent.$eval($scope.gridObj.crud.del.eventname + "()");
            }
            var addobj = 0;
            var even = "";

            $scope.addEvent = function () {
                addobj = 1;
                even = "add";
                //rxGridService.BroadCastEvent("add", $scope.filteredrxgs, $scope.rxgs, $scope.gridOptions.gridName + "Operations");
            }
            $scope.thsmaintitle = [];
            $scope.thssubtitle = [];
            var jstring = '';
            var jsubstring = '';
            var rxgstring = '';
            var td = '';
            $scope.getgridcols = function () {
                if (addobj == 1) {
                    td = '';
                    $scope.rxg = [];

                    $scope.thsmaintitle = [];
                    $scope.thssubtitle = [];
                    $scope.rxgs = [];
                    $scope.popups = [];
                    //addobj = 0;
                }
                $scope.rxgsettings.tablecssClass = (!angular.isUndefined($scope.gridObj.tablecssClass)) ? $scope.gridObj.tablecssClass[0] : "";
                $scope.rxgsettings.tableheadingcssClass = (!angular.isUndefined($scope.gridObj.tableheadingcssClass)) ? $scope.gridObj.tableheadingcssClass[0] : "";
                var lengthcount = $scope.gridObj.colobjects.length;
                var colindex = 0;

                for (var aa = 0; aa < $scope.gridObj.colobjects.length; aa++) {
                    jstring = '{';
                    jstring += '"colspan" : "' + $scope.gridObj.colobjects[aa].colsubheading.length + '", "coltitle" : "' + $scope.gridObj.colobjects[aa].colmainheading[0] + '"}';
                    $scope.thsmaintitle.push(JSON.parse(jstring));

                    for (var bb = 0; bb < $scope.gridObj.colobjects[aa].colsubheading.length; bb++) {
                        var sortvalue = true;
                        jsubstring = '{';
                        jsubstring += '"name" : "' + $scope.gridObj.colobjects[aa].colsubheading[bb].coltitle + '", "sortingclass" : "' + $scope.getdisablesortcols($scope.gridObj.colobjects[aa].colsubheading[bb].dbcol) + '", "dbcolname":"' + $scope.gridObj.colobjects[aa].colsubheading[bb].dbcol + '", "sort":"' + sortvalue + '", "colwidth":"' + $scope.gridObj.colobjects[aa].columwidth[bb] + '"}';
                        td += '<td><span ng-hide="rxg.editing" >{{rxg.' + $scope.gridObj.colobjects[aa].colsubheading[bb].dbcol + '}}</span><input type="text" ng-model="rxg.' + $scope.gridObj.colobjects[aa].colsubheading[bb].dbcol + '" ng-show="rxg.editing"  class="span5"></td>'
                        $scope.thssubtitle.push(JSON.parse(jsubstring));
                    }
                    var cols = [];
                    for (var dd = 0; dd < lengthcount; dd++) {
                        for (var col in $scope.gridObj.colobjects[dd].jdata[0]) {
                            cols.push(col);
                        }
                    }
                }
                for (var cc = 0; cc < $scope.gridObj.colobjects[0].jdata.length; cc++) {
                    var colscheck = 0;
                    rxgstring = '{';
                    for (var dd = 0; dd < lengthcount; dd++) {
                        for (var ee = 0; ee < cols.length; ee++) {
                            if (!angular.isUndefined($scope.gridObj.colobjects[dd].jdata[cc][cols[ee]])) {
                                var colname = cols[ee];
                                var colvalue = $scope.gridObj.colobjects[dd].jdata[cc][cols[ee]];
                                if (colscheck == 0) {
                                    rxgstring += '"' + colname + '" : "' + colvalue + '"';
                                    colscheck = 1;
                                } else {
                                    rxgstring += ',"' + colname + '" : "' + colvalue + '"';
                                }
                            }
                        }
                    }
                    rxgstring += ',"editing":false,"editicon":"icofont-pencil helper-font-24"}';
                    $scope.rxgs.push(JSON.parse(rxgstring));
                }
                $scope.filteredrxgs = $scope.rxgs;
                td += '<td class="rx_rowAlignCentre">' +
                    '<a data-toggle="modal" ng-click="editEvent(rxg)"><span><i title="Edit" class="{{rxg.editicon}}"></i></span></a>' +
                    '<a data-toggle="modal" href="#Delete" ng-click="deleteEvent(rxg)"><span><i title="Delete" class=" typicn-delete helper-font-24"></i></span></a>' +
                    '</td>';

                if (!(angular.isUndefined($scope.gridObj.button))) {
                    $scope.popups.push({ title: $scope.gridObj.button.title.replace(" ", "_"), url: $scope.gridObj.button.tmplpath, tmplCss: (!angular.isUndefined($scope.gridObj.button.tmplCss)) ? $scope.gridObj.button.tmplCss : '' });
                }
            };

            $scope.getdisablesortcols = function (checkcols) {
                if (angular.isUndefined($scope.gridObj.disablesorting)) {
                    return "sorting";
                }
                else {
                    for (var i = 0; i < $scope.gridObj.disablesorting.length; i++) {
                        if (checkcols == $scope.gridObj.disablesorting[i]) {
                            checkcols = '';
                            return "";

                        }
                    }
                    return "sorting";
                }
            }
            $scope.chkrw = function (rx) {
            }
            $scope.bindTemplate = function () {
                var template = '<div   >' +
                    '<div class="row-fluid show-grid">' +
                    '<div class="span12 "><a href="#AddSample" ng-click="addEvent()" role="button" data-toggle="modal" class="btn btn-danger pull-right">Add Sample</a><br/><br/></div>' +
                    '</div>' +
                    '<div class="row-fluid show-grid">' +
                '<div class="span6">' +

                '</div>' +
                '<div class="span6 ">' +
                '<div class="dataTables_filter"><label>Search: <input  type="text" ng-model="search"></label></div>' +
                '</div>' +
                '</div>' +
                    '<table class="table {{rxgsettings.tablecssClass}} "  >' +
                    '<thead class="{{rxgsettings.tableheadingcssClass}}">' +
                    '<tr>' +
                    '<th ng-repeat="thm in thsmaintitle" colspan="{{thm.colspan}}">' +
                    '<span class="offset4">{{thm.coltitle}}</span>' +
                    '</th>' +
                    '<th rowspan="2" style="width:125px;" class="rx_rowAlignCentre ">' +
                    'Actions' +
                    '</th>' +
                    '</tr>' +
                    '<tr >' +
                    '<th ng-repeat="thele in thssubtitle" ng-click="changeSorting(thele)" class="{{thele.sortingclass}} {{rxgsettings.tableheadingcssClass}} " style="width:{{thele.colwidth}}px; display:normal !important;">{{thele.name}}</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>' +
                '<tr class="{{rowclass}}" ng-repeat="rxg in (filteredrxgs = (rxgs | filter:search )) | orderBy:predicate:reverse | startFrom:currentPage*pageSize | limitTo:pageSize ">' +

                td +
                '<span ></span>' +
                '</tr>' +
                '</tbody>' +
                '</table>' +
                '<div ng-repeat="pop in popups" id="AddSample" class="modal hide fade {{pop.tmplCss}}" tabindex="-1" role="dialog" aria-labelledby="{{pop.title}}Label" aria-hidden="true">' +
                   '<div ng-include src="pop.url"></div>' +
                   '</div>' +
                '</div>';
                if (addobj == 0) {
                    addobj = 1;
                    $element.replaceWith($compile(template)($scope));
                }
            }
            var updategrid = function (newlist) {
                if (!angular.isUndefined(newlist)) {
                    if (updateObj == 0) {
                        $scope.getgridcols();
                        $scope.bindTemplate();
                    }
                    else if (updateObj == 2) {
                        $scope.bindTemplate();
                        updateObj = 0;
                    }
                }
            };

            $scope.$watch('gridObj', updategrid, true);
        },
        link: function (scope, elm, attrs, gridctrl) {




        },
        replace: true
    };
})



rx.filter('startFrom', function () {
    return function (input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});
rx.filter('rxFilter', function () {
    return function (arrObj, value, key) {
        if (!angular.isUndefined(arrObj) && !angular.isUndefined(value) && !angular.isUndefined(key)) {

        }
        return input.slice(start);
    }
});
rx.directive('rxAuthorize', function (cookieconfig, $location, appconfig, encrydecry, request) {
    return {
        restrict: 'A',
        compile: function () {
            return {
                pre: function (scope, elm, attrs) {
                    $(elm).hide();
                    if (cookieconfig.get('lid') == null || cookieconfig.get('lid') == undefined) {
                        angular.noop();
                        $location.url(appconfig.urlKey.loginurl);
                    }
                    else if (!angular.isUndefined(attrs.rxAuthorize)) {
                        if (!angular.isUndefined(attrs.rxRoles)) {
                            var redirect = true;
                            var rolename = cookieconfig.get('rolename');
                            var roles = attrs.rxRoles.split(',');
                            for (var i = 0; i < roles.length; i++) {
                                if (rolename == roles[i].trim()) {
                                    $(elm).show();
                                    redirect = false;
                                    break;
                                }
                            }
                            if (redirect) {
                                $location.url(appconfig.urlKey.unauthorized);
                            }
                        }
                        else if (attrs.rxAuthorize == "dynamic") {
                            var redirect = true;
                            var a = encrydecry.decrypt(request.cookies('roleaccess').value);
                            var rolepage = a.split(',');
                            var cu = $location.absUrl();
                            var cuarr = cu.split("#/");
                            cuarr[0] = cuarr[1].split("/");
                            if (angular.isArray(cuarr[0])) {
                                cuarr[0] = cuarr[0][0];
                            }
                            if (!angular.isUndefined(rolepage.length)) {
                                for (var i = 0; i < rolepage.length; i++) {
                                    if (cuarr[0] == rolepage[i]) {
                                        $(elm).show();
                                        redirect = false;
                                        break;
                                    }
                                }
                            }
                            if (redirect) {
                                $location.url(appconfig.urlKey.unauthorized);
                            }
                        }
                        else if (attrs.rxAuthorize == "") {
                            $(elm).show();
                        }
                        else if (cookieconfig.get('rolename') != attrs.rxAuthorize) {
                            $location.url(appconfig.urlKey.unauthorized);
                        }
                        else {
                            if (!angular.isUndefined(attrs.rxAuthinit)) {
                                $(elm).show();
                                scope.$eval(attrs.rxAuthinit);
                            }
                        }
                    }
                    else {
                        if (!angular.isUndefined(attrs.rxAuthinit)) {
                            $(elm).show();
                            scope.$eval(attrs.rxAuthinit);
                        }
                    }
                    $(elm).show();
                }
            }
        }
    };
});
rx.directive('rxInit', function (cookieconfig, $location, appconfig) {
    return {
        restrict: 'A',
        compile: function () {
            return {
                pre: function (scope, elm, attrs) {
                    scope.$eval(attrs.rxInit);
                }
            }
        }
    };
});
rx.directive('rxDropdown', function ($compile,rxJson) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            rxText: '=',
            rxValue: '=',
            rxSource: '=',
            rxSelected: '=',
            rxFilter: '=',
            rxDisabled: '='
        },
        controller: function ($scope, $element) {
            var drpObj = $scope.drpObj = $scope.rxSource;
            var splittext = '';
            var splitvalue = '';
            var sel = ''; var splitselect = '';
            $scope.selects = '';
            $scope.search = {};
            var multiple = false;
            var incremental = 0;
            var groups = false;
            var rxChange = '';
            $scope.selectess = function (u) {
                if (!angular.isUndefined($scope.drpObj[u])) {
                    if (!angular.isUndefined($scope.rxFilter)) {
                        var rxjsonFind = rxJson.find($scope.drpObj, $scope.search);
                        u = rxjsonFind[u][splitvalue[1]];
                    } else {
                        u = $scope.drpObj[u][splitvalue[1]];
                    }


                    
                    $scope.rxValue = u;
                    $scope.arfilter(1);
                    if (rxChange != '') {
                        var drpJson = {};
                        drpJson["text"] = $scope.rxText;
                        drpJson["value"] = $scope.rxValue;
                        $scope.$parent["textDrpTitle"] = drpJson;
                        $scope.$parent.$eval(rxChange + "(textDrpTitle)");
                    }
                } else {
                    $scope[splitvalue[1] + 's'] = undefined;
                }
                
            }
            this.bind = function (attr, obj) {
                drpObj = $scope.drpObj = $scope.rxSource;
                $scope.fun(attr);
                $scope.setFunction();
            }
            this.selectedup = function (attr, a) {
                if (splitvalue[1] != "oLanguageId") {
                    $scope[splitvalue[1] + 's'] = a;
                    $scope.selects = a;
                    $("#" + splitvalue[1]).select2("val", a);
                    splitselect = attr.rxSelected.split('.');
                    $scope.arfilter(0);
                }
                if (rxChange != '') {
                    var drpJson = {};
                    drpJson["text"] = $scope.rxText;
                    drpJson["value"] = $scope.rxValue;
                    $scope.$parent["textDrpTitle"] = drpJson;
                    $scope.$parent.$eval(rxChange + "(textDrpTitle)");
                }

            }
            var firstTimeSelected = true;
            this.filbind = function (attr) {
                splitselect = attr.rxFilter.split('.');
                if (!angular.isUndefined(attr.rxInit)) {
                    $scope.search[splitselect[1]] = parseInt($scope.rxFilter);
                } else {
                    $scope.search[splitselect[1]] = $scope.rxFilter;
                }
                if (firstTimeSelected) {
                    firstTimeSelected = false;
                    if (!angular.isUndefined(attr.rxSelected)) {
                        splitselect = attr.rxSelected.split('.');
                        $("#" + splitvalue[1]).select2("val", $scope.selects);
                        $scope.arfilter(0);
                    } else {
                        $("#" + splitvalue[1]).select2("val", '');
                    }
                } else {
                    $scope[splitvalue[1] + 's'] = '';
                    $("#" + splitvalue[1]).select2("val", '');
                }
                
            }
            $scope.dis = false;
            this.disables = function (va, attrs) {
                $scope.dis = va;
                $scope.fun(attrs);
            }
            $scope.setFunction = function () {
                $scope.rxSource.resetDropdown = function (_source) {
                    $scope[splitvalue[1] + 's'] = '';
                    $scope.drpObj = $scope.rxSource = _source;
                    $scope.setFunction();
                    $("#" + splitvalue[1]).select2("destroy");
                    var t = setTimeout(function () {
                        $("#" + splitvalue[1]).select2();
                    }, 500);


                }
                $scope.rxSource.resetSelectedDropdown = function (_source, selected) {
                    $scope.selects = $scope.rxSelected = selected;
                    $scope.drpObj = $scope.rxSource = _source;
                    $scope.setFunction();
                    $("#" + splitvalue[1]).select2("destroy");
                    var t = setTimeout(function () {
                        $("#" + splitvalue[1]).select2().val(selected);
                    }, 500);
                }
            }
            $scope.fun = function (attr) {

                splittext = attr.rxText.split('.');
                splitvalue = attr.rxValue.split('.');
                rxChange = (!angular.isUndefined(attr.rxChange)) ? attr.rxChange : '';
                var sel = '';
                var fil = '';
                var req = !angular.isUndefined(attr.required) ? "rx-required" : '';
                var multipleString = !angular.isUndefined(attr.multiple) ? "multiple" : '';
                //if (!angular.isUndefined(attr.rxDisabled)) {
                //    dis = $scope.rxDisabled;
                //}
                if (!angular.isUndefined(attr.rxSelected)) {
                    splitselect = attr.rxSelected.split('.');
                    $scope.selects = $scope.rxSelected;
                    if (multipleString == '') {
                        sel = (!angular.isUndefined(attr.rxSelected)) ? 'ng-selected="' + splittext[0] + 's.' + splitselect[1] + ' == selects"' : '';
                    }
                }
                if (!angular.isUndefined(attr.rxFilter)) {
                    splitselect = attr.rxFilter.split('.');
                    $scope.search[splitselect[1]] = $scope.rxFilter;
                    fil = "| rxDropdownfilter : search ";
                }
                var cssclass = '';
                if (!angular.isUndefined(attr.class)) {
                    cssclass = 'class="' + attr.class + '"';
                }

                $scope.arfilter(0);
                var tmpl = '';

                multiple = !angular.isUndefined(attr.multiple) ? true : false;
                if (!angular.isUndefined(attr.multiple)) {
                    $scope.rxText = [];
                    $scope.rxValue = [];
                };
                $scope[splitvalue[1] + 's'] = undefined;
                if (angular.isUndefined(attr.groupby)) {
                    tmpl = '<select id="' + splitvalue[1] + '" ' + cssclass + ' ng-model="' + splitvalue[1] + 's" ng-options="' + splittext[0] + 's.' + splitvalue[1] + ' as ' + splittext[0] + 's.' + splittext[1] + ' for ' + splittext[0] + 's in drpObj ' + fil + '"  ng-disabled={{dis}} ng-change="selectess(' + splitvalue[1] + 's)" ' + req + ' ' + multipleString + ' >' +
                        '<option value="" >Select...</option>' +
                    '</select><div ng-hide="true">{{' + splitvalue[1] + 's}}</div>';
                    //tmpl = '<select id="' + splitvalue[1] + '" ' + cssclass + ' ng-model="' + splitvalue[1] + 's" ng-disabled={{dis}} ng-change="selectess(' + splitvalue[1] + 's)" ' + req + ' ' + multipleString + ' >' +
                    //    '<option value="">Select...</option>' +
                    // '<option ng-repeat="' + splittext[0] + 's in drpObj ' + fil + '"' + sel + ' value="{{ ' + splittext[0] + 's.' + splitvalue[1] + '}}">{{' + splittext[0] + 's.' + splittext[1] + '}}</option>' +
                    //'</select><div ng-hide="true">{{' + splitvalue[1] + 's}}</div>';
                }
                else {
                    groups = true;
                    tmpl = '<select id="' + splitvalue[1] + '"' + cssclass + '   ng-model="myOption" ' + multipleString + ' ng-options="' + splittext[0] + 's.' + splitvalue[1] + ' as ' + splittext[0] + 's.' + splittext[1] + ' group by ' + splittext[0] + 's.' + attr.groupby + ' for ' + splittext[0] + 's in drpObj"></select>'
                }
                $element.replaceWith($compile(tmpl)($scope));
                if (multiple == '') {
                    var t = setTimeout(function () {
                        if ($scope.rxSelected != undefined) {
                            var a = $scope.rxSelected
                            $("#" + splitvalue[1]).select2().val(a);
                        } else {
                            $("#" + splitvalue[1]).select2();
                        }

                    }, 500);

                } else {
                    var t = setTimeout(function () {
                        var a = $scope.rxSelected
                        $("#" + splitvalue[1]).select2().val(a);
                    }, 500);


                }

                $("#" + splitvalue[1]).on("change", function (e) {
                    if (!multiple) {
                        $scope.$apply(function () {
                            if (!angular.isUndefined(attr.groupby)) {
                                $scope.selectess(drpObj[e.val][splitvalue[1]]);
                            }
                            else {
                                $scope[splitvalue[1] + 's'] = e.val;
                                $scope.selectess(e.val)
                            }
                        });
                    }
                    else {
                        $scope.$apply(function () { $scope.multipleselectess(e.val) });
                    }
                }).on("select2-selecting", function (e) {
                    if (e.val == '') {
                        $scope[splitvalue[1] + 's'] = '';
                        $scope.rxValue = '';
                        $scope.$apply();
                    }
                })
            };
            $scope.multipleselectess = function (u) {
                var cou = 0;
                if (!groups) {
                    $scope.rxValue = [];
                    $scope.rxText = [];
                    for (var j = 0; j < u.length; j++) {
                        for (var i = 0; i < drpObj.length; i++) {
                            if (drpObj[i][splitvalue[1]] == u[j]) {
                                if (cou == 0) {
                                    $scope[splitvalue[1] + 's'] = drpObj[i][splitvalue[1]];
                                    cou++;
                                }
                                $scope.rxValue.push(drpObj[i][splitvalue[1]])
                                $scope.rxText.push(drpObj[i][splittext[1]]);
                            }
                        }
                    }
                }
                else {
                    //currently not working
                    for (var i = 0; i < drpObj.length; i++) {
                        if (drpObj[i][splitvalue[1]] == u[0]) {
                            $scope.rxValue.push(drpObj[i][splitvalue[1]])
                            $scope.rxText.push(drpObj[i][splittext[1]]);
                        }
                    }
                }
            }
            $scope.arfilter = function (c) {
                if (c == 0) {
                    for (var i = 0; i < drpObj.length; i++) {
                        if (drpObj[i][splitselect[1]] == $scope.selects) {
                            $scope.rxValue = drpObj[i][splitvalue[1]]
                            $scope.rxText = drpObj[i][splittext[1]];
                        }
                    }
                }
                else {
                    for (var i = 0; i < drpObj.length; i++) {
                        if (drpObj[i][splitvalue[1]] == $scope.rxValue) {
                            $scope.rxText = drpObj[i][splittext[1]];
                        }
                    }
                }
            }
            this.setSelect = function () {
                $("#" + splitvalue[1]).select2();
            }
        },
        link: function (scope, element, attrs, drpCtrl) {
            var _sourceChange = 0;
            function updatelist(list) {
                if (!angular.isUndefined(list)) {
                    if (_sourceChange == 0) {
                        _sourceChange = 1;
                        drpCtrl.bind(attrs, list);
                    } else {
                        drpCtrl.setSelect();
                    }

                }
            }
            function updateselected(s) {
                if (s != undefined) {
                    if (scope.rxSource != null && s != "") {
                        drpCtrl.selectedup(attrs, s);
                    }
                }
            }
            function updatedis(s) {
                if (!angular.isUndefined(s)) {
                    //drpCtrl.disables(s, attrs);
                }
            }
            function updatefilter(s) {
                if (!angular.isUndefined(s)) {
                    scope.rxValue = 0;
                    scope.rxText = '';
                    drpCtrl.filbind(attrs);
                }
            }
            scope.$watch('rxSource', updatelist, true);
            scope.$watch('rxDisabled', updatedis, true);
            scope.$watch('rxFilter', updatefilter, true);
            scope.$watch('rxSelected', updateselected, true);
        },
        replace: true
    };
});

rx.directive('rxRequired', function () {
    return {
        restrict: 'A',
        require: "ngModel",
        link: function (scope, elm, attrs, ctrl) {
            var ab = attrs.ngModel;
            var requiredMessage = attrs.rxRequiredMessage;
            var viewTip = '';
            if (!angular.isUndefined(attrs.rxRequiredMessage)) {
                $(elm).tooltip('destroy')
                $(elm).tooltip({
                    title: attrs.rxRequiredMessage,
                    html: true,
                    trigger: 'focus',
                    placement: !angular.isUndefined(attrs.rxRequiredPosition) ? attrs.rxRequiredPosition : 'right',
                    delay: { show: 200, hide: 0 }
                });
            }
            if (angular.isUndefined(attrs.type)) {
                $(elm).addClass('rx-errordropdown');
                //$("#s2id_currencyId").addClass('rx-validdropdown');
            } else {
                $(elm).addClass('rx-error');
            }

            var chk = false;

            ctrl.$setValidity(attrs.ngModel, false);
            function rxValid(str) {
                if (!angular.isUndefined(attrs.rxRequiredMessage)) {
                    var t = setTimeout(function () {
                        $(elm).tooltip('destroy');
                    }, 500)
                    
                } else if (!angular.isUndefined(attrs.rxMessageScope)) {
                    var t = setTimeout(function () {
                        $(elm).tooltip('destroy');
                    }, 500)
                }
                chk = true;
                if (angular.isUndefined(attrs.type)) {
                    $("#s2id_" + attrs.$$element[0].id).removeClass('rx-errordropdown');
                    $("#s2id_" + attrs.$$element[0].id).addClass('rx-validdropdown');
                    $(elm).removeClass('rx-errordropdown');
                    $(elm).addClass('rx-validdropdown');
                } else {
                    $(elm).removeClass('rx-error');
                    $(elm).addClass('rx-valid');
                }
            }

            function rxInvalid(str) {
                if (chk) {
                    if (!angular.isUndefined(attrs.rxRequiredMessage)) {
                        
                        $(elm).tooltip({
                            title: attrs.rxRequiredMessage,
                            html: true,
                            trigger: 'focus',
                            placement: attrs.rxRequiredPosition,
                            delay: { show: 200, hide: 0 }
                        });
                        $(elm).tooltip('show');
                    } else if (!angular.isUndefined(attrs.rxMessageScope)) {
                        $(elm).tooltip({
                            title: viewTip,
                            html: true,
                            trigger: 'focus',
                            placement: attrs.rxRequiredPosition,
                            delay: { show: 200, hide: 0 }
                        });
                        $(elm).tooltip('show');
                    }
                }
                chk = false;
                if (angular.isUndefined(attrs.type)) {
                    $("#s2id_" + attrs.$$element[0].id).addClass('rx-errordropdown');
                    $("#s2id_" + attrs.$$element[0].id).removeClass('rx-validdropdown');
                    $(elm).addClass('rx-errordropdown');
                    $(elm).removeClass('rx-validdropdown');
                } else {
                    $(elm).removeClass('rx-valid');
                    $(elm).addClass('rx-error');
                }
                //$(elm).addClass('rx-error');
                //$(elm).removeClass('rx-valid');

            }

            scope.$watch(ab, function (viewValue) {
                if (!angular.isUndefined(viewValue)) {
                    if (angular.isUndefined(attrs.type)) {
                        if (attrs.$$element[0].localName == "textarea") {
                            if (viewValue != "") {
                                rxValid();
                                ctrl.$setValidity(attrs.ngModel, true);
                                return viewValue;
                            }
                            else {
                                rxInvalid();
                                ctrl.$setValidity(attrs.ngModel, false);
                                return undefined;
                            }
                        }
                        if (attrs.$$element[0].localName == "select") {
                            if (viewValue != '' && viewValue != null && viewValue != undefined) {
                                rxValid();
                                ctrl.$setValidity(attrs.ngModel, true);
                                return viewValue;
                            }
                            else {
                                rxInvalid();
                                ctrl.$setValidity(attrs.ngModel, false);
                                return undefined;
                            }
                        }
                    }
                    else {
                        var a = attrs.type;
                        switch (a) {
                            case 'number':
                                if (viewValue != null) {
                                    var vv = viewValue.toString();
                                    var validate = true;
                                    if (!angular.isUndefined(attrs.minDigit)) {
                                        validate = (attrs.minDigit > vv.length) ? false : true;
                                    }
                                    if (validate) {
                                        if (!angular.isUndefined(attrs.maxDigit)) {
                                            validate = (attrs.maxDigit < vv.length) ? false : true;
                                        }
                                        if (validate) {
                                            rxValid();
                                            ctrl.$setValidity(attrs.ngModel, true);
                                            return viewValue;
                                        }
                                        else {
                                            rxInvalid();
                                            ctrl.$setValidity(attrs.ngModel, false);
                                            return undefined;
                                        }
                                    } else {
                                        rxInvalid();
                                        ctrl.$setValidity(attrs.ngModel, false);
                                        return undefined;
                                    }
                                }
                                else {
                                    rxInvalid();
                                    ctrl.$setValidity(attrs.ngModel, false);
                                    return undefined;
                                }
                                break;
                            case 'text':
                                if (viewValue != "") {
                                    var p = (!angular.isUndefined(attrs.rxRequiredPattern)) ? attrs.rxRequiredPattern : '';
                                    if (p == '') {
                                        rxValid();
                                        ctrl.$setValidity(attrs.ngModel, true);
                                        return viewValue;
                                    }
                                    var pattern = new RegExp(attrs.rxRequiredPattern, "g");
                                    if (pattern.test(viewValue)) {
                                        rxValid();
                                        ctrl.$setValidity(attrs.ngModel, true);
                                        return viewValue;
                                    } else {
                                        rxInvalid();
                                        ctrl.$setValidity(attrs.ngModel, false);
                                        return undefined;
                                    }
                                }
                                else {
                                    rxInvalid();
                                    ctrl.$setValidity(attrs.ngModel, false);
                                    return undefined;
                                }
                                break;
                            case 'email':
                                if (viewValue != "") {
                                    var p = (!angular.isUndefined(attrs.rxRequiredPattern)) ? new RegExp(attrs.rxRequiredPattern, "g") : /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])/;
                                    if (p.test(viewValue)) {
                                        rxValid();
                                        ctrl.$setValidity(attrs.ngModel, true);
                                        return viewValue;
                                    }
                                    else {
                                        rxInvalid();
                                        ctrl.$setValidity(attrs.ngModel, false);
                                        return undefined;
                                    }
                                }
                                else {
                                    rxInvalid();
                                    ctrl.$setValidity(attrs.ngModel, false);
                                    return undefined;
                                }
                                break;
                            case 'password':
                                if (viewValue != "") {
                                    var p = (!angular.isUndefined(attrs.rxRequiredPattern)) ? new RegExp(attrs.rxRequiredPattern, "g") : '';
                                    if (p == "") {
                                        rxValid();
                                        ctrl.$setValidity(attrs.ngModel, true);
                                        return viewValue;
                                    }
                                    if (p.test(viewValue)) {
                                        rxValid();
                                        ctrl.$setValidity(attrs.ngModel, true);
                                        return viewValue;
                                    }
                                    else {
                                        rxInvalid();
                                        ctrl.$setValidity(attrs.ngModel, false);
                                        return undefined;
                                    }
                                }
                                else {
                                    rxInvalid();
                                    ctrl.$setValidity(attrs.ngModel, false);
                                    return undefined;
                                }
                                break;

                        }
                    }
                }
                else {
                    if (attrs.type == "email") {
                        rxInvalid();
                        ctrl.$setValidity(attrs.ngModel, false);
                        return undefined;
                    }
                }
            }, true)
            if (!angular.isUndefined(attrs.rxMessageScope)) {
                scope.$watch(attrs.rxMessageScope, function (viewValue) {
                    if (!angular.isUndefined(viewValue)) {
                        viewTip = viewValue;
                        $(elm).tooltip('destroy')
                        $(elm).tooltip({
                            title: viewValue,
                            html: true,
                            trigger: 'focus',
                            placement: !angular.isUndefined(attrs.rxRequiredPosition) ? attrs.rxRequiredPosition : 'right',
                            delay: { show: 200, hide: 0 }
                        });
                    }
                }, true);
            }
        }
    };
});
rx.directive('rxCompare', function () {
    return {
        require: 'ngModel',
        scope: {
            compareModel: '=',
            rxCompareScope:'='
        },
        link: function (scope, elm, attrs, ctrl) {
            var av = '';
            if (!angular.isUndefined(attrs.rxCompareMessage)) {
                $(elm).tooltip('destroy')
                $(elm).tooltip({
                    title: attrs.rxCompareMessage,
                    html: true,
                    trigger: 'focus',
                    placement: !angular.isUndefined(attrs.rxComparePosition) ? attrs.rxComparePosition : 'right',
                    delay: { show: 200, hide: 0 }
                });
            }
            $(elm).addClass('rx-error');
            var chk = false;
            ctrl.$parsers.unshift(function (viewValue) {
                var validate = (scope.compareModel == viewValue) ? true : false;
                if (validate) {
                    av = viewValue;
                    rxcomValid();
                    ctrl.$setValidity(attrs.ngModel, true);
                    return viewValue;
                } else {
                    rxcomInvalid();
                    ctrl.$setValidity(attrs.ngModel, false);
                    return undefined;
                }

            });
            ctrl.$setValidity(attrs.ngModel, false);
            function upcmpr(v) {
                if (!(angular.isUndefined(v))) {
                    if (v == "") {
                        chk = true;
                        rxcomInvalid();
                        ctrl.$setValidity(attrs.ngModel, false);
                        return;
                    }
                    var validate = (v == av) ? true : false;
                    if (validate) {
                        rxcomValid();
                        ctrl.$setValidity(attrs.ngModel, true);
                    } else {
                        chk = true;
                        rxcomInvalid();
                        ctrl.$setValidity(attrs.ngModel, false);
                    }


                }
            }
            function rxcomValid() {
                if (!angular.isUndefined(attrs.rxCompareMessage)) {
                    $(elm).tooltip('destroy')
                }
                chk = true;
                $(elm).removeClass('rx-error');
                $(elm).addClass('rx-valid');
            }

            function rxcomInvalid() {
                if (chk) {
                    if (!angular.isUndefined(attrs.rxCompareMessage)) {
                        $(elm).tooltip({
                            title: attrs.rxCompareMessage,
                            html: true,
                            trigger: 'focus',
                            placement: !angular.isUndefined(attrs.rxComparePosition) ? attrs.rxComparePosition : 'right',
                            delay: { show: 200, hide: 0 }
                        });
                        $(elm).tooltip('show');
                    }

                    if (!angular.isUndefined(attrs.rxCompareScope)) {
                        if (!angular.isUndefined(viewTip)) {
                                $(elm).tooltip('destroy')
                                $(elm).tooltip({
                                    title: scope.rxCompareScope,
                                    html: true,
                                    trigger: 'focus',
                                    placement: !angular.isUndefined(attrs.rxComparePosition) ? attrs.rxComparePosition : 'right',
                                    delay: { show: 200, hide: 0 }
                                });
                            }
                    }
                }
                chk = false;
                $(elm).addClass('rx-error');
                $(elm).removeClass('rx-valid');
            }
            var viewTip = '';
            if (!angular.isUndefined(attrs.rxCompareScope)) {
                scope.$watch("rxCompareScope", function (viewValue) {
                    if (!angular.isUndefined(viewValue)) {
                        viewTip = viewValue;
                        $(elm).tooltip('destroy')
                        $(elm).tooltip({
                            title: viewTip,
                            html: true,
                            trigger: 'focus',
                            placement: !angular.isUndefined(attrs.rxComparePosition) ? attrs.rxComparePosition : 'right',
                            delay: { show: 200, hide: 0 }
                        });
                    }
                }, true);
            }
            scope.$watch("compareModel", upcmpr, true);
        }
    };
});

rx.directive('rxBlur', function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            elem.bind('blur', function () {
                scope.$apply(attrs.rxBlur);
            });
            function validateblur(v) {
                if (!(angular.isUndefined(v))) {
                    if (v == "success") {
                        ctrl.$setValidity('blur', true);
                    }
                    else {
                        ctrl.$setValidity('blur', false);
                    }
                }
            }
            scope.$watch(attrs.rxValidate, validateblur, true);
        }
    };
});

rx.directive('rxClick', function () {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs, ctrl) {
            var _onClick = true;
            $(elem).click(function (e) {
                if (_onClick) {
                    elem.removeClass("icon-plus").addClass("icon-minus");
                    _onClick = false;
                } else {
                    elem.removeClass("icon-minus").addClass("icon-plus");
                    _onClick = true;
                }
                
            });

        }
    };
});


rx.directive('rxCheckboxlistDropdown', function (appconfig) {
    return {
        restrict: 'A',
        scope: {
            'rxSource': '=',
            'rxModel': '=',
            'rxSelected': '=',
            'cssConfig': '=',
            'rxDisabled': '='
        },
        controller: function ($scope, $element) {
            $scope.rxModel = [];
            $scope.cssSettings = {};
            var checks = $scope.checks = [];
            var attributes = '';
            $scope.DefaultText = "None Selected"
            var dispText = [];
            $scope.selects = function (check) {
                if (!check.disabled) {
                    if (angular.isUndefined(check.isChecked)) {
                        check.isChecked = true;
                        check.activecss = "active"
                        $scope.rxModel.push(check["checkvalue"]);
                        dispText.push(check["checktext"]);
                        if ($scope.rxModel.length == 1) {
                            $scope.DefaultText = check["checktext"]
                        }
                        else {
                            $scope.DefaultText = $scope.rxModel.length + " Selected";
                        }
                    }
                    else {
                        check.activecss = '';
                        check.isChecked = undefined;
                        var i = $scope.rxModel.indexOf(check["checkvalue"]);
                        if (i != -1) {
                            $scope.rxModel.splice(i, 1);
                        }
                        i = dispText.indexOf(check["checktext"]);
                        if (i != -1) {
                            dispText.splice(i, 1);
                        }
                        if ($scope.rxModel.length == 1) {
                            // $scope.DefaultText = check["checktext"]
                            $scope.DefaultText = (dispText.length == 1) ? dispText[0] : '';
                        }
                        else if ($scope.rxModel.length == 0) {
                            $scope.DefaultText = "None Selected"
                        }
                        else {
                            $scope.DefaultText = $scope.rxModel.length + " Selected";
                        }
                    }
                }
            }
            this.createList = function (attrs) {
                attributes = attrs;
                if (!angular.isUndefined($scope.cssConfig)) {
                    $scope.cssSettings.buttonCss = (!angular.isUndefined($scope.cssConfig.buttonCss)) ? $scope.cssConfig.buttonCss : '';
                    $scope.cssSettings.textCss = (!angular.isUndefined($scope.cssConfig.textCss)) ? $scope.cssConfig.textCss : 'pull-left';
                    $scope.cssSettings.iconCss = (!angular.isUndefined($scope.cssConfig.iconCss)) ? $scope.cssConfig.iconCss : 'pull-right';
                    $scope.cssSettings.innercss = (!angular.isUndefined($scope.cssConfig.innercss)) ? $scope.cssConfig.innercss : '';
                }
                else {
                    $scope.cssSettings.buttonCss = '';
                    $scope.cssSettings.textCss = 'pull-left';
                    $scope.cssSettings.iconCss = 'caret pull-right';
                    $scope.cssSettings.innercss = '';
                }
                for (var i = 0; i < $scope.rxSource.length; i++) {
                    var check = {};
                    var checked = $scope.isSelected($scope.rxSource[i][attributes.rxSelectcol]);
                    if (checked) {
                        $scope.rxModel.push($scope.rxSource[i][attributes.rxValue]);
                        dispText.push($scope.rxSource[i][attributes.rxText]);
                        if ($scope.rxModel.length == 1) {
                            $scope.DefaultText = $scope.rxSource[i][attributes.rxText]
                        }
                        else {
                            $scope.DefaultText = $scope.rxModel.length + " Selected";
                        }
                    }
                    check.activecss = checked ? "active" : '';
                    check.isChecked = checked;
                    check.checkvalue = $scope.rxSource[i][attributes.rxValue];
                    check.checktext = $scope.rxSource[i][attributes.rxText];
                    check.disabled = $scope.isDisabled($scope.rxSource[i][attributes.rxSelectcol]);
                    if (check.disabled) {
                        var i = $scope.rxModel.indexOf(check.checkvalue);
                        if (i != -1) {
                            $scope.rxModel.splice(i, 1);
                        }
                    }
                    $scope.checks.push(check);
                };
            }
            var strArray = [];
            $scope.isSelected = function (v) {
                if (!angular.isUndefined($scope.rxSelected)) {
                    if (angular.isString($scope.rxSelected)) {
                        if (strArray.length == 0) {
                            var str = $scope.rxSelected;
                            var val = str.split(',');
                            for (var i = 0; i < val.length; i++) {
                                strArray.push(val[i].trim());
                            }
                        }
                        for (var i = 0; i < strArray.length; i++) {
                            if (strArray[i] == v) {
                                return true;
                            }
                        }
                        return undefined;
                    }
                    for (var i = 0; i < $scope.rxSelected.length; i++) {
                        if ($scope.rxSelected[i][attributes.rxSelectcol] == v) {
                            return true;
                        }
                    }
                    return undefined;
                }
                else {
                    return undefined;
                }
            }
            $scope.isDisabled = function (v) {
                if (!angular.isUndefined(v)) {
                    if (!angular.isUndefined($scope.rxDisabled)) {
                        for (var i = 0; i < $scope.rxDisabled.length; i++) {
                            if ($scope.rxDisabled[i] == v) {
                                return true;
                            }
                        }
                        return false;
                    }
                }
                return false;
            }
            $scope.Drpopen = "";
            $scope.dropdown = function () {
                if ($scope.Drpopen != "") {
                    $scope.Drpopen = "";
                }
                else {
                    $scope.Drpopen = "open";
                }
            }
            this.clearMenus = function () {
                if ($scope.Drpopen != "") {
                    $scope.Drpopen = "";
                }
                else {
                    $scope.Drpopen = "open";
                }
            }
            this.setSelect = function () {
                if (angular.isString($scope.rxSelected)) {
                    if (strArray.length == 0) {
                        var str = $scope.rxSelected;
                        var val = str.split(',');
                        for (var i = 0; i < val.length; i++) {
                            strArray.push(val[i].trim());
                        }
                    }
                    for (var j = 0; j < $scope.checks.length; j++) {
                        for (var i = 0; i < strArray.length; i++) {
                            if (strArray[i] == $scope.rxSource[j][attributes.rxSelectcol]) {
                                $scope.checks[j].activecss = "active";
                                $scope.checks[j].isChecked = true;
                                $scope.checks[j].disabled = $scope.isDisabled($scope.rxSource[i][attributes.rxSelectcol]);
                                if ($scope.checks[j].isChecked && !$scope.checks[j].disabled) {
                                    $scope.rxModel.push($scope.rxSource[i][attributes.rxValue]);
                                    dispText.push($scope.rxSource[i][attributes.rxText]);
                                    if ($scope.rxModel.length == 1) {
                                        $scope.DefaultText = $scope.rxSource[i][attributes.rxText]
                                    }
                                    else {
                                        $scope.DefaultText = $scope.rxModel.length + " Selected";
                                    }
                                }
                            }
                        }
                    }
                    return;
                }
                for (var j = 0; j < $scope.checks.length; j++) {
                    for (var i = 0; i < $scope.rxSelected.length; i++) {
                        if ($scope.rxSelected[i][attributes.rxSelectcol] == $scope.rxSource[j][attributes.rxSelectcol]) {
                            $scope.checks[j].activecss = "active";
                            $scope.checks[j].isChecked = true;
                            $scope.checks[j].disabled = $scope.isDisabled($scope.rxSource[i][attributes.rxSelectcol]);
                            if ($scope.checks[j].isChecked && !$scope.checks[j].disabled) {
                                $scope.rxModel.push($scope.rxSource[i][attributes.rxValue]);
                                dispText.push($scope.rxSource[i][attributes.rxText]);
                                if ($scope.rxModel.length == 1) {
                                    $scope.DefaultText = $scope.rxSource[i][attributes.rxText]
                                }
                                else {
                                    $scope.DefaultText = $scope.rxModel.length + " Selected";
                                }
                            }
                        }
                    }
                }
            }

        },
        link: function (scope, element, attrs, checkCtrl) {
            function changedrxsource(v) {
                if (!angular.isUndefined(v)) {
                    checkCtrl.createList(attrs);
                }
            }
            function changedrxselected(v) {
                if (!angular.isUndefined(v)) {
                    if (!angular.isUndefined(scope.rxSource) && !angular.isUndefined(scope.rxSelected) != "") {
                        checkCtrl.setSelect();
                    }
                }
            }
            scope.$watch("rxSource", changedrxsource, true)
            scope.$watch("rxSelected", changedrxselected, true)
        },
        template:
          '<div class="btn-group {{Drpopen}}"  >' +
            '<button  class="dropdown-toggle btn {{cssSettings.buttonCss}}" ng-click="dropdown()" type="button"><span class="{{cssSettings.textCss}}">{{DefaultText}} </span><i class="{{cssSettings.iconCss}} pull-right"></i></button>' +
              '<div class="multiselect-container dropdown-menu rxdropdown {{cssSettings.innercss}}"  >' +
                '<ul style="list-style-type: none; margin:0px; max-height: 200px; overflow-y: auto; overflow-x: hidden;">' +
              '<li ng-click="selects(check)" ng-repeat="check in checks"  ng-class="{active:check.isChecked}">' +
            '<a  href=""><label>' +
            '<input type="checkbox" style="margin-bottom:5px; margin-right:7px;" ng-disabled="check.disabled" checked="{{check.isChecked}}" value="{{check.checkvalue}}">{{check.checktext}}' +
            '</label></a>' +
          '</li>' +
          '</ul>' +
          '</div>' +
          '</div>',
        replace: true
    };
});
rx.directive('rxNosave', function () {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs, ctrl) {
            $(elem).attr('autocomplete', 'off');
        }
    };
});
rx.directive('rxFocus', function () {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs) {
            scope.$watch(attrs.focusSource, function (v) {
                if (!angular.isUndefined(v)) {
                    var t = setTimeout(function () {
                        $(elm).focus();
                    }, 1000);
                }
            }, true);
        }
    };
});

rx.directive('rxzip', function () {
    return {
        restrict: 'C',
        replace: true,
        transclude: true,
        scope: { title: '@rxzipTitle' },
        template: '<div>' +
        '<div class="title">{{title}}</div>' +
        '<div class="body" ng-transclude></div>' +
        '</div>',
        link: function (scope, element, attrs) {
            var title = angular.element(element.children()[0]),
            opened = true;
            title.bind('click', toggle);
            function toggle() {
                opened = !opened;
                element.removeClass(opened ? 'rxzipclose' : 'rxzipopen');
                element.addClass(opened ? 'rxzipopen' : 'rxzipclose');
            }
            toggle();
        }
    }
});
rx.directive('rxColor', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs) {
            $(elm).colorpicker({
                format: 'hex'
            }).on('changeColor', function (ev) {
                elm[0].value = ev.color.toHex();
                parsed = $parse(attrs.ngModel);
                scope.$apply(function () {
                    parsed.assign(scope, ev.color.toHex());
                });
            });
        }
    };
});
rx.directive('rxTest', function () {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs, ctrl) {
            // system stat flot
            d1 = [['jan', 231], ['feb', 243], ['mar', 323], ['apr', 352], ['maj', 354], ['jun', 467], ['jul', 429]];
            d2 = [['jan', 87], ['feb', 67], ['mar', 96], ['apr', 105], ['maj', 98], ['jun', 53], ['jul', 87]];
            d3 = [['jan', 34], ['feb', 27], ['mar', 46], ['apr', 65], ['maj', 47], ['jun', 79], ['jul', 95]];

            var visitor = $("#visitor-stat"),
            order = $("#order-stat"),
            user = $("#user-stat"),

            data_visitor = [{
                data: d1,
                color: '#00A600'
            }],
            data_order = [{
                data: d2,
                color: '#2E8DEF'
            }],
            data_user = [{
                data: d3,
                color: '#DC572E'
            }],


            options_lines = {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    },
                    hoverable: true
                },
                grid: {
                    backgroundColor: '#FFFFFF',
                    borderWidth: 1,
                    borderColor: '#CDCDCD',
                    hoverable: true
                },
                legend: {
                    show: false
                },
                xaxis: {
                    mode: "categories",
                    tickLength: 0
                },
                yaxis: {
                    autoscaleMargin: 2
                }

            };

            // render stat flot
            $.plot(visitor, data_visitor, options_lines);
            $.plot(order, data_order, options_lines);
            $.plot(user, data_user, options_lines);

            // tootips chart
            function showTooltip(x, y, contents) {
                $('<div id="tooltip" class="bg-black corner-all color-white">' + contents + '</div>').css({
                    position: 'absolute',
                    display: 'none',
                    top: y + 5,
                    left: x + 5,
                    border: '0px',
                    padding: '2px 10px 2px 10px',
                    opacity: 0.9,
                    'font-size': '11px'
                }).appendTo(elem).fadeIn(200);
            }

            var previousPoint = null;
            $('#visitor-stat, #order-stat, #user-stat').bind("plothover", function (event, pos, item) {

                if (item) {
                    if (previousPoint != item.dataIndex) {
                        previousPoint = item.dataIndex;

                        $("#tooltip").remove();
                        var x = item.datapoint[0].toFixed(2),
                        y = item.datapoint[1].toFixed(2);
                        label = item.series.xaxis.ticks[item.datapoint[0]].label;

                        //showTooltip(item.pageX, item.pageY,
                        //label + " = " + y);
                    }
                }
                else {
                    $("#tooltip").remove();
                    previousPoint = null;
                }

            });
        }
    };
});
rx.directive('rxStyle', function () {
    return {
        restrict: 'A',
        require: "ngModel",
        link: function (scope, elem, attrs, ctrl) {
            var i = 0;
            scope.$watch(attrs.ngModel, function (v) {
                if (!angular.isUndefined(v)) {
                    if (v) {
                        if (i == 0) {
                            $(elem).attr("checked", "checked");
                            $(elem).uniform();
                            i++;
                        }
                    }
                    else {
                        if (i == 0) {
                            $(elem).uniform();
                            i++;
                        }
                    }

                } else {
                    $(elem).uniform();
                }

            }, true);
        }
    };
});

rx.directive('rxGooglemapPicker', function () {
    return {
        restrict: 'A',
        scope: {
            'rxModel': '=',
            'mapObject': '='
        },
        link: function (scope, elem, attrs, ctrl) {
            var locationArrary = [];
            var locationFinal = {};
            $(elem).geocomplete({
                map: ".map_canvas",
                mapOptions: {
                    zoom: 10
                },
                markerOptions: {
                    draggable: true
                }

            }).bind("geocode:result", function (event, result) {
                locationArrary = [];
                locationFinal = {};
                for (var i = 0; i < result.address_components.length; i++) {
                    var location = {};
                    location["longName"] = result.address_components[i].long_name;
                    location["shortName"] = result.address_components[i].short_name;
                    location["type"] = result.address_components[i].types[0];
                    locationArrary.push(location);
                }
                locationFinal["location"] = locationArrary;
                locationFinal["formatedAddress"] = result.formatted_address;
                locationFinal["latitute"] = result.geometry.location.jb;
                locationFinal["longitute"] = result.geometry.location.kb
                scope.$apply(function () {
                    scope.mapObject = locationFinal;
                });
            }).bind("geocode:dragged", function (event, latLng) {
                locationFinal["latitute"] = latLng.lat();
                locationFinal["longitute"] = latLng.lng();
                scope.$apply(function () {
                    scope.mapObject = locationFinal;
                });
            });
            $(elem).trigger("geocode");
            scope.$watch("rxModel", function (v) {
                if (!angular.isUndefined(v)) {
                    elem[0].value = v;
                    $(elem).trigger("geocode");
                }
            }, true);
        }
    }
});

rx.directive('rxRedirect', function (response) {
    return {
        restrict: 'A',
        scope: {
            'redirectUrl': '=',
            'url': '='
        },
        link: function (scope, elm, attrs, redCtrl) {
            scope.$watch("redirectUrl", function (v) {
                if (!angular.isUndefined(v)) {
                    if (v != null) {
                        angular.forEach(v, function (link) {
                            var url = link.url;
                            var shortcutKey = link.shortcutKey;
                            Mousetrap.bind(shortcutKey, function () {
                                scope.$apply(function () {
                                    response.redirect(url.replace("#", ""));
                                });
                            });
                        });

                    }
                }
            }, true);

        }
    };
});
rx.directive('rxFileupload', function (response) {
    return {
        restrict: 'A',
        scope: {
            url: '=',
            uploadObject: '='
        },
        link: function (scope, elm, attrs) {
            //$(elm).uniform();
            $(elm).fileupload({
                url: scope.url,
                dataType: 'json',
                done: function (e, data) {
                    if (angular.isUndefined(attrs.uploadEvent)) {
                        scope.$apply(function () {
                            scope.uploadObject = data.result;
                        });
                    }
                    else {
                        scope.$apply(function () {
                            scope.$parent["uploadFile"] = data.result;
                            scope.$parent.$eval(attrs.uploadEvent + "(uploadFile)");
                        });
                    }
                },
            });
        }
    };
});
rx.directive('rxDate', ['$parse',function ($parse) {
    return {
        restrict: 'A',
        require: "ngModel",
        link: function (scope, elm, attrs, ngModel) {
            $(elm).attr('placeholder', "dd/mm/yyyy");
            var firstIndex = 0;
            var secondIndex = 1;
            var thirdIndex = 2;
            function getDateIndex() {
                    var firstString = "d";
                    var secondString = "m";
                    var thirdString = "y";
                    firstIndex = (firstString == "d") ? 1 : (firstString == "m") ? 0 : (firstString == "y") ? 2 : 0
                    secondIndex = (secondString == "m") ? 0 : (secondString == "d") ? 1 : (firstString == "y") ? 2 : 0
                    thirdIndex = (thirdString == "y") ? 2 : (thirdString == "d") ? 1 : (thirdString == "m") ? 0 : 0

            }
            var isDateChanged = true;
            scope.$watch(attrs.rxModel, function (v) {
                if (!angular.isUndefined(v) && v != null && v.length > 2) {
                    if (isDateChanged) {
                        getDateIndex();
                        var splitString = '/';
                        var split = v.split("/");
                        if (split.length > 1) {
                            isDateChanged = false;
                            var parsedrxModel = $parse(attrs.ngModel);
                            $(elm).val(split[firstIndex] + splitString + split[secondIndex] + splitString + split[thirdIndex]);
                            parsedrxModel.assign(scope, split[firstIndex] + splitString + split[secondIndex] + splitString + split[thirdIndex]);
                            $(elm).datepicker('update', new Date(split[2], split[0] - 1, split[1]));
                        }

                    } else {
                        //getDateIndex();
                        //var splitString = appConfig.configuration.seperator;
                        //var split = v.split("/");
                        //if (split.length == 3) {

                        //}
                        //$(elm).datepicker('update', new Date(split[2], split[0] - 1, split[1]));
                    }
                }
            }, true)
            var split = attrs.ngModel.split(".");
            $(elm).datepicker({
                format: "dd/mm/yyyy",
                todayHighlight: true,
                autoclose: true
            }).on('changeDate', function (ev) {
                if (this.value.length == 10) {
                    var splitString = "/";
                    var split = this.value.split(splitString);
                    ngModel.$setViewValue(split[firstIndex] + splitString + split[secondIndex] + splitString + split[thirdIndex]);
                    scope.$apply();
                    scope.$apply(function () {
                        isDateChanged = false;
                        if (!angular.isUndefined(attrs.rxModel)) {
                            var parsedrxModel = $parse(attrs.rxModel);
                            parsedrxModel.assign(scope, split[1] + "/" + split[0] + "/" + split[2]);
                        }
                        if (!angular.isUndefined(attrs.ngChange)) {
                            scope.$eval(attrs.ngChange);
                            return;
                        };
                        if (!angular.isUndefined(attrs.setRxgrid)) {
                            scope.$eval(attrs.ngChange);
                        }
                    });

                }
            }).on('click', function () {
                $(elm).datepicker('show');
            }).css("z-index", 3335);
            var isWhole_re = /^\s*\d+\s*$/;
            var parsed = $parse(attrs.ngModel);
            function isWhole(s) {
                return String(s).search(isWhole_re) != -1
            }
            function checkvalue() {
                scope.$apply(function () {
                    var splitString = "/";
                    var split = $(elm).val().split(splitString);
                    if (split[0] == "") {
                        $(elm).val("");
                        ngModel.$setViewValue("");
                        if (!angular.isUndefined(attrs.rxModel)) {
                            var parsedrxModel = $parse(attrs.rxModel);
                            parsedrxModel.assign(scope, undefined);
                        }
                        return;
                    }
                    for (var i = 0; i < split.length; i++) {
                        if (split[i] != "") {
                            if (!isWhole(split[i])) {
                                $(elm).val("");
                                ngModel.$setViewValue("");
                                if (!angular.isUndefined(attrs.rxModel)) {
                                    var parsedrxModel = $parse(attrs.rxModel);
                                    parsedrxModel.assign(scope, undefined);
                                }
                                alert("Wrong Data");
                            }
                        }
                    }
                    if ($(elm).val().length == 10) {
                        var pattern = new RegExp("^(0?[1-9]|[12][0-9]|3[0]|3[1])" + "/" + "(0?[1-9]|1[012])" + "/" + "((19|20)\\d\\d)$", "g");
                        if (!pattern.test($(elm).val())) {
                            $(elm).val("");
                            ngModel.$setViewValue("");
                            if (!angular.isUndefined(attrs.rxModel)) {
                                var parsedrxModel = $parse(attrs.rxModel);
                                parsedrxModel.assign(scope, undefined);
                            }
                            alert("Wrong Data");
                        }
                    }

                });
            }
            $(elm).keyup(function () {
                checkvalue();
            });
        }
    };
}]);
rx.directive('rxAutocomplete', function ($parse, rxJson) {
    return {
        restrict: 'A', require: "ngModel",
        link: function (scope, elm, attrs, ngModel) {
            scope.$watch(attrs.rxAutocompletesource, function (v) {
                if (!angular.isUndefined(v)) {
                    var a = rxJson.convertToArrary(v, attrs.rxText);
                    var rxSource = v;
                    $(elm).typeahead({
                        name: attrs.ngModel,
                        local: rxJson.convertToArrary(v, attrs.rxAutocompletetext),
                        limit: 10,
                    }).on('typeahead:selected', function ($e) {
                        var val = attrs.rxAutocompletevalue.split(".");
                        var jsonObject = {};
                        jsonObject[attrs.rxAutocompletetext] = $e.currentTarget.value;
                        var searchValue = rxJson.find(rxSource, jsonObject);
                        var parsedngModel = $parse(attrs.ngModel);
                        var parsedrxValue = $parse(attrs.rxAutocompletevalue);
                        scope.$apply(function () {
                            parsedngModel.assign(scope, $e.currentTarget.value);
                            parsedrxValue.assign(scope, searchValue[0][val[1]]);
                        });

                    });
                    $(elm).addClass("tt-hint");
                }
            }, true);
        }
    };
});
rx.directive('rxTags', function ($compile, rxJson) {
    return {
        restrict: 'A',
        replace: true,
        scope: {
            rxSelected: '=',
            rxSource: '=',
            rxModel:'='
        },
        link: function (scope, element, attrs, drpCtrl) {
            var jsonSelectedSource = [];
            scope.getText = function (_ids) {
                var _splitIds = String(_ids).split(",");
                if (_splitIds.length > 1) {
                    for (var i = 0; i < _splitIds.length; i++) {
                        if (_splitIds[i] != "") {
                            var search = {};
                            if (!angular.isUndefined(attrs.rxInit)) {
                                _splitIds[i] = parseInt(_splitIds[i]);
                            }
                            search[attrs.rxValue] =  _splitIds[i];
                            var json = rxJson.find(scope.rxSource, search)[0];
                            jsonSelectedSource.push(json);
                        }
                    }
                } else {
                    var search = {};
                    if (!angular.isUndefined(attrs.rxInit)) {
                        search[attrs.rxValue] = parseInt(scope.rxSelected);
                    } else {
                        if (!angular.isUndefined(attrs.rxTagDynamic)) {
                            search[attrs.rxValue] = scope.rxModel;
                        } else {
                            search[attrs.rxValue] = scope.rxSelected;
                        }
                        
                    }
                    var json = rxJson.find(scope.rxSource, search)[0];
                    jsonSelectedSource.push(json);
                }
                return jsonSelectedSource;
            }
            scope.setTagFunctions = function () {
                scope.rxSource.isTagValid = function () {
                    return scope.validRxModel;
                }
                scope.rxSource.resetTagSource = function (_source, _selected) {
                    jsonSelectedSource = [];
                    $(element).select2("destroy");
                    scope.rxSource = _source;
                    scope.setTagFunctions();
                    var t = setTimeout(function () {
                        if (!angular.isUndefined(_selected)) {
                            scope.rxModel = _selected;
                            var jsonArray = rxJson.convertToArrary(scope.getText(scope.rxModel), attrs.rxText);
                            element[0].value = jsonArray;
                        }
                        $(element).select2({
                            tags: rxJson.convertToArrary(scope.rxSource, attrs.rxText)
                        });
                        scope.$apply();
                    }, 200)

                }
                scope.rxSource.selectItem = function (_selectedItem) {
                    jsonSelectedSource = [];
                    var _jArrary = rxJson.convertToArrary(scope.rxSource, attrs.rxText);
                    scope.rxModel = _selectedItem;
                    var jsonArray = rxJson.convertToArrary(scope.getText(_selectedItem), attrs.rxText);
                    element[0].value = jsonArray;
                    $(element).select2("destroy");
                    $(element).select2({
                        tags: _jArrary
                    });
                }
                scope.rxSource.selectAll = function () {
                    jsonSelectedSource = [];

                    var _jArrary = rxJson.convertToArrary(scope.rxSource, attrs.rxText);
                    var _jArraryValue = rxJson.convertToArrary(scope.rxSource, attrs.rxValue);
                    for (var i = 0; i < _jArraryValue.length; i++) {
                        scope.rxModel += _jArraryValue[i] + ',';
                    }
                    element[0].value = _jArrary;
                    $(element).select2("destroy");
                    $(element).select2({
                        tags: _jArrary
                    });
                }
                scope.rxSource.deSelectAll = function () {
                    jsonSelectedSource = [];
                    var _jArrary = rxJson.convertToArrary(scope.rxSource, attrs.rxText);
                    element[0].value = [];
                    $(element).select2("destroy");
                    $(element).select2({
                        tags: _jArrary
                    });
                }
                scope.rxSource.resetTag = function () {
                    jsonSelectedSource = [];
                    $(element).select2("val", "");
                    scope.rxModel = '';
                }
            }

            scope.setRxModel = function (_arrayValue) {
                scope.rxModel = '';
                var count = _arrayValue.length - 1;
                for (var i = 0; i < _arrayValue.length; i++) {
                    var search = {};
                    search[attrs.rxText] = _arrayValue[i];
                    var json = rxJson.find(scope.rxSource, search)[0];
                    if (json != undefined) {
                        if (count == i) {
                            scope.rxModel += json[attrs.rxValue];
                        } else {
                            scope.rxModel += json[attrs.rxValue] + ',';
                        }
                    } else {
                        $(element).select2("destroy");
                        if (scope.rxModel != "") {
                            var jsonArray = rxJson.convertToArrary(scope.getText(scope.rxModel), attrs.rxText);
                            element[0].value = jsonArray;
                        } else {
                            element[0].value = "";
                        }
                        var t = setTimeout(function () {
                            $(element).select2({
                                tags: rxJson.convertToArrary(scope.rxSource, attrs.rxText)
                            });
                        }, 100);
                        return;
                    }
                    
                }
                if (!angular.isUndefined(attrs.rxTagDynamic)) {
                    scope.$parent.rxModel = scope.rxModel;
                    scope.$parent.tagSource = scope.rxSource;
                    scope.$parent.$eval(attrs.rxTagsevent);
                }else if (!angular.isUndefined(attrs.rxTagsevent)) {
                    scope.$parent["rxModeltags"] = scope.rxModel;
                    scope.$parent.tagSource = scope.rxSource;
                    scope.$parent.$eval(attrs.rxTagsevent+'(rxModeltags)');
                }
                if (!angular.isUndefined(attrs.rxTagrequired)) {
                    if (scope.rxModel != "") {
                        $("." + attrs.rxText).removeClass("rx-error");
                        $("." + attrs.rxText).addClass("rx-valid");
                    } else {
                        $("." + attrs.rxText).removeClass("rx-valid");
                        $("." + attrs.rxText).addClass("rx-error");
                    }

                }
            }
            scope.$watch('rxSource', function (v) {
                if (!angular.isUndefined(v)) {
                    if (angular.isUndefined(attrs.rxSelected)) {
                        if (!angular.isUndefined(attrs.rxTagrequired)) {
                            $(element).addClass(attrs.rxText);
                            $("." + attrs.rxText).addClass("rx-error");
                        }
                        $(element).css({ "display": "normal" });
                        if (!angular.isUndefined(attrs.rxTagDynamic)) {
                            //scope.rxModel == undefined;
                            if (scope.rxModel != '' && scope.rxModel != undefined) {
                                if (scope.$parent[attrs.showTag]) {
                                    if (scope.$parent[attrs.modeName]) {
                                        var jsonArray = rxJson.convertToArrary(scope.getText(scope.rxModel), attrs.rxText);
                                        element[0].value = jsonArray;
                                        $(element).select2({
                                            tags: rxJson.convertToArrary(scope.rxSource, attrs.rxText)
                                        });
                                    } else {
                                        if (element[0].parentNode.firstChild.id != "") {
                                            $(element[0].parentNode.firstChild).remove();
                                            var jsonArray = rxJson.convertToArrary(scope.getText(scope.rxModel), attrs.rxText);
                                            element[0].value = jsonArray;
                                        } else {
                                            scope.rxModel = undefined;
                                            
                                        }
                                        $(element).select2({
                                            tags: rxJson.convertToArrary(scope.rxSource, attrs.rxText)
                                        });
                                    }
                                    
                                } else {
                                    $(element[0].parentNode.firstChild).remove();
                                }
                                
                            } else {
                                if (scope.$parent[attrs.showTag]) {
                                    if (element[0].parentNode.firstChild.id != undefined && element[0].parentNode.firstChild.id != "") {
                                        $(element[0].parentNode.firstChild).remove();
                                    }
                                    $(element).select2({
                                        tags: rxJson.convertToArrary(scope.rxSource, attrs.rxText)
                                    });
                                } else {
                                    if (element[0].parentNode.firstChild.id != undefined && element[0].parentNode.firstChild.id != "") {
                                        $(element[0].parentNode.firstChild).remove();
                                    }
                                }
                            }
                        } else {
                            $(element).select2({
                                tags: rxJson.convertToArrary(scope.rxSource, attrs.rxText)
                            });
                        }
                        
                        $(element).on("change", function (e) {
                            scope.setRxModel(e.val);
                            scope.$apply();
                        });
                        scope.setTagFunctions();
                    }

                }
            }, true);
            scope.$watch('rxSelected', function (v) {
                if (!angular.isUndefined(v)) {
                    if (!angular.isUndefined(attrs.rxSource)) {
                        if (!angular.isUndefined(attrs.rxTagrequired)) {
                            $(element).addClass(attrs.rxText);
                            $("." + attrs.rxText).addClass("rx-error");
                        }
                        if (scope.rxSelected != "") {
                            var jsonArray = rxJson.convertToArrary(scope.getText(v), attrs.rxText);
                            scope.setRxModel(jsonArray);
                            element[0].value = jsonArray;
                            $(element).select2({ tags: rxJson.convertToArrary(scope.rxSource, attrs.rxText) });
                            $(element).on("change", function (e) {
                                scope.setRxModel(e.val);
                                scope.$apply();
                            });
                        } else {
                            $(element).select2({ tags: rxJson.convertToArrary(scope.rxSource, attrs.rxText) });
                            $(element).on("change", function (e) {
                                scope.setRxModel(e.val);
                                scope.$apply();
                            });
                        }
                        scope.setTagFunctions();
                    }
                }
            }, true);
        },
        replace: true
    };
});

rx.directive('rxTree', function () {
    return {
        restrict: 'E',
        scope: {
            rxSource: '=',
        },
        link: function (scope, elm, attrs) {
            var treeColumnArray = [];
            function setProperties() {
                scope.rxSource["addnewnode"] = function (_object) {
                    $(elm[0]).jstree("create", "#" + $.jstree._focused().get_selected().attr('id'), "last", { attr: { id: _object[treeColumnArray[0]] }, data: _object[treeColumnArray[2]] }, false, true);
                };
                };
            scope.$watch('rxSource', function (_source) {
                if (!angular.isUndefined(_source)) {
                    var count = 0;
                    for (var col in _source.treeObject[0]) {
                        if (count > 2) {
                            break;
                        }
                        treeColumnArray.push(col);
                        count++;
                    }
                    setProperties();
                    var xmlString = "<root>";
                    var json = _source.treeObject;
                    for (var i = 0; i < json.length; i++) {
                        if (json[i][treeColumnArray[1]] != 0) {
                            xmlString += "<item id='" + json[i][treeColumnArray[0]] + "' parent_id='" + json[i][treeColumnArray[1]] + "'><content><name><![CDATA[" + json[i][treeColumnArray[2]] + "]]></name></content></item>";
                        } else {
                            xmlString += "<item id='" + json[i][treeColumnArray[0]] + "'><content><name><![CDATA[" + json[i][treeColumnArray[2]] + "]]></name></content></item>";
                        }
                    }
                    xmlString += "</root>";
                    $(elm[0]).jstree({
                        "xml_data": {
                            "data": xmlString
                        },
                        "plugins": ["themes", "xml_data", "ui","crrm" ]
                    }).bind("select_node.jstree", function (e, data) {
                        if (!angular.isUndefined(_source.callbacks.select)) {
                            scope.$parent["treeid"] = data.rslt.obj[0].id;
                            scope.$parent.$eval(_source.callbacks.select+"(treeid)");
                        }
                    });
                }
            });
        }
    };
});

rx.directive('rxNumber', ['$parse', function ($parse) {
    return {
        restrict: 'A', require: "ngModel",
        link: function (scope, elm, attrs, ngModel) {
            var isWhole_re = /^\s*\d+\s*$/;
            var parsed = $parse(attrs.ngModel);
            function isWhole(s) {
                     return String(s).search(isWhole_re) != -1
            }
            $(elm).keyup(function () {
                if (!isWhole(this.value)) {
                    if (this.value != "") {
                        var elementValue = this.value;
                        var lengthCount = this.value.length - 1;
                        var _str = ''
                        for (var i = 0; i < lengthCount; i++) {
                            if (!angular.isUndefined(elementValue)) {
                                _str += elementValue.charAt(i);
                            }
                        }
                        this.value = parseInt(_str);
                        parsed.assign(scope, parseInt(_str));
                        scope.$apply();
                    }
                    
                }
            });
            $(elm).keydown(function () {
                if (!isWhole(this.value)) {
                    if (this.value != "") {
                        var elementValue = this.value;
                        var lengthCount = this.value.length - 1;
                        var _str = ''
                        for (var i = 0; i < lengthCount; i++) {
                            if (!angular.isUndefined(elementValue)) {
                                if (!angular.isUndefined(elementValue)) {
                                    _str += elementValue.charAt(i);
                                }
                            }
                        }
                        this.value = parseInt(_str);
                        parsed.assign(scope, parseInt(_str));
                        scope.$apply();
                    }
                }
            });
            $(elm).blur(function () {
                if (!isWhole(this.value)) {
                    if (this.value != "") {
                        var elementValue = this.value;
                        var lengthCount = this.value.length - 1;
                        var _str = ''
                        for (var i = 0; i < lengthCount; i++) {
                            if (!angular.isUndefined(elementValue)) {
                                _str += elementValue.charAt(i);
                            }
                        }
                        this.value = parseInt(_str);
                        parsed.assign(scope, parseInt(_str));
                        scope.$apply();
                    }
                }
            });
            //var parsed = $parse(attrs.ngModel);
            //function checkvalue() {
            //    scope.$apply(function () {
            //        var isWhole_re = /^\s*\d+\s*$/;
            //        function isWhole(s) {
            //            return String(s).search(isWhole_re) != -1
            //        }
        }
    }
}]);

rx.directive('rxPopup', ["$compile", "rxJson", 'rxPopupData', function ($compile, rxJson, rxPopupData) {
    return {
        restrict: 'E',
        scope: {
            rxSource: '=',
        },
        link: function ($scope, elm, attrs, ngModel) {
            $scope.setFunctions = function () {
                $scope.rxSource.showPopup = function (_url, _cssClass) {
                    $scope.popupTemplateSrc = { src: _url, popupCss: _cssClass };
                    $('#popupTemplaterxPopup' + uniqueNumber).modal({
                        backdrop: 'static',
                        keyboard: false
                    });
                    $('#popupTemplaterxPopup' + uniqueNumber).modal('show');
                };
                $scope.rxSource.setObject = function (name) {
                    rxPopupData.setObject($scope.rxSource, name);
                }
                $scope.rxSource.hidePopup = function () {
                    $('#popupTemplaterxPopup' + uniqueNumber).modal('hide');
                    $(".modal-backdrop").removeClass("in");
                    $(".modal-backdrop").addClass("displayNone");
                };
                $scope.rxSource.showSubPopup = function (_css, _src) {
                    //$(".popover").remove();
                    $('#popupTemplaterxPopup' + uniqueNumber).addClass("displayNone");
                    $scope.popupTemplate = { popupCss: _css }
                    $scope.subPopupTemplateSrc = { src: _src };
                    if (!$('#popupTemplaterxsubpopup' + uniqueNumber).hasClass("in")) {
                        $('#popupTemplaterxsubpopup' + uniqueNumber).modal({
                            backdrop: 'static',
                            keyboard: false
                        });
                        $('#popupTemplaterxsubpopup' + uniqueNumber).modal('show');
                        $('#popupTemplaterxsubpopup' + uniqueNumber).addClass("in");
                        $('#popupTemplaterxsubpopup' + uniqueNumber).removeClass("displayNone");
                    } else {
                        $('#popupTemplaterxsubpopup' + uniqueNumber).removeClass("displayNone");
                    }

                }
                $scope.rxSource.hideSubPopup = function () {
                    $('#popupTemplaterxPopup' + uniqueNumber).removeClass("displayNone");
                    $scope.subPopupTemplateSrc = { src: 'Scripts/lib/rxapp/template/blank.html' };
                    $('#popupTemplaterxsubpopup' + uniqueNumber).addClass("displayNone");
                };
                if (!angular.isUndefined(attrs.name)) {
                    rxPopupData.setObject($scope.rxSource, attrs.name);
                }
            }
            var uniqueNumber = 0;
            var initialize = function () {
                uniqueNumber = rxJson.uniqueNumber();
                var _element = $("#popupTemplaterxPopup" + uniqueNumber);
                $scope.setFunctions();
                $scope.popupTemplateSrc = { src: 'Scripts/lib/rxapp/template/blank.html', popupCss: '' };

                //if(
                if (angular.isUndefined(_element[0])) {
                    var htmlDesign = '<div  id="popupTemplaterxPopup'+ uniqueNumber+'" class="modal fade {{popupTemplateSrc.popupCss}}"  tabindex="-1" role="dialog" aria-labelledby="popupTemplateLabel" aria-hidden="true">' +
                           '<div ng-include src="popupTemplateSrc.src"></div>' +
                                             '</div>';
                    htmlDesign += '<div  id="popupTemplaterxsubpopup' + uniqueNumber + '" class="modal fade {{popupTemplate.popupCss}} showpopup"  tabindex="-1" role="dialog" aria-labelledby="popupTemplateLabel" aria-hidden="true">' +
                         '<div ng-include src="subPopupTemplateSrc.src"></div>' +
                                           '</div>';
                    $("#bodyElement").append($compile(htmlDesign)($scope));
                }
                $('#popupTemplaterxPopup' + uniqueNumber).on('hidden', function() {
                    $scope.$apply(function() { $scope.popupTemplateSrc = { src: 'Scripts/lib/rxapp/template/blank.html', popupCss: '' }; });
                });

                $('#popupTemplaterxsubpopup' + uniqueNumber).on('hidden', function() {
                    $scope.$apply(function() { $scope.subPopupTemplateSrc = { src: 'Scripts/lib/rxapp/template/blank.html', popupCss: '' }; });
                });
            }
            initialize();
        }
    };
}]);

rx.directive('rxTime', ['$parse', function ($parse) {
    return {
        restrict: 'A', require: "ngModel",
        link: function (scope, elm, attrs, ngModel) {
            var isDataChanged = false;
            scope.$watch(attrs.ngModel, function (v) {
                if (!angular.isUndefined(v)) {
                    if (!isDataChanged) {
                        isDataChanged = true;
                        var currentValue = v;
                        var count = 0;
                        var _str = '';
                        for (var c in currentValue) {
                            if (count < 5) {
                                _str += currentValue.charAt(c);
                            }
                            count++;
                        }
                        parsed.assign(scope, _str);
                    }
                }
            }, true);

            var parsed = $parse(attrs.ngModel);
            function checkvalue() {
                scope.$apply(function () {
                    var isWhole_re = /^\s*\d+\s*$/;
                    function isWhole(s) {
                        return String(s).search(isWhole_re) != -1
                    }
                    var a = isWhole(elm[0].value.replace(":", ""));
                    if (a) {
                        var _elementValue = elm[0].value.replace(":", "");
                        if (_elementValue.length == 2) {
                            if (parseInt(_elementValue) > 23) {
                                elm[0].value = 23;
                                parsed.assign(scope, "23");
                                return;
                            }
                        }
                        if (_elementValue.length == 4) {
                            var split = elm[0].value.split(":");
                            if (parseInt(split[1]) > 59) {
                                elm[0].value = elm[0].value.replace(split[1], "59");
                                parsed.assign(scope, elm[0].value);
                                return;
                            }
                        }
                        var _str = '', count = 0;
                        if (_elementValue.length > 2) {
                            for (var c in _elementValue) {
                                if (count == 2) {
                                    _str += ":" + _elementValue.charAt(c);
                                } else {
                                    _str += _elementValue.charAt(c);
                                }
                                if (count == 3) {
                                    break;
                                }
                                count++;

                                //if (_str.length == 4) {
                                //    var split = _str.split(":");
                                //    var _st = '';
                                //    if (parseInt(split[0]) > 23) {
                                //        _str = _str.replace(split[1], "23");
                                //    }
                                //    if (parseInt(split[1]) > 59) {
                                //        _str = _str.replace(split[1], "59");
                                //    }
                                //    parsed.assign(scope, _str);
                                //}
                            }
                        } else {
                            _str = elm[0].value.replace(":", "");
                        }

                        parsed.assign(scope, _str);
                    } else {
                        elm[0].value = "";
                        parsed.assign(scope, "");
                    }
                });
            }
            $(elm).keydown(function () {
                checkvalue();
            });

            $(elm).blur(function () {
                var splitText = elm[0].value.split(":");
                var _str = elm[0].value.replace(":", "");
                var splt = elm[0].value.split(":");
                if (parseInt(splitText[0]) > 24) {
                    _str = "00:00";
                    scope.$apply(function () {
                        parsed.assign(scope, _str);
                    });
                } else {
                    if (_str.length < 4) {
                        if (_str.length == 1) {
                            _str = "0" + _str + ":00";
                        } else if (_str.length == 2) {
                            if (splt[0] > 23) {
                                _str = "23:00";
                            } else {
                                _str = _str + ":00";
                            }
                        } else if (_str.length == 3) {
                            if (splt[1] < 6) {
                                var s = (splt[0] > 23) ? "23" : splt[0];
                                _str = s + ":" + splt[1] + "0";
                            } else {
                                _str = splt[0] + ":00";
                            }
                        }
                        scope.$apply(function () {
                            parsed.assign(scope, _str);
                        });
                    }

                }

            });

            $(elm).keyup(function () {
                checkvalue();
            });
        }
    };
}]); rx.directive('rxEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.rxEnter);
                });
            }
        });
    };
});

rx.filter('rxDropdownfilter',['rxJson', function (rxJson) {
    return function (json, search) {
        var key = '';
        var value = '';
        for (var col in search) {
            key = col;
            value = search[col];
        }
       return rxJson.filter(key, value, json);
    };
}]);
