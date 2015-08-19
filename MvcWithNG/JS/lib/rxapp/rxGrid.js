/*
 rxGridJS v0.2
*/
rx.directive('rxGrid', function ($compile, rxJson, rxData, request, response, rxLanguage, cacheData, cookieconfig) {
    return {
        restrict: 'E',
        scope: {
            'gridSource': '=',
            'subGrid': '='
        },
        controller: function ($scope, $element) {

            var rxgs = $scope.rxgs = [], headerRows = 0, attrs = '';
            rxGrid = '';
            gridTable = '',
            gridHeader = false,
            gridCss = false,
            gridMaster = false,
            masterTableView = false,
            allowMultipleColumSorting = false,
            conditionalRowCss = false,
            defaultSortColumn = '',
            pagingDropdown = false,
            pagingDropdownSource = false,
            gridEvents = false,
            dataControlChanged = '',
            pageSize = false,
            dataSearch = false,
            gridName = '';
            tableheadingHtml = '',
            tableBodyHtml = '<tbody>',
            tableRowHtml = ''
            tableDataHtml = '',
            tableFooterHtml = '',
            divHeaderRow = '',
            pagingHtmlArea = '',
            searchHtmlArea = '',
            gridHeaderHtml = '',
            selectedSearchColumn = 'All',
            primaryKey = '';
            searchColumnJson = {},
            searchBoxArray = [],
            searchArrayColumns = [],
            rxFilterJsonArray = [],
            copySearchBoxArray = [],
            gridOperations = '',
            detailKeyField = '',
            showFooterPagging = true,
            masterTableViewColumnsLenght = 0,
            isPopupEnabled = false;
            isRemovedSearch = false,
            firstTimeSearch = true,
            removedFirstTimeSearch = true,
            autoSearch = false,
            allowColumnSearch = false,
            multiLanguageHeader = false,
            allowSubGrid = false,
            showHeader = true,
            subGridOpenIcon = '',
            subGridCloseIcon = '',
            subGrid = false,
            conditionDropdownArray = [],
            isConditionDropdown = false,
            conditionFileUploadArray = [],
            isConditionFileUpload = false,
            isFilter = false;
            var createCustomColumn = false;
            $scope.SortColumnName = '';
            $scope.sortOrder = false;
            $scope.pageSize = 10;
            $scope.currentPage = 0;
            $scope.tableHeadings = [];
            $scope.columnSearch = [];
            $scope.modelPopup = [];
            $scope.popupTemplate = {};
            $scope.popupTemplateSrc = {};
            $scope.UpdateJsonArray = {};
            $scope.jsonObjectNames = [];
            $scope.UpdateDataDropdownObject = [];
            $scope.rowConditionalActionIcon = { display: 'none-class' };
            $scope.UpdateColumnName = "All";
            $scope.search = {};
            $scope.drpSearchColumn = "$";
            $scope.subGridRowClass = '';


            $scope.setGridHeader = function () {
                //$scope.preInitializeGridVarialbles()
             //   $scope.preInitializeGridVarialbles();
                if (gridHeader) {
                    var _rowCss = !angular.isUndefined(rxgs.gridHeader.rowCss) ? rxgs.gridHeader.rowCss : '';
                    gridHeaderHtml = '<div class="row-fluid ' + _rowCss + '">';
                    angular.forEach(rxgs.gridHeader.row, function (rowColumn) {
                        var _columnCss = (!angular.isUndefined(rowColumn.columnCss)) ? rowColumn.columnCss : '';
                        gridHeaderHtml += '<div class="' + _columnCss + '">' + $scope.getControlType(rowColumn) + '</div>';
                    });
                    gridHeaderHtml += '</div>';
                }
            }

            $scope.getControlType = function (rowColumn) {
                //$scope.preInitializeGridVarialbles();
                switch (rowColumn.controlType) {
                    case "button":
                        var _iconCss = !angular.isUndefined(rowColumn.iconCss) ? rowColumn.iconCss : '',
                            _buttonCss = !angular.isUndefined(rowColumn.buttonCss) ? rowColumn.buttonCss : '',
                            _text = !angular.isUndefined(rowColumn.text) ? rowColumn.text : '',
                            _eventName = '',
                            _eventString = '',
                            _indexCount = -1;
                        if (!angular.isUndefined(rowColumn.templatePath)) {
                            _indexCount = $scope.modelPopup.length;
                            $scope.modelPopup.push({ src: !angular.isUndefined(rowColumn.templatePath) ? rowColumn.templatePath : '', popupCss: !angular.isUndefined(rowColumn.popupCss) ? rowColumn.popupCss : '' });
                            _eventName = "_rxGrid";
                        }
                        else {
                            _eventName = rowColumn.event;
                        }
                        return '<button class="' + _buttonCss + '" ng-click=\controlTypePopupEvent(' + _indexCount + ',"' + _eventName + '")\ type="button"><i class="' + _iconCss + '"></i>' + _text + '</button>';
                        break;
                    case "hyperlink":
                        var _iconCss = !angular.isUndefined(rowColumn.iconCss) ? rowColumn.iconCss : '',
                            _hyperlinkCss = !angular.isUndefined(rowColumn.hyperlinkCss) ? rowColumn.hyperlinkCss : '',
                            _text = !angular.isUndefined(rowColumn.text) ? rowColumn.text : '',
                            _navigateUrl = !angular.isUndefined(rowColumn.navigateUrl) ? rowColumn.navigateUrl : '';
                        return '<a href="' + _navigateUrl + '" class="' + _hyperlinkCss + '" ><i class="' + _iconCss + '"></i>' + _text + '</a>';
                        break;
                    case "updateButton":
                        var _iconCss = !angular.isUndefined(rowColumn.iconCss) ? rowColumn.iconCss : '',
                            _buttonCss = !angular.isUndefined(rowColumn.buttonCss) ? rowColumn.buttonCss : '',
                            _text = !angular.isUndefined(rowColumn.text) ? rowColumn.text : '',
                            _dropdownShow = !angular.isUndefined(rowColumn.dropdownShow) ? rowColumn.dropdownShow : false,
                            _dropdownCss = !angular.isUndefined(rowColumn.dropdownCss) ? rowColumn.dropdownCss : '',
                            _isSubGridData = !angular.isUndefined(rowColumn.isSubGridData) ? rowColumn.isSubGridData : '',
                            _controlString = '',
                                _disabledButtonString = '';
                        if (_isSubGridData) {
                            _disabledButtonString = "disabledWithSubgridUpdateButton()";
                        }
                        else {
                            _disabledButtonString = "disabledUpdateButton()";
                        }
                        if (_dropdownShow) {
                            _controlString = '<select class="' + _dropdownCss + '" ng-model="UpdateColumnName" ng-options="udo.objectName as udo.UpdateColumnText for udo in  UpdateDataDropdownObject" ></select>';
                        }
                        return '<button class="' + _buttonCss + '" ng-disabled="!' + _disabledButtonString + '" ng-click=\'updateGridControlData("' + rowColumn.event + '")\' type="button"><i class="' + _iconCss + '"></i>' + _text + '</button>' + _controlString;
                        break;

                    case "subGridUpdateButton":
                        var _iconCss = !angular.isUndefined(rowColumn.iconCss) ? rowColumn.iconCss : '',
                            _buttonCss = !angular.isUndefined(rowColumn.buttonCss) ? rowColumn.buttonCss : '',
                            _text = !angular.isUndefined(rowColumn.text) ? rowColumn.text : '',
                            _dropdownShow = !angular.isUndefined(rowColumn.dropdownShow) ? rowColumn.dropdownShow : false,
                            _dropdownCss = !angular.isUndefined(rowColumn.dropdownCss) ? rowColumn.dropdownCss : '',
                            _controlString = '';
                        return '<button class="' + _buttonCss + '" ng-disabled="!disabledSubGridUpdateButton()" ng-click=\'updateSubGridControlData("' + rowColumn.event + '")\' type="button"><i class="' + _iconCss + '"></i>' + _text + '</button>' + _controlString;
                        break;
                    case "searchColumnDropdown":
                        var _dropdownCss = !angular.isUndefined(rowColumn.dropdownCss) ? rowColumn.dropdownCss : '',
                            _dataField = !angular.isUndefined(rowColumn.dataField) ? rowColumn.dataField : '',
                            _dataText = !angular.isUndefined(rowColumn.dataText) ? rowColumn.dataText : '',
                            _soureObjectName = gridName + _dataText + 's';
                        $scope[_soureObjectName] = !angular.isUndefined(rowColumn.source) ? rowColumn.source : [];
                        $scope.search[_dataField] = !angular.isUndefined(rowColumn.selected) ? rowColumn.selected : 0;
                        return '<select class="' + _dropdownCss + '" ng-change=\changeSearchDropDownColumn("' + _dataField + '")\ ng-model="search.' + _dataField + '" ng-options="sco.' + _dataField + ' as sco.' + _dataText + ' for sco in  ' + _soureObjectName + '" >' +
                            '<option value="">All</option>'+
                            '</select>';
                        break;
                }
            }

            $scope.changeSearchDropDownColumn = function (dt) {
                if ($scope.search[dt] == "" || $scope.search[dt] == null) {
                    $scope.search = { $: '' };
                }
                if ($scope.subGridRowClass != "") {
                    $("." + $scope.subGridRowClass).remove();
                }
            }

            $scope.controlTypePopupEvent = function (_indexCount, _eventName) {
              //  $scope.preInitializeGridVarialbles();
                rxData.setFilteredJsonArray($scope.filteredRxgs);
                rxData.setJsonArray($scope.rxgs.gridObject);
                if (_eventName == "_rxGrid") {
                    $scope.popupTemplateSrc = $scope.modelPopup[_indexCount];
                    $scope.popupTemplate = { popupCss: $scope.modelPopup[_indexCount].popupCss }
                    $('#popupTemplate').modal('show');
                } else {
                    $scope.$parent.$eval(_eventName + '()');
                }
            }

            $scope.setHeaderGrid = function () {

               // $scope.preInitializeGridVarialbles();
                pagingHtmlArea = (pagingDropdown) ? $scope.setPaggingDropdown() : '';
                searchHtmlArea = (dataSearch) ? $scope.setSearchBox() : '';
                divHeaderRow = (pagingHtmlArea != '') ? '<div class="row-fluid"><div class="span6">' + pagingHtmlArea + '</div>' : '<div class="row-fluid"><div class="span6"></div>';
                divHeaderRow += (searchHtmlArea != '') ? '<div class="span6 pull-right">' + searchHtmlArea + '</div>' : '<div class="row-fluid"><div class="span6"></div>';
                divHeaderRow += '</div>';
                divHeaderRow = (!pagingDropdown && !dataSearch) ? '' : divHeaderRow;
            }

            $scope.setPaggingDropdown = function () {
                //$scope.preInitializeGridVarialbles();
                $scope.dropDownObject = (pagingDropdownSource) ? rxgs.gridMaster.pagingDropdownSource : [{ size: 10 }, { size: 20 }, { size: 30 }, { size: 40 }, { size: 50 }, { size: 100 }, { size: 200 }, { size: 500 }];
                var _dropDownTemplate = '<div class="span12">' +
                                        '<div class="span2">' +
                                        '<select class="span12" ng-model="pagging" ng-change="changePagging(pagging)" >' +
                                        '<option ng-repeat="do in dropDownObject" value="{{do.size}}" ng-selected="do.size == pageSize">{{do.size}}</option>' +
                                        '</select>' +
                                        '</div><div class="span10" >records per page</div>' +
                                        '</div>';
                return _dropDownTemplate;

            }

            $scope.setSearchBox = function () {
              //  $scope.preInitializeGridVarialbles();
                var _searchBoxTemplate = '',
                    _columnSearchDropDown = (allowColumnSearch) ? $scope._CreateColumnSearchDropDown() : '';
                if (autoSearch) {
                    _searchBoxTemplate = '<div class="span4 offset4"><span class="visible-phone">Select Search Column : </span>' + _columnSearchDropDown + '</div><div class="span4"><span class="visible-phone">Search : </span>' +
                                         '<input type="text" placeholder="Search Data..." class="span12" ng-change="changeSearchText(search[drpSearchColumn])" ng-model="search[drpSearchColumn]" />' +
                                         '</div>';
                }
                else {

                    _searchBoxTemplate = '<div class="dataTables_filter">' +
                                         '<label>' + _columnSearchDropDown + 'Search : ' +
                                         '<input id="searchGrid" type="text" placeholder="Search Data..." style="width: 200px; " ng-model="search.$" />' +
                                         '</label>' +
                                         '</div>';
                }
                return _searchBoxTemplate;
            }

            $scope.setSearchBoxTags = function (key) {
               // $scope.preInitializeGridVarialbles();
                searchArrayColumns.push(key);
                var _searchArray = rxJson.convertToArrary($scope.rxgs.gridObject, key);
                angular.forEach(_searchArray, function (v) {
                    searchBoxArray.push(String(v).toLowerCase().trim());
                });
                copySearchBoxArray = searchBoxArray;
            }

            $scope.resetSearchBoxTags = function (jsonArray) {
               // $scope.preInitializeGridVarialbles();
                searchBoxArray = [];
                for (var i = 0; i < searchArrayColumns.length; i++) {
                    var _searchArray = rxJson.convertToArrary(jsonArray, searchArrayColumns[i]);
                    angular.forEach(_searchArray, function (v) {
                        searchBoxArray.push(String(v).toLowerCase().trim());
                    });
                }
                searchBoxArray = rxJson.unique(searchBoxArray);
                $('#searchGrid').select2("destroy");
                $('#searchGrid').select2({ tags: searchBoxArray });
            }

            $scope.resetColumnSearchBoxTags = function (jsonArray, _searchColumnName) {
               // $scope.preInitializeGridVarialbles();
                searchBoxArray = [];
                var _searchArray = rxJson.convertToArrary(jsonArray, _searchColumnName);
                angular.forEach(_searchArray, function (v) {
                    searchBoxArray.push(String(v).toLowerCase().trim());
                });
                searchBoxArray = rxJson.unique(searchBoxArray);
                $('#searchGrid').select2("destroy");
                $('#searchGrid').select2({ tags: searchBoxArray });
            }

            $scope.quickResetSearchBoxTags = function () {
                //$scope.preInitializeGridVarialbles();
                $('#searchGrid').select2("destroy");
                $('#searchGrid').select2({ tags: rxJson.unique(copySearchBoxArray) });
            };

            $scope.searchBoxFilter = function (searchValues) {
                //$scope.preInitializeGridVarialbles();
                $scope.currentPage = 0;
                var _searchValueLength = searchValues.length;
                if (_searchValueLength != 0) {
                    angular.forEach(searchValues, function (searchValue) {
                        if (selectedSearchColumn != "All") {
                            searchColumnJson[selectedSearchColumn] = searchValue;
                            searchValue = searchColumnJson;
                            $scope.ColumnSearchJson(searchColumnJson, _searchValueLength);
                            return;
                        }
                        if (isRemovedSearch) {
                            if (removedFirstTimeSearch) {
                                removedFirstTimeSearch = false;
                                $scope.searchFromObject(searchValue, _searchValueLength, false);
                            }
                            else {
                                rxFilterJsonArray = rxJson.advanceFilter(rxFilterJsonArray, searchValue);
                            }
                        }
                        else if (firstTimeSearch) {
                            firstTimeSearch = false;
                            $scope.searchFromObject(searchValue, _searchValueLength, false);
                        }
                        else {
                            rxFilterJsonArray = rxJson.advanceFilter(rxFilterJsonArray, searchValue);
                        }
                    });
                    if (_searchValueLength != 1 && _searchValueLength != 0) {
                        $scope.resetSearchBoxTags(rxFilterJsonArray);
                        $scope.filteredRxgs = rxFilterJsonArray;
                    }
                }
                else {
                    isFilter = false;
                    firstTimeSearch = true;
                    $scope.quickResetSearchBoxTags();
                    $scope.filteredRxgs = $scope.rxgs.gridObject;
                }
            }

            $scope.ColumnSearchJson = function (_searchColumnJson, _arraryLength) {
              //  $scope.preInitializeGridVarialbles();
                $scope.searchFromObject(_searchColumnJson, _arraryLength, true);
            }

            $scope.searchFromObject = function (searchValue, _arraryLength, columnSearchFlag) {
                //$scope.preInitializeGridVarialbles();
                rxFilterJsonArray = rxJson.advanceFilter($scope.rxgs.gridObject, searchValue);
                if (columnSearchFlag) {
                    $scope.resetColumnSearchBoxTags($scope.rxgs.gridObject, selectedSearchColumn);
                    $scope.filteredRxgs = rxFilterJsonArray;
                }
                else if (_arraryLength == 1) {
                    $scope.resetSearchBoxTags(rxFilterJsonArray);
                    $scope.filteredRxgs = rxFilterJsonArray;
                }
            }

            $scope._CreateColumnSearchDropDown = function () {
                //$scope.preInitializeGridVarialbles();
                var _columnType = '',
                    _dataField = '',
                    _headerText = '',
                    _columnSearch = false,
                    _addRowDropdown = true;
                for (var i = 0; i < $scope.gridSource.masterTableView.columns.length; i++) {
                    _columnType = $scope.gridSource.masterTableView.columns[i].columnType,
                    _columnSearch = (!angular.isUndefined($scope.gridSource.masterTableView.columns[i].columnSearch)) ? $scope.gridSource.masterTableView.columns[i].columnSearch : false;
                    if (_columnSearch) {
                        if (_columnType == "hyperLinkColumn" || _columnType == "dropdownColumn" || _columnType == "textColumn" || _columnType == "customNumberColumn" || _columnType == "numberColumn") {
                            if (_addRowDropdown) {
                                $scope.columnSearch.push({ dataField: "$", headerText: "All" });
                                _addRowDropdown = false;
                            }
                            _dataField = $scope.gridSource.masterTableView.columns[i].dataField;
                            _headerText = $scope.gridSource.masterTableView.columns[i].headerText;
                            $scope.columnSearch.push({ dataField: _dataField, headerText: _headerText });
                        }
                    }
                }
                return '<select ng-model="drpSearchColumn" class="span12" ng-change="changeSearchColumn()" ng-options="cs.dataField as cs.headerText for cs in columnSearch" >' +
                                        '</select>';
            }

            $scope.changePagging = function (changeValue) {
                if ($scope.subGridRowClass != "") {
                    $("." + $scope.subGridRowClass).remove();
                }
                response.cookies(gridName).add(changeValue, 30);
                $scope.currentPage = 0;
                $scope.pageSize = parseInt(changeValue);
                cacheData.save($scope.gridName + cookieconfig.get('lid') + "PageSize", $scope.pageSize);
            }

            $scope.changeSearchColumn = function () {
                                selectedSearchColumn = $scope.drpSearchColumn;
                $scope.resetColumnSearchBoxTags($scope.rxgs.gridObject, selectedSearchColumn);
            }

            $scope.changeSearchText = function (_searchText) {
                if ($scope.subGridRowClass != "") {
                    $("." + $scope.subGridRowClass).remove();
                }
                //$scope.preInitializeGridVarialbles();
                if (_searchText != "") {
                    $(".subgrid4").remove();
                    $scope.currentPage = 0;
                    rxData.setFilteredFalse();
                } else {
                    rxData.setFilteredTrue();
                }
            }


            $scope.preInitializeGridVarialbles = function () {
                $scope.gridSource["setDataEvent"] = function (objectSource) {
                    $scope.gridSource.gridObject = objectSource;
                    rxgs = $scope.rxgs = $scope.gridSource;
                }


                gridHeader = !angular.isUndefined(rxgs.gridHeader) ? true : false;
                gridCss = !angular.isUndefined(rxgs.gridCss) ? true : false;
                gridMaster = !angular.isUndefined(rxgs.gridMaster) ? true : false;
                masterTableView = !angular.isUndefined(rxgs.masterTableView) ? true : false;
                gridEvents = !angular.isUndefined(rxgs.gridEvents) ? true : false;
                if (gridMaster) {
                    $scope.pageSize = (pageSize) ? rxgs.gridMaster.pageSize : 10;
                    allowMultipleColumSorting = !angular.isUndefined(rxgs.gridMaster.allowMultipleColumnSorting) ? rxgs.gridMaster.allowMultipleColumnSorting : false;
                    defaultSortColumn = !angular.isUndefined(rxgs.gridMaster.defaultSortColumn) ? rxgs.gridMaster.defaultSortColumn : '';
                    subGrid = !angular.isUndefined(rxgs.gridMaster.subGrid) ? rxgs.gridMaster.subGrid : '';
                    pagingDropdown = !angular.isUndefined(rxgs.gridMaster.pagingDropdown) ? rxgs.gridMaster.pagingDropdown : false;
                    pagingDropdownSource = !angular.isUndefined(rxgs.gridMaster.pagingDropdownSource) ? true : false;
                    pageSize = !angular.isUndefined(rxgs.gridMaster.pageSize) ? true : false;
                    dataSearch = !angular.isUndefined(rxgs.gridMaster.dataSearch) ? rxgs.gridMaster.dataSearch : false;
                    autoSearch = !angular.isUndefined(rxgs.gridMaster.autoSearch) ? rxgs.gridMaster.autoSearch : false;
                    allowColumnSearch = !angular.isUndefined(rxgs.gridMaster.allowColumnSearch) ? rxgs.gridMaster.allowColumnSearch : false;
                    primaryKey = !angular.isUndefined(rxgs.gridMaster.primaryKey) ? rxgs.gridMaster.primaryKey : '';
                    gridName = !angular.isUndefined(rxgs.gridMaster.gridName) ? rxgs.gridMaster.gridName : '';
                    allowSubGrid = !angular.isUndefined(rxgs.gridMaster.allowSubGrid) ? rxgs.gridMaster.allowSubGrid : '';
                    multiLanguageHeader = !angular.isUndefined(rxgs.gridMaster.multiLanguageHeader) ? rxgs.gridMaster.multiLanguageHeader : false;
                    showHeader = !angular.isUndefined(rxgs.gridMaster.showHeader) ? rxgs.gridMaster.showHeader : true;
                    showFooterPagging = !angular.isUndefined(rxgs.gridMaster.showFooterPagging) ? rxgs.gridMaster.showFooterPagging : true;
                    if (gridName == '') {
                        return;
                    } else {
                        if (!angular.isUndefined(request.cookies(gridName).value)) {
                            $scope.pageSize = parseInt(request.cookies(gridName).value);
                        }
                    }
                }
                if (gridEvents) {
                    dataControlChanged = !angular.isUndefined(rxgs.gridEvents.dataControlChanged) ? rxgs.gridEvents.dataControlChanged : '';
                }
                if (gridCss) {
                    conditionalRowCss = !angular.isUndefined(rxgs.gridCss.conditionalRowCss) ? true : false;
                }
            }

            $scope.initializeGridVariables = function () {
                $scope.gridSource["setDataEvent"] = function () {
                    rxgs = $scope.rxgs = $scope.gridSource;
                }
                $scope.gridSource["rowsChecked"] = function (columnName, isCheckedColumn) {
                    for (var i = 0; i < $scope.gridSource.gridObject.length; i++) {
                        $scope.gridSource.gridObject[i][columnName] = isCheckedColumn;
                    }
                }
                $scope.gridSource["getCheckedRows"] = function (columnName, isCheckedColumn) {
                    var _search = {};
                    _search[columnName] = isCheckedColumn;
                    var findJson = rxJson.find($scope.gridSource.gridObject, _search);
                    return findJson;
                }
                rxgs = $scope.rxgs = $scope.gridSource,
                gridHeader = !angular.isUndefined(rxgs.gridHeader) ? true : false;
                gridCss = !angular.isUndefined(rxgs.gridCss) ? true : false;
                gridMaster = !angular.isUndefined(rxgs.gridMaster) ? true : false;
                masterTableView = !angular.isUndefined(rxgs.masterTableView) ? true : false;
                gridEvents = !angular.isUndefined(rxgs.gridEvents) ? true : false;
                $scope.filteredRxgs = $scope.rxgs.gridObject;
                rxData.setJsonArray($scope.rxgs.gridObject);
                if (gridMaster) {
                    $scope.pageSize = (pageSize) ? rxgs.gridMaster.pageSize : 10;
                    allowMultipleColumSorting = !angular.isUndefined(rxgs.gridMaster.allowMultipleColumnSorting) ? rxgs.gridMaster.allowMultipleColumnSorting : false;
                    defaultSortColumn = !angular.isUndefined(rxgs.gridMaster.defaultSortColumn) ? rxgs.gridMaster.defaultSortColumn : '';
                    subGrid = !angular.isUndefined(rxgs.gridMaster.subGrid) ? rxgs.gridMaster.subGrid : '';
                    pagingDropdown = !angular.isUndefined(rxgs.gridMaster.pagingDropdown) ? rxgs.gridMaster.pagingDropdown : false;
                    pagingDropdownSource = !angular.isUndefined(rxgs.gridMaster.pagingDropdownSource) ? true : false;
                    pageSize = !angular.isUndefined(rxgs.gridMaster.pageSize) ? true : false;
                    dataSearch = !angular.isUndefined(rxgs.gridMaster.dataSearch) ? rxgs.gridMaster.dataSearch : false;
                    autoSearch = !angular.isUndefined(rxgs.gridMaster.autoSearch) ? rxgs.gridMaster.autoSearch : false;
                    allowColumnSearch = !angular.isUndefined(rxgs.gridMaster.allowColumnSearch) ? rxgs.gridMaster.allowColumnSearch : false;
                    primaryKey = !angular.isUndefined(rxgs.gridMaster.primaryKey) ? rxgs.gridMaster.primaryKey : '';
                    gridName = !angular.isUndefined(rxgs.gridMaster.gridName) ? rxgs.gridMaster.gridName : '';
                    allowSubGrid = !angular.isUndefined(rxgs.gridMaster.allowSubGrid) ? rxgs.gridMaster.allowSubGrid : '';
                    multiLanguageHeader = !angular.isUndefined(rxgs.gridMaster.multiLanguageHeader) ? rxgs.gridMaster.multiLanguageHeader : false;
                    showHeader = !angular.isUndefined(rxgs.gridMaster.showHeader) ? rxgs.gridMaster.showHeader : true;
                    showFooterPagging = !angular.isUndefined(rxgs.gridMaster.showFooterPagging) ? rxgs.gridMaster.showFooterPagging : true;

                    if (gridName == '') {
                        return;
                    } else {
                        if (!angular.isUndefined(request.cookies(gridName).value)) {
                            $scope.pageSize = parseInt(request.cookies(gridName).value);
                        }
                    }
                }
                if (gridEvents) {
                    dataControlChanged = !angular.isUndefined(rxgs.gridEvents.dataControlChanged) ? rxgs.gridEvents.dataControlChanged : '';
                }
                if (gridCss) {
                    conditionalRowCss = !angular.isUndefined(rxgs.gridCss.conditionalRowCss) ? true : false;
                }
            }

            $scope.SetEventGrid = function () {
                rxgs = $scope.rxgs = $scope.gridSource;
            }
            $scope.setGrid = function () {
                $scope.createCustomColumns = true;
                rxgs = $scope.rxgs = [], headerRows = 0, attrs = '';
                rxGrid = '';
                gridTable = '',
                gridHeader = false,
                gridCss = false,
                gridMaster = false,
                masterTableView = false,
                allowMultipleColumSorting = false,
                conditionalRowCss = false,
                defaultSortColumn = '',
                pagingDropdown = false,
                pagingDropdownSource = false,
                gridEvents = false,
                dataControlChanged = '',
                pageSize = false,
                dataSearch = false,
                gridName = '';
                tableheadingHtml = '',
                tableBodyHtml = '<tbody>',
                tableRowHtml = ''
                tableDataHtml = '',
                tableFooterHtml = '',
                divHeaderRow = '',
                pagingHtmlArea = '',
                searchHtmlArea = '',
                gridHeaderHtml = '',
                selectedSearchColumn = 'All',
                primaryKey = '';
                searchColumnJson = {},
                searchBoxArray = [],
                searchArrayColumns = [],
                rxFilterJsonArray = [],
                copySearchBoxArray = [],
                gridOperations = '',
                detailKeyField = '',
                showFooterPagging = true,
                masterTableViewColumnsLenght = 0,
                isPopupEnabled = false;
                isRemovedSearch = false,
                firstTimeSearch = true,
                removedFirstTimeSearch = true,
                autoSearch = false,
                allowColumnSearch = false,
                multiLanguageHeader = false,
                allowSubGrid = false,
                showHeader = true,
                subGridOpenIcon = '',
                subGridCloseIcon = '',
                subGrid = false,
                conditionDropdownArray = [],
                isConditionDropdown = false,
                conditionFileUploadArray = [],
                isConditionFileUpload = false,
                isFilter = false;
                var createCustomColumn = false;
                $scope.SortColumnName = '';
                $scope.sortOrder = false;
                $scope.pageSize = 10;
                $scope.currentPage = 0;
                $scope.tableHeadings = [];
                $scope.columnSearch = [];
                $scope.modelPopup = [];
                $scope.popupTemplate = {};
                $scope.popupTemplateSrc = {};
                $scope.UpdateJsonArray = {};
                $scope.jsonObjectNames = [];
                $scope.UpdateDataDropdownObject = [];
                $scope.rowConditionalActionIcon = { display: 'none-class' };
                $scope.UpdateColumnName = "All";
                $scope.search = {};
                $scope.drpSearchColumn = "$";
                $scope.subGridRowClass = '';
                rxData.subGridJsonArray = {};
                $scope.initializeGridVariables();
                $scope.setGridHeader();
                $scope.setHeaderGrid();
                if (!angular.isUndefined(rxgs.gridCss)) {
                    gridTable = (gridCss) ? $scope.setTableCSS(rxgs.gridCss) : '<table>';
                    tableheadingHtml = (gridCss) ? $scope.setTableHeadingCss(rxgs.gridCss) : '<thead>';
                    var _headingRow = '<tr>',
                        _subGridRow = '';

                    //masterTableView
                    if (!angular.isUndefined(rxgs.masterTableView)) {
                        var _masterTableViewColumns = rxgs.masterTableView.columns;
                        masterTableViewColumnsLenght = rxgs.masterTableView.columns.length - 2;
                        angular.forEach(_masterTableViewColumns, function (mtvc) {
                            $scope.setTableHeadings(mtvc);
                            $scope.setTableRows(mtvc);
                        });
                        if (allowSubGrid) {
                            //_subGridRow = '<tr><td></td><td colspan="' + _masterTableViewColumnsLenght + '"><div id="{{rxg.' + detailKeyField+'}}"></div></td></tr>';
                        }
                        if (showHeader) {
                            tableheadingHtml += '<tr><th ng-repeat="th in tableHeadings" ng-click="changeSortOrder(th)" class="{{th.headerCss}} {{th.sortCss}}">{{th.headerText}}</th></tr></thead>';
                        }
                        else {
                            tableheadingHtml += '';
                        }
                        tableRowHtml += tableDataHtml + '</tr>' + _subGridRow;
                        tableBodyHtml += tableRowHtml + '</tbody>';
                        if (isConditionDropdown) {
                            gridTable += tableheadingHtml + tableBodyHtml + "</table>{{removeUnusedDropdown()}}{{removeUnusedControls()}}";
                        } else {
                            gridTable += tableheadingHtml + tableBodyHtml + "</table>{{removeUnusedControls()}}";
                        }
                        rxGrid = gridHeaderHtml;
                        rxGrid += divHeaderRow;
                        rxGrid += gridTable;
                        rxGrid += $scope.setFooterPagingInformation();
                        //if (isPopupEnabled) {
                            var _popupHtml = '<div  id="popupTemplate" class="modal hide fade {{popupTemplate.popupCss}}" tabindex="-1" role="dialog" aria-labelledby="popupTemplateLabel" aria-hidden="true">' +
                                             '<div ng-include src="popupTemplateSrc.src"></div>' +
                                             '</div>';
                            rxGrid += _popupHtml;
                        //}
                            
                            $scope.gridName = gridName;
                            $scope.pageSize = !angular.isUndefined(cacheData.fetch($scope.gridName + cookieconfig.get('lid') + "PageSize")) ? cacheData.fetch($scope.gridName + cookieconfig.get('lid') + "PageSize") : $scope.pageSize;
                        $element.replaceWith($compile(rxGrid)($scope));
                        if (!autoSearch) {
                            searchBoxArray = rxJson.unique(searchBoxArray);
                            $('#searchGrid').select2({ tags: searchBoxArray }).on("change", function (v) {
                                $scope.$apply(function () {
                                    isFilter = true;
                                    isRemovedSearch = !angular.isUndefined(v.removed) ? true : false;
                                    removedFirstTimeSearch = (isRemovedSearch) ? true : false;
                                    $scope.searchBoxFilter(v.val);
                                })
                            });
                        }
                        $('#popupTemplate').on('hidden', function () {
                            $scope.$apply(function () { $scope.popupTemplateSrc = { src: '/Scripts/lib/rxapp/template/blank.html', popupCss: '' }; });
                        })
                        createCustomColumn = true;
                        if (multiLanguageHeader) {
                            rxData.setHeadingJsonArray($scope.tableHeadings);
                            rxLanguage.initializeGridHeader();
                        }
                    }
                }
                else {
                    return;
                }

            }

            $scope.setTableCSS = function (tableCss) {

                var _tableCss = !angular.isUndefined(tableCss.tableCss) ? tableCss.tableCss : '';
                return '<table id="' + gridName + '" class="' + _tableCss + '">';
            }

            $scope.setTableHeadingCss = function (tableCss) {
                var _tableCss = !angular.isUndefined(tableCss.tableHeadingCss) ? tableCss.tableHeadingCss : '';
                return '<thead class="' + _tableCss + '">';
            }

            $scope.setTableHeadings = function (tableHeading) {
                var _sortColumn = '',
                    _languageProperty = !angular.isUndefined(tableHeading.languageProperty) ? tableHeading.languageProperty : '';
                if (!angular.isUndefined(tableHeading.dataField)) {
                    _sortColumn = !angular.isUndefined(tableHeading.sortColumn) ? '' : "sorting";
                }
                else {
                    _sortColumn = '';
                }
                if (defaultSortColumn == tableHeading.dataField) {
                    _sortColumn = "sorting_asc";
                    $scope.SortColumnName = tableHeading.dataField;
                    $scope.SortOrder = true
                }
                $scope.tableHeadings.push({ languageProperty: _languageProperty, sortColumn: tableHeading.dataField, sortCss: _sortColumn, headerText: tableHeading.headerText, headerCss: !angular.isUndefined(tableHeading.headerCss) ? tableHeading.headerCss : '', isSorting: (_sortColumn != '' && allowMultipleColumSorting), sortOrder: (_sortColumn == "sorting_asc" && $scope.sortOrder == true) });
            }

            $scope.setTableRows = function (tableRow) {
                $scope.setconditionalRowCss();
                var _setSearchBoxTags = (dataSearch) ? $scope.setSearchBoxTags(tableRow.dataField) : false;
                switch (tableRow.columnType) {
                    case "subGridColumn":
                        $scope.setSubGridColumn(tableRow);
                        break;
                    case "textColumn":
                        $scope.setTextColumn(tableRow);
                        break;
                    case "imageColumn":
                        $scope.setImage(tableRow);
                        break;
                    case "checkboxColumn":
                        $scope.setCheckbox(tableRow);
                        break;
                    case "dateColumn":
                        $scope.setDateColumn(tableRow);
                        break;
                    case "fileUploadColumn":
                        $scope.setFileUploadColumn(tableRow);
                        break;
                    case "dropdownColumn":
                        $scope.setDropdown(tableRow);
                        break;
                    case "textBoxColumn":
                        $scope.setTextBox(tableRow);
                        break;
                    case "textAreaColumn":
                        $scope.setTextArea(tableRow);
                        break;
                    case "hyperLinkColumn":
                        $scope.setHyperLinkcolumn(tableRow);
                        break;
                    case "customNumberColumn":
                        $scope.setCustomNumberColumn(tableRow);
                        break;
                    case "actionColumn":
                        $scope.setActionColumn(tableRow);
                        break;
                    case "actionsColumn":
                        $scope.setActionsColumn(tableRow);
                        break;
                    case "dropdownActionsColumn":
                        $scope.setDropdownActionsColumn(tableRow);
                        break;
                    case "dropdownActionsColumn":
                        $scope.setDropdownActionsColumn(tableRow);
                        break;
                    case "textEventColumn":
                        return $scope.setTextEventColumn(tableRow);
                        break;
                }
            }

            $scope.setconditionalRowCss = function () {
                var _varSub = !angular.isUndefined($scope.subGrid) ? '' : "sub";
                if (autoSearch) {
                    if (conditionalRowCss) {
                        tableRowHtml = '<tr id="' + _varSub + '{{$index}}" ng-repeat="rxg in (filteredRxgs = (rxgs.gridObject | filter : search)) | orderBy:SortColumnName:sortOrder | startIndex:currentPage*pageSize | limitTo:pageSize  " class="{{getRowCss(rxg)}} ' + rxgs.gridCss.tableRowCss + '">';
                    }
                    else {
                        tableRowHtml = '<tr id="' + _varSub + '{{$index}}" ng-repeat="rxg in (filteredRxgs = (rxgs.gridObject | filter : search)) | filter : search | orderBy:SortColumnName:sortOrder | startIndex:currentPage*pageSize | limitTo:pageSize  " class="' + rxgs.gridCss.tableRowCss + '">';
                    }
                }
                else {
                    if (conditionalRowCss) {
                        tableRowHtml = '<tr id="' + _varSub + '{{$index}}" ng-repeat="rxg in filteredRxgs | orderBy:SortColumnName:sortOrder | startIndex:currentPage*pageSize | limitTo:pageSize  " class="{{getRowCss(rxg)}} ' + rxgs.gridCss.tableRowCss + '">';
                    }
                    else {
                        tableRowHtml = '<tr id="' + _varSub + '{{$index}}" ng-repeat="rxg in filteredRxgs | orderBy:SortColumnName:sortOrder | startIndex:currentPage*pageSize | limitTo:pageSize  " class="' + rxgs.gridCss.tableRowCss + '">';
                    }
                }

            }

            $scope.changeSortOrder = function (tableHeading) {
                if (tableHeading.isSorting) {
                    for (var i = 0; i < $scope.tableHeadings.length; i++) {
                        if ($scope.tableHeadings[i].isSorting) {
                            $scope.tableHeadings[i].sortCss = "sorting";
                        }
                    }
                    if (tableHeading.sortOrder) {
                        $scope.SortColumnName = tableHeading.sortColumn;
                        $scope.sortOrder = false;
                        tableHeading.sortCss = "sorting_asc";
                        tableHeading.sortOrder = false;
                    }
                    else {
                        $scope.SortColumnName = tableHeading.sortColumn;
                        $scope.sortOrder = true;
                        tableHeading.sortCss = "sorting_desc";
                        tableHeading.sortOrder = true;
                    }
                }
            }

            $scope.getRowCss = function (rxg) {
                var _columnValue = '',
                    _conditionalValue = '';
                for (var i = 0; i < rxgs.gridCss.conditionalRowCss.length; i++) {
                    if (angular.isString(rxg[rxgs.gridCss.conditionalRowCss[i].dataField])) {
                        _columnValue = rxg[rxgs.gridCss.conditionalRowCss[i].dataField].trim();
                        _conditionalValue = rxgs.gridCss.conditionalRowCss[i].value.trim();
                    }
                    else {
                        _columnValue = rxg[rxgs.gridCss.conditionalRowCss[i].dataField];
                        _conditionalValue = rxgs.gridCss.conditionalRowCss[i].value;
                    }
                    if (_columnValue == _conditionalValue) {
                        return rxgs.gridCss.conditionalRowCss[i].cssClass;
                        break;
                    }
                }
                return '';
            }

            $scope.getColumnCss = function (rxg, columnName) {
                //$scope.preInitializeGridVarialbles();
                var jsonSearch = {};
                jsonSearch["dataField"] = columnName;
                var _search = rxJson.find(rxgs.masterTableView.columns, jsonSearch);
                jsonSearch = {};
                jsonSearch["value"] = rxg[columnName];
                var _searchCss = rxJson.find(_search[0].conditionalColumnCss, jsonSearch);
                if (_searchCss.length != 0) {
                    return _searchCss[0].cssClass;
                }
                return '';
            }

            $scope.getConditionalSubGridCss = function (rxg, columnName, value, _closeIconCss) {

               // $scope.preInitializeGridVarialbles();
                if (rxg[columnName].trim() == value.replace("_", " ")) {
                    return _closeIconCss + " sub-grid-icon"
                } else {
                    return "dispnone";
                }
            }

            $scope.setSubGridColumn = function (tableRow) {

                //$scope.preInitializeGridVarialbles();
                var _columnCss = '',
                    _openIconCss = !angular.isUndefined(tableRow.openIconCss) ? tableRow.openIconCss : '',
                    _closeIconCss = !angular.isUndefined(tableRow.closeIconCss) ? tableRow.closeIconCss : '',
                    detailKeyField = !angular.isUndefined(tableRow.detailKeyField) ? tableRow.detailKeyField : '',
                    _selectedRowCss = !angular.isUndefined(tableRow.selectedRowCss) ? tableRow.selectedRowCss : '',
                    _isMergeSubGrid = !angular.isUndefined(tableRow.isMergeSubGrid) ? tableRow.isMergeSubGrid : false,
                    _conditionalSubGrid = false,
                    _cellCss = 'none',
                    _iconTag = '<i ng-click=\subGridOpenEvent(rxg,$index,"' + _selectedRowCss + '","' + _cellCss + '","' + _openIconCss.replace(" ", "_") + '","' + _closeIconCss.replace(" ", "_") + '")\ class="' + _closeIconCss + '"></i>';
                subGridOpenIcon = _openIconCss;
                subGridCloseIcon = _closeIconCss;
                if (_isMergeSubGrid) {
                    _cellCss = "merge-sub-grid";
                }
                if (!angular.isUndefined(tableRow.conditionalSubGrid)) {
                    _conditionalSubGrid = true;
                    _iconTag = '<i id="icon-{{$index}}"  ng-click=\subGridOpenEvent(rxg,$index,"' + _selectedRowCss + '","' + _cellCss + '","' + _openIconCss.replace(" ", "_") + '","' + _closeIconCss.replace(" ", "_") + '")\ ng-class=\getConditionalSubGridCss(rxg,"' + tableRow.conditionalSubGrid[0].dataField + '","' + tableRow.conditionalSubGrid[0].value.replace(" ", "_") + '","' + _closeIconCss.replace(" ", "_") + '")\></i>';
                }
                if (!angular.isUndefined(tableRow.conditionalColumnCss)) {
                    var _columnCss = !angular.isUndefined(tableRow.columnCss) ? tableRow.columnCss : '';
                    tableDataHtml += '<td class=\{{getColumnCss(rxg,"' + tableRow.dataField + '")}} ' + _columnCss + '\ >{{rxg.' + tableRow.dataField + '}}</td>';
                }
                else {
                    _columnCss = !angular.isUndefined(tableRow.columnCss) ? tableRow.columnCss : '';
                    tableDataHtml += '<td class="' + _columnCss + '">' + _iconTag + '</td>';
                }
            }
            var i = 0;
            var previousIndex = 0;
            var subGridDataKey = 0;
            var indexArray = [];
            var previousIconId = 0;
            var _firstTimeIndex = 0
            $scope.subGridOpenEvent = function (rxg, _index, _rowCss, _cellCss, _openIconCss, _closeIconCss) {
                //$scope.preInitializeGridVarialbles();
                if (previousIconId != _index) {
                    var currentIcon = $("#icon-" + _index);
                    $(currentIcon).removeClass(_closeIconCss.replace("_", " ")).addClass(_openIconCss.replace("_", " "));
                } else {


                }
                if (previousIndex != 0) {
                    delete $scope.$parent['subGridSource' + previousIndex];
                    if (previousIconId != _index) {
                        var previousIcon = $("#icon-" + previousIconId);
                        $(previousIcon).removeClass(_openIconCss.replace("_", " ")).addClass(_closeIconCss.replace("_", " "));
                    }
                    else {
                        var previousIcon = $("#icon-" + previousIconId);
                        $(previousIcon).removeClass(_openIconCss.replace("_", " ")).addClass(_closeIconCss.replace("_", " "));
                        var removeRow = $("." + $scope.subGridRowClass);
                        $(removeRow).remove();
                        previousIndex = 0;
                        subGridDataKey = 0;
                        indexArray = [];
                        previousIconId = 0;
                        _firstTimeIndex = 0;
                        return;
                    }
                }
                $("#" + _index).addClass(_rowCss);
                if (_firstTimeIndex != 0) {
                    $("#" + previousIconId).removeClass(_rowCss);
                }
                _firstTimeIndex = 1;
                previousIconId = _index;
                _index = _index + 2;
                if (previousIndex != _index) {
                    var _subGridSource = $scope.gridSource.masterTableView.columns[0].source,
                   _detailKeyField = $scope.gridSource.masterTableView.columns[0].detailKeyField,
                   _jsonObject = {},
                   _subGridJson = $scope.subGrid;
                    _jsonObject[_detailKeyField] = rxg[_detailKeyField];
                    _subGridJson.gridObject = rxJson.find(_subGridSource, _jsonObject);
                    previousIndex = parseInt(_index + rxJson.uniqueNumber());
                    $scope.$parent["subGridSource" + previousIndex] = [];
                    $scope.$parent["subGridSource" + previousIndex] = _subGridJson;
                    //if (i == 0) {
                    if (subGridDataKey != 0) {
                        $(".subgrid" + subGridDataKey).remove();
                    }
                    var _table = document.getElementById(gridName),
                    _row = _table.insertRow(_index),
                    _cell = _row.insertCell(0),
                    _cell2 = _row.insertCell(1);
                    subGridDataKey = rxg[_detailKeyField];
                    _row.className = "subgrid" + rxg[_detailKeyField];
                    $scope.subGridRowClass = "subgrid" + rxg[_detailKeyField];
                    _cell2.colSpan = (rxgs.masterTableView.columns.length - 2) + 1;
                    _cell2.id = "td" + _index
                    _cell2.className = _cellCss;
                    var div = document.createElement("div");
                    div.id = "div" + previousIndex;
                    _cell2.appendChild(div);
                    var _pIndex = (previousIndex == 0) ? _index : previousIndex;
                    if (!rxJson.arrayContains(indexArray, _index)) {
                        $("#" + "div" + previousIndex).replaceWith($compile('<rx-grid grid-source="subGridSource' + previousIndex + '" subgrid="true"></rx-grid>')($scope.$parent));
                    }

                    indexArray.push(previousIndex);
                } else {


                }
            }

            $scope.setTextColumn = function (tableRow) {
                var _columnCss = '';
                if (!angular.isUndefined(tableRow.conditionalColumnCss)) {
                    var _columnCss = !angular.isUndefined(tableRow.columnCss) ? tableRow.columnCss : '';
                    tableDataHtml += '<td class=\{{getColumnCss(rxg,"' + tableRow.dataField + '")}} ' + _columnCss + '\ >{{rxg.' + tableRow.dataField + '}}</td>';
                }
                else {
                    _columnCss = !angular.isUndefined(tableRow.columnCss) ? tableRow.columnCss : '';
                    tableDataHtml += '<td class="' + _columnCss + '">{{rxg.' + tableRow.dataField + '}}</td>';
                }
            }

            $scope.setImage = function (tableRow) {
                var _columnCss = !angular.isUndefined(tableRow.columnCss) ? tableRow.columnCss : '',
                    _imageCss = !angular.isUndefined(tableRow.imageCss) ? tableRow.imageCss : '',
                    _alternateText = !angular.isUndefined(tableRow.alternateText) ? tableRow.alternateText : '',
                    _alternateColumnText = '';
                if (_alternateText != "") {

                }
                tableDataHtml += '<td class="' + _columnCss + '"><img src="{{rxg.' + tableRow.dataField + '}}" alt="' + _alternateText + '" class="' + _imageCss + '" /></td>';
            }

            $scope.setCheckbox = function (tableRow) {
                $scope.checkUpdateScopeObject(tableRow);
                var _columnCss = !angular.isUndefined(tableRow.columnCss) ? tableRow.columnCss : '';
                tableDataHtml += '<td class="' + _columnCss + '"><input type="checkbox" ng-model="rxg.' + tableRow.dataField + '" ng-change=\changeControlEvent(rxg,"' + tableRow.jsonObjectName + '",{{rxg.' + tableRow.dataField + '}},"' + tableRow.dataField + '",1)\ /></td>';
            }


            $scope.setDateColumn = function (tableRow) {
                $scope.checkUpdateScopeObject(tableRow);
                var _columnCss = !angular.isUndefined(tableRow.columnCss) ? tableRow.columnCss : '',
                    _textBoxCss = !angular.isUndefined(tableRow.textBoxCss) ? tableRow.textBoxCss : '';
                tableDataHtml += '<td class="' + _columnCss + '"><input type="text" set-rxgrid rx-date class="' + _textBoxCss + '" ng-model="rxg.' + tableRow.dataField + '" ng-change=\changeControlEvent(rxg,"' + tableRow.jsonObjectName + '","{{rxg.' + tableRow.dataField + '}}","' + tableRow.dataField + '",4)\  /></td>';
            }

            $scope.setTextEventColumn = function (tableRow) {
                    _cssClass = !angular.isUndefined(tableRow.textCss) ? tableRow.textCss : '',
                    _textEvent = !angular.isUndefined(tableRow.event) ? tableRow.event : '',
                    _columnCss = !angular.isUndefined(tableRow.columnCss) ? tableRow.columnCss : '';
                tableDataHtml += '<td class="' + _columnCss + '"><span ng-click=\events(rxg,"' + _textEvent + '")\  class="' + _cssClass + '">{{rxg.' + tableRow.dataField + '}}</span></td>';
            }

            $scope.setFileUploadColumn = function (tableRow) {
                $scope.checkUpdateScopeObject(tableRow);
                var _columnCss = !angular.isUndefined(tableRow.columnCss) ? tableRow.columnCss : '',
                    _textBoxCss = !angular.isUndefined(tableRow.textBoxCss) ? tableRow.textBoxCss : '',
                    _url = !angular.isUndefined(tableRow.url) ? tableRow.url : '';
                if (!angular.isUndefined(tableRow.conditional)) {
                    tableDataHtml += '<td class="' + _columnCss + '"><div ng-show=\checkShowElement(rxg,"' + tableRow.conditional.dataField + '","' + tableRow.conditional.value + '")\><input  type="file" rx-fileupload url="' + _url + '" name="files[]" ng-model="rxg.' + tableRow.dataField + '" upload-event=\fileUploadEvent(rxg,"' + tableRow.jsonObjectName + '","' + tableRow.dataField + '",uploadFile)\  /></div></td>';
                } else {
                    if (!angular.isUndefined(tableRow.conditionalFileUpload)) {
                        isConditionFileUpload = true;
                        var isMultipleValues = !angular.isUndefined(tableRow.conditionalFileUpload.isMultipleValues) ? tableRow.conditionalFileUpload.isMultipleValues : false;
                        tableDataHtml += '<td class="' + _columnCss + '">{{setConditionalFielUploadShow(rxg,"' + tableRow.conditionalFileUpload.dataField + '","' + $scope.spaceRemover(tableRow.conditionalFileUpload.value) + '",$index,' + isMultipleValues + ')}}  <div id="fileup{{$index}}"><input  type="file" rx-fileupload url="' + _url + '" name="files[]" ng-model="rxg.' + tableRow.dataField + '" upload-event=\fileUploadEvent(rxg,"' + tableRow.jsonObjectName + '","' + tableRow.dataField + '",uploadFile)\  /></div></td>';
                    } else {
                        tableDataHtml += '<td class="' + _columnCss + '"><input  type="file" rx-fileupload url="' + _url + '" name="files[]" ng-model="rxg.' + tableRow.dataField + '" upload-event=\fileUploadEvent(rxg,"' + tableRow.jsonObjectName + '","' + tableRow.dataField + '",uploadFile)\  /></td>';
                    }
                }

            }

            $scope.checkShowElement = function (rxg, _columnName, _conditionalValue) {
                if (rxg[_columnName] == _conditionalValue) {
                    rxData.setJsonArray($scope.rxgs);
                    return true;
                }
                return false;
            }
            $scope.spaceRemover = function (_string) {
                var _stringValues = _string.split(" "),
                    _lengthCount = _stringValues.length - 1,
                    _stringText = '';
                for (var i = 0; i < _stringValues.length; i++) {
                    if (_lengthCount == i) {
                        _stringText += _stringValues[i];
                    } else {
                        _stringText += _stringValues[i] + "_";
                    }
                }
                return _stringText;
            }

            $scope.spaceReplacer = function (_string) {
                var _stringValues = _string.split("_"),
                    _lengthCount = _stringValues.length - 1,
                    _stringText = '';
                for (var i = 0; i < _stringValues.length; i++) {
                    if (_lengthCount == i) {
                        _stringText += _stringValues[i];
                    } else {
                        _stringText += _stringValues[i] + " ";
                    }
                }
                return _stringText;
            }


            $scope.commaSplitter = function (_string) {
                return _string.split(",");
            }

            $scope.setConditionalFielUploadShow = function (rxg, _columnName, _columnValue, _divId, _isMultipleValues) {
                var _columnValue = $scope.spaceReplacer(_columnValue).trim();
                if (_isMultipleValues) {
                    var _commaSpliter = $scope.commaSplitter(_columnValue);
                    for (var i = 0; i < _commaSpliter.length; i++) {
                        if (rxg[_columnName].trim() == _commaSpliter[i].trim()) {
                            return
                        }
                    }
                    conditionFileUploadArray.push("#fileup" + _divId);
                } else {
                    if (rxg[_columnName].trim() != _columnValue) {
                        conditionFileUploadArray.push("#fileup" + _divId);
                    }
                }

            }

            $scope.fileUploadEvent = function (rxg, jObjectName, dataFieldName, uploadFilePath) {
                rxg[dataFieldName] = uploadFilePath;
                if (angular.isUndefined($scope.UpdateJsonArray[jObjectName])) {
                    $scope.UpdateJsonArray[jObjectName] = [];
                }
                $scope.UpdateJsonArray[jObjectName].push(rxg);
            }


            $scope.setDropdown = function (tableRow) {
                $scope.checkUpdateScopeObject(tableRow);
                var _columnCss = !angular.isUndefined(tableRow.columnCss) ? tableRow.columnCss : '',
                    _dropdownCss = !angular.isUndefined(tableRow.dropdownCss) ? tableRow.dropdownCss : '',
                    _selected = !angular.isUndefined(tableRow.selected) ? tableRow.selected : '';
                if (_selected == "") {
                    return;
                }
                $scope["grid" + tableRow.jsonObjectName] = tableRow.source;
                if (!angular.isUndefined(tableRow.conditionalDropdown)) {
                    isConditionDropdown = true;
                    tableDataHtml += '<td class="' + _columnCss + '">{{setConditionalDropdownShow(rxg,"' + tableRow.conditionalDropdown.dataField + '","' + tableRow.conditionalDropdown.value + '",$index)}}  <div id="drp{{$index}}"><select class="' + _dropdownCss + '" ng-model="rxg.' + tableRow.dataField + '" ng-change=\changeControlEvent(rxg,"' + tableRow.jsonObjectName + '","{{rxg.' + tableRow.dataField + '}}","' + tableRow.dataField + '",2)\ ng-options="rxDrpObj.' + _selected + ' as rxDrpObj.' + _selected + ' for rxDrpObj in grid' + tableRow.jsonObjectName + '" /></div>  <div id="drp{{$index}}rxg">{{rxg.' + tableRow.dataField + '}}</div> </td>';
                } else {
                    if (!angular.isUndefined(attrs.subgrid)) {
                        tableDataHtml += '<td class="' + _columnCss + '"><select class="' + _dropdownCss + '" ng-model="rxg.' + tableRow.dataField + '" ng-change=\subGridChangeControlEvent(rxg,"' + tableRow.jsonObjectName + '","{{rxg.' + tableRow.dataField + '}}","' + tableRow.dataField + '",2)\ ng-options="rxDrpObj.' + _selected + ' as rxDrpObj.' + _selected + ' for rxDrpObj in grid' + tableRow.jsonObjectName + '" /></td>';
                    } else {
                        tableDataHtml += '<td class="' + _columnCss + '"><select class="' + _dropdownCss + '" ng-model="rxg.' + tableRow.dataField + '" ng-change=\changeControlEvent(rxg,"' + tableRow.jsonObjectName + '","{{rxg.' + tableRow.dataField + '}}","' + tableRow.dataField + '",2)\ ng-options="rxDrpObj.' + _selected + ' as rxDrpObj.' + _selected + ' for rxDrpObj in grid' + tableRow.jsonObjectName + '" /></td>';
                    }

                }
            }

            $scope.setConditionalDropdownShow = function (rxg, _columnName, _columnValue, _divId) {

                _columnValue = _columnValue.replace("_", " ").trim();
                if (rxg[_columnName].trim() != _columnValue) {
                    conditionDropdownArray.push("#drp" + _divId + "rxg");
                } else {
                    conditionDropdownArray.push("#drp" + _divId);
                }
            }

            $scope.removeUnusedControls = function () {
                if (isConditionFileUpload) {
                    for (var i = 0; i < conditionFileUploadArray.length; i++) {
                        $(conditionFileUploadArray[i]).remove();
                    }
                }
            }


            $scope.removeUnusedDropdown = function () {
                for (var i = 0; i < conditionDropdownArray.length; i++) {
                    $(conditionDropdownArray[i]).remove();
                }
            }
            $scope.setTextBox = function (tableRow) {
                $scope.checkUpdateScopeObject(tableRow);
                var _columnCss = !angular.isUndefined(tableRow.columnCss) ? tableRow.columnCss : '',
                    _textBoxCss = !angular.isUndefined(tableRow.textBoxCss) ? tableRow.textBoxCss : '';
                var maxLength = !angular.isUndefined(tableRow.maxLength) ? "maxlength='" + tableRow.maxLength + "'" : '';
                var isNumber = !angular.isUndefined(tableRow.isNumber) ? "type='number'" : "type='text'";
                tableDataHtml += '<td class="' + _columnCss + '"><input ' + isNumber + ' class="' + _textBoxCss + '" ' + maxLength + '  ng-model="rxg.' + tableRow.dataField + '" ng-change=\changeControlEvent(rxg,"' + tableRow.jsonObjectName + '","{{rxg.' + tableRow.dataField + '}}","' + tableRow.dataField + '",3)\  /></td>';
            }


            $scope.setTextArea = function (tableRow) {
                $scope.checkUpdateScopeObject(tableRow);
                var _columnCss = !angular.isUndefined(tableRow.columnCss) ? tableRow.columnCss : '',
                    _textAreaCss = !angular.isUndefined(tableRow.textAreaCss) ? tableRow.textAreaCss : '',
                    _rows = tableRow.rows,
                    _cols = tableRow.cols;
                if (!angular.isUndefined(tableRow.conditional)) {
                    tableDataHtml += '<td class="' + _columnCss + '"><div ng-show=\checkShowElement(rxg,"' + tableRow.conditional.dataField + '","' + tableRow.conditional.value + '")\><textarea rows="' + _rows + '" cols="' + _cols + '" class="' + _textAreaCss + '" ng-model="rxg.' + tableRow.dataField + '" ng-change=\changeControlEvent(rxg,"' + tableRow.jsonObjectName + '","{{rxg.' + tableRow.dataField + '}}","' + tableRow.dataField + '",3)\  ></textarea></div></td>';
                } else {
                    tableDataHtml += '<td class="' + _columnCss + '"><textarea rows="' + _rows + '" cols="' + _cols + '" class="' + _textAreaCss + '" ng-model="rxg.' + tableRow.dataField + '" ng-change=\changeControlEvent(rxg,"' + tableRow.jsonObjectName + '","{{rxg.' + tableRow.dataField + '}}","' + tableRow.dataField + '",3)\  ></textarea></td>';
                }

            }
            $scope.subGridChangeControlEvent = function (rxg, _jsonObjectName, _columnValue, _columnName, controlType) {
                if (angular.isUndefined(rxg["previous" + _columnName])) {
                    rxg["previous" + _columnName] = _columnValue;
                }
                if (angular.isUndefined(rxData.subGridJsonArray[_jsonObjectName])) {
                    rxData.subGridJsonArray[_jsonObjectName] = [];
                }
                if (rxg["previous" + _columnName] != rxg[_columnName]) {
                    var cols = {};
                    for (var col in rxg) {
                        if (!angular.isUndefined(col)) {
                            if (col != "$$hashKey") {
                                cols[col] = rxg[col];
                            }
                        }
                    }
                    rxData.subGridJsonArray[_jsonObjectName].push(cols);
                } else {
                    for (var i = 0; i < rxData.subGridJsonArray[_jsonObjectName].length; i++) {
                        if (rxData.subGridJsonArray[_jsonObjectName][i][primaryKey] == rxg[primaryKey]) {
                            rxData.subGridJsonArray[_jsonObjectName].splice(i, 1);
                        }
                    }
                    if (rxData.subGridJsonArray[_jsonObjectName].length == 0) {
                        rxData.subGridJsonArray = rxJson.removeColumn(rxData.subGridJsonArray, _jsonObjectName);
                    }
                }
            }

            $scope.changeControlEvent = function (rxg, _jsonObjectName, _columnValue, _columnName, controlType) {
                if (controlType == 4) {
                    if (angular.isUndefined(rxg["previous" + _columnName])) {
                        rxg["previous" + _columnName] = _columnValue
                        if (angular.isUndefined($scope.UpdateJsonArray[_jsonObjectName])) {
                            $scope.UpdateJsonArray[_jsonObjectName] = [];
                        }
                        $scope.UpdateJsonArray[_jsonObjectName].push(rxg);
                    } else {

                        if (rxg["previous" + _columnName] == rxg[_columnName]) {
                            $scope.UpdateJsonArray[_jsonObjectName] = $scope.deleteObject($scope.UpdateJsonArray[_jsonObjectName], rxg);
                            if ($scope.UpdateJsonArray[_jsonObjectName].length == 0) {
                                $scope.UpdateJsonArray = rxJson.removeColumn($scope.UpdateJsonArray, _jsonObjectName);
                            }
                        }
                    }

                } else {
                    if (angular.isUndefined(rxg["previous" + _columnName])) {
                        rxg["previous" + _columnName] = _columnValue;
                        if (angular.isUndefined($scope.UpdateJsonArray[_jsonObjectName])) {
                            $scope.UpdateJsonArray[_jsonObjectName] = [];
                        }
                        if (controlType == 3) {
                            $scope.UpdateJsonArray[_jsonObjectName].push(rxg);
                            return;
                        }
                    }
                    if (controlType != 3) {
                        if (angular.isUndefined($scope.UpdateJsonArray[_jsonObjectName])) {
                            $scope.UpdateJsonArray[_jsonObjectName] = [];
                        }
                        if (rxg["previous" + _columnName] != rxg[_columnName]) {
                            $scope.UpdateJsonArray[_jsonObjectName].push(rxg);
                        } else {
                            $scope.UpdateJsonArray[_jsonObjectName] = $scope.deleteObject($scope.UpdateJsonArray[_jsonObjectName], rxg);
                            if ($scope.UpdateJsonArray[_jsonObjectName].length == 0) {
                                $scope.UpdateJsonArray = rxJson.removeColumn($scope.UpdateJsonArray, _jsonObjectName);
                            }
                        }
                    }
                    else {

                        if (rxg["previous" + _columnName].trim() == rxg[_columnName]) {
                            $scope.UpdateJsonArray[_jsonObjectName] = $scope.deleteObject($scope.UpdateJsonArray[_jsonObjectName], rxg);
                            if ($scope.UpdateJsonArray[_jsonObjectName].length == 0) {
                                $scope.UpdateJsonArray = rxJson.removeColumn($scope.UpdateJsonArray, _jsonObjectName);
                            }
                        }
                    }
                }
                if (dataControlChanged != '') {
                    rxData.setGridChangedData(dataControlChanged, $scope.UpdateJsonArray);
                }

            }

            $scope.setHyperLinkcolumn = function (tableRow) {
                var _columnCss = '';
                if (!angular.isUndefined(tableRow.conditionalColumnCss)) {
                    _columnCss = !angular.isUndefined(tableRow.columnCss) ? tableRow.columnCss : '';
                    tableDataHtml += '<td class=\{{getColumnCss(rxg,"' + tableRow.dataField + '")}} ' + _columnCss + '\ >' + $scope._CreateHyperLink(tableRow) + '</td>';
                }
                else {
                    _columnCss = !angular.isUndefined(tableRow.columnCss) ? tableRow.columnCss : '',
                    tableDataHtml += '<td class="' + _columnCss + '">' + $scope._CreateHyperLink(tableRow) + '</td>';
                }
            }

            $scope._CreateHyperLink = function (tableRow) {
                _splitParameters = tableRow.navigateUrl.split(":"),
                _url = _splitParameters[0],
                _hyperlinkCss = !angular.isUndefined(tableRow.hyperlinkCss) ? tableRow.hyperlinkCss : '';
                for (var i = 1; i < _splitParameters.length; i++) {
                    _url += '{{rxg.' + _splitParameters[i] + '}}';
                }
                return '<a href="' + _url + '" class="' + _hyperlinkCss + '" >{{rxg.' + tableRow.dataField + '}}</a>';
            }

            $scope.setCustomNumberColumn = function (tableRow) {
                createCustomColumn = true;
                var _columnCss = '',
                     _numberFormat = !angular.isUndefined(tableRow.numberFormat) ? ' | number : ' + tableRow.numberFormat : '',
                    _currency = !angular.isUndefined(tableRow.currency) ? ' | currency' : '',
                    _customizeString = !angular.isUndefined(tableRow.event) ? '{{rxg.' + tableRow.dataField + ' = _CreateCustomNumberColumnEvent(rxg,"' + tableRow.event + '") ' + _numberFormat + _currency + '}}' : $scope._CreateCustomNumberColumnExpression(tableRow);
                if (!angular.isUndefined(tableRow.conditionalColumnCss)) {
                    _columnCss = !angular.isUndefined(tableRow.columnCss) ? tableRow.columnCss : '';
                    tableDataHtml += '<td class=\{{getColumnCss(rxg,"' + tableRow.dataField + '")}} ' + _columnCss + '\ >' + _customizeString + '</td>';
                }
                else {
                    _columnCss = !angular.isUndefined(tableRow.columnCss) ? tableRow.columnCss : '';
                    tableDataHtml += '<td class="' + _columnCss + '">' + _customizeString + '</td>';
                }
            }

            $scope._CreateCustomNumberColumnExpression = function (tableRow) {
                var _expression = tableRow.expression.split("."),
                     _numberFormat = !angular.isUndefined(tableRow.numberFormat) ? ' | number : ' + tableRow.numberFormat : '',
                    _currency = !angular.isUndefined(tableRow.currency) ? ' | currency' : '',
                    _setExpression = '{{rxg.' + tableRow.dataField + ' = ';
                for (var i = 1; i < _expression.length; i++) {
                    _setExpression += "rxg." + _expression[i];
                }

                _setExpression += _numberFormat + _currency + '}}';
                return _setExpression;
            }

            $scope._CreateCustomNumberColumnEvent = function (rxg, eventName) {
                $scope.$parent["customize"] = rxg;
                var _CustomizeString = $scope.$parent.$eval(eventName + '(customize)');
                return _CustomizeString;
            }

            $scope.setActionColumn = function (tableRow) {
                var _navigateUrl = !angular.isUndefined(tableRow.navigateUrl) ? true : false,
                    _event = !angular.isUndefined(tableRow.event) ? true : false,
                     _columnCss = !angular.isUndefined(tableRow.columnCss) ? tableRow.columnCss : '';
                if (_navigateUrl) {
                    tableDataHtml += '<td class="' + _columnCss + '">' + $scope._CreateActionColumnHyperLink(tableRow) + '</td>';
                } else if (_event) {
                    tableDataHtml += '<td class="' + _columnCss + '">' + $scope._CreateActionColumnIconEvent(tableRow) + '</td>';
                }
                else {
                    tableDataHtml += '<td class="' + _columnCss + '">' + $scope._CreateActionColumnIcon(tableRow) + '</td>';
                }
            }

            $scope._CreateActionColumnHyperLink = function (tableRow) {
                var _splitParameters = tableRow.navigateUrl.split("/:"),
                    _url = _splitParameters[0],
                    _hyperlinkCss = !angular.isUndefined(tableRow.hyperlinkCss) ? tableRow.hyperlinkCss : '',
                    _text = !angular.isUndefined(tableRow.text) ? tableRow.text : '';
                for (var i = 1; i < _splitParameters.length; i++) {
                    _url += '/' + '{{rxg.' + _splitParameters[i] + '}}';
                }
                return '<a href="' + _url + '" class="' + _hyperlinkCss + '" ><i class="' + tableRow.iconCss + '" title="' + tableRow.title + '"></i>' + _text + '</a>';
            }

            $scope._CreateActionColumnIcon = function (tableRow) {
                var _columnCss = !angular.isUndefined(tableRow.columnCss) ? tableRow.columnCss : '';
                if (!isPopupEnabled) {
                    isPopupEnabled = (!angular.isUndefined(tableRow.templatePath) && angular.isUndefined(tableRow.event)) ? true : false;
                }
                var _indexCount = $scope.modelPopup.length;
                $scope.modelPopup.push({ src: !angular.isUndefined(tableRow.templatePath) ? tableRow.templatePath : '', popupCss: !angular.isUndefined(tableRow.popupCss) ? tableRow.popupCss : '' });
                return '<i ng-click="actionEvents(rxg,' + _indexCount + ')" class="' + tableRow.iconCss + '" title="' + tableRow.title + '"></i>';
            }

            $scope._CreateActionColumnIconEvent = function (tableRow) {
                return '<i ng-click=\events(rxg,"' + tableRow.event + '")\ class="' + tableRow.iconCss + '" title="' + tableRow.title + '"></i>';
            }

            $scope._CreateActionColumnIconEventText = function (tableRow) {
                var _text = !angular.isUndefined(tableRow.text) ? tableRow.text : '';
                return '<a ng-click=\events(rxg,"' + tableRow.event + '")\><i  class="' + tableRow.iconCss + '" title="' + tableRow.title + '"></i>' + _text + '</a>';
            }

            $scope._CreateActionColumnIconText = function (tableRow) {
                var _text = !angular.isUndefined(tableRow.text) ? tableRow.text : '';
                if (!isPopupEnabled) {
                    isPopupEnabled = (!angular.isUndefined(tableRow.templatePath) && angular.isUndefined(tableRow.event)) ? true : false;
                }
                var _indexCount = $scope.modelPopup.length;
                $scope.modelPopup.push({ src: !angular.isUndefined(tableRow.templatePath) ? tableRow.templatePath : '', popupCss: !angular.isUndefined(tableRow.popupCss) ? tableRow.popupCss : '' });
                return '<a ng-click="actionEvents(rxg,' + _indexCount + ')"  title="' + tableRow.title + '"><i class="' + tableRow.iconCss + '"></i>' + _text + '</a>';
            }

            $scope.actionEvents = function (rxg, _indexCount) {
               // $scope.preInitializeGridVarialbles();

                rxData.setJsonObject(rxg);
                rxData.setJsonArray($scope.rxgs.gridObject);




                rxData.setFilteredJsonArray($scope.filteredRxgs);



                $scope.popupTemplate = { popupCss: $scope.modelPopup[_indexCount].popupCss }
                $scope.popupTemplateSrc = $scope.modelPopup[_indexCount];
                $('#popupTemplate').modal('show');
            }

            $scope.events = function (rxg, _eventName) {
                rxData.setJsonObject(rxg);
                rxData.setJsonArray($scope.rxgs.gridObject);
                rxData.setFilteredJsonArray($scope.filteredRxgs);
                if (!subGrid) {
                    $scope.$parent["gridcustomize"] = rxg;
                    $scope.$parent.$eval(_eventName + '(gridcustomize)');
                } else {
                    $scope.$parent.$parent["gridcustomize"] = rxg;
                    $scope.$parent.$parent.$eval(_eventName + '(gridcustomize)');
                }
            }

            $scope.setConditionalActionColumn = function (tableRow) {
                var _navigateUrl = !angular.isUndefined(tableRow.navigateUrl) ? true : false,
                      _columnCss = !angular.isUndefined(tableRow.columnCss) ? tableRow.columnCss : '';
                if (_navigateUrl) {
                    tableDataHtml += '<td class="' + _columnCss + '{{getConditionalActionColumn(this)}}">' + $scope._CreateConditionalActionColumnHyperLink(tableRow) + '</td>';
                } else {
                    tableDataHtml += '<td class="' + _columnCss + '{{getConditionalActionColumn(this)}}">' + $scope._CreateConditionalActionColumnIcon(tableRow) + '</td>';
                }
            }

            $scope.setActionsColumn = function (tableRow) {
                var _columnCss = !angular.isUndefined(tableRow.columnCss) ? tableRow.columnCss : '',
                    _actions = !angular.isUndefined(tableRow.actions) ? true : false,
                    _primaryKeyColumn = (primaryKey != '') ? primaryKey : '';
                _actionColumnHtml = '<td class="' + _columnCss + '"><div id="{{rxg.' + _primaryKeyColumn + '}}" >',
                _conditionalActions = !angular.isUndefined(tableRow.conditionalActions) ? true : false,
                _innerIconCss = !angular.isUndefined(tableRow.innerIconCss) ? tableRow.innerIconCss : "rx-iconspacing",
                _iconsSpacing = 0,
                _conditionalHtml = '';
                if (_actions) {
                    angular.forEach(tableRow.actions, function (action) {
                        var _navigateUrl = !angular.isUndefined(action.navigateUrl) ? true : false,
                             _event = !angular.isUndefined(action.event) ? true : false,
                            _spacingClass = (_iconsSpacing == 0) ? '' : '<i class="' + _innerIconCss + '"></i>';
                        if (_navigateUrl) {
                            _actionColumnHtml += _spacingClass + $scope._CreateActionColumnHyperLink(action);
                        }
                        else if (_event) {
                            _actionColumnHtml += _spacingClass + $scope._CreateActionColumnIconEvent(action);
                        }
                        else {
                            _actionColumnHtml += _spacingClass + $scope._CreateActionColumnIcon(action);
                        }
                        _iconsSpacing++;
                    });
                }

                if (_conditionalActions) {
                    angular.forEach(tableRow.conditionalActions, function (conditional) {
                        angular.forEach(conditional.conditionalView, function (view) {
                            var _navigateUrl = !angular.isUndefined(view.navigateUrl) ? true : false,
                                _event = !angular.isUndefined(view.event) ? true : false,
                            _spacingClass = (_iconsSpacing == 0) ? '' : '<i class="' + _innerIconCss + '"></i>';
                            if (_navigateUrl) {
                                _actionColumnHtml += _spacingClass + $scope._CreateConditionalActionsColumnHyperLink(view, conditional.dataFieldColumn);
                            }
                            else if (_event) {
                                _actionColumnHtml += _spacingClass + $scope._CreateConditionalActionsColumnIconEvent(view, conditional.dataFieldColumn);
                            }
                            else {
                                _actionColumnHtml += _spacingClass + $scope._CreateConditionalActionsColumnIcon(view, conditional.dataFieldColumn);
                            }
                        });
                    });
                }
                _actionColumnHtml += '</div>' + _conditionalHtml + '</td>';
                tableDataHtml += _actionColumnHtml;
            }

            $scope._CreateConditionalActionsColumnHyperLink = function (tableRow, _columnName) {
                var _splitParameters = tableRow.navigateUrl.split(":"),
                    _url = _splitParameters[0],
                    _hyperlinkCss = !angular.isUndefined(tableRow.hyperlinkCss) ? tableRow.hyperlinkCss : '',
                    _primaryKeyColumn = (primaryKey != '') ? primaryKey : '',
                    _text = !angular.isUndefined(tableRow.text) ? tableRow.text : '',
					_indexCount = _splitParameters.length - 1;

                for (var i = 1; i < _splitParameters.length; i++) {
                    if (i == _indexCount) {
                        _url += '{{rxg.' + _splitParameters[i] + '}}';
                    } else {
                        _url += '{{rxg.' + _splitParameters[i].replace("/", "") + '}}/';
                    }

                }
                if (angular.isString(tableRow.value)) {
                    var _splitString = tableRow.value.trim().split(" "),
                        _value = _splitString[0];
                    for (var i = 1; i < _splitString.length; i++) {
                        _value += '_' + _splitString[i]
                    }
                    _eventString = '{{getActionsConditionalView(rxg,"' + _columnName + '","' + _value + '","' + primaryKey + '",$index)}}';
                }
                else {
                    _eventString = '{{getActionsConditionalView(rxg,"' + _columnName + '",' + tableRow.value + ',"' + primaryKey + '",$index)}}';
                    _value = tableRow.value

                }
                return '<span id="{{rxg.' + _primaryKeyColumn + '}}a' + _value + '"><a href="' + _url + '" class="' + _hyperlinkCss + '" ><i class="' + tableRow.iconCss + '"></i>' + _text + '</a></span>' + _eventString;
            }

            $scope._CreateConditionalActionsColumnIcon = function (tableRow, _columnName) {
                var _condtionalValue = !angular.isUndefined(tableRow.value) ? tableRow.value : '',
                    _indexCount = 0,
                    _primaryKeyColumn = (primaryKey != '') ? primaryKey : '';
                _eventString = '';
                if (!isPopupEnabled) {
                    isPopupEnabled = (!angular.isUndefined(tableRow.templatePath) && angular.isUndefined(tableRow.event)) ? true : false;
                }
                _indexCount = $scope.modelPopup.length;
                $scope.modelPopup.push({ src: !angular.isUndefined(tableRow.templatePath) ? tableRow.templatePath : '', popupCss: !angular.isUndefined(tableRow.popupCss) ? tableRow.popupCss : '' });

                if (angular.isString(tableRow.value)) {
                    var _splitString = tableRow.value.trim().split(" "),
                        _value = _splitString[0];
                    for (var i = 1; i < _splitString.length; i++) {
                        _value += '_' + _splitString[i]
                    }
                    _eventString = '{{getActionsConditionalView(rxg,"' + _columnName + '","' + _value + '","' + primaryKey + '",$index)}}';
                }
                else {
                    _eventString = '{{getActionsConditionalView(rxg,"' + _columnName + '",' + tableRow.value + ',"' + primaryKey + '",$index)}}';
                    _value = tableRow.value

                }
                return '<span id="{{rxg.' + _primaryKeyColumn + '}}a' + _value + '"><i  ng-click="actionEvents(rxg,' + _indexCount + ')" class="' + tableRow.iconCss + '" title="' + tableRow.title + '"></i></span>' + _eventString;
            }

            $scope._CreateConditionalActionsColumnIconEvent = function (tableRow, _columnName) {

                var _condtionalValue = !angular.isUndefined(tableRow.value) ? tableRow.value : '',
                    _indexCount = 0,
                    _primaryKeyColumn = (primaryKey != '') ? primaryKey : '';
                _eventString = '';
                if (angular.isString(tableRow.value)) {
                    var _splitString = tableRow.value.trim().split(" "),
                        _value = _splitString[0];
                    for (var i = 1; i < _splitString.length; i++) {
                        _value += '_' + _splitString[i]
                    }
                    _eventString = '{{getActionsConditionalView(rxg,"' + _columnName + '","' + _value + '","' + primaryKey + '",$index)}}';
                }
                else {
                    _eventString = '{{getActionsConditionalView(rxg,"' + _columnName + '",' + tableRow.value + ',"' + primaryKey + '",$index)}}';
                    _value = tableRow.value

                }
                return '<span id="{{rxg.' + _primaryKeyColumn + '}}a' + _value + '"><i  ng-click=\events(rxg,"' + tableRow.event + '")\ class="' + tableRow.iconCss + '" title="' + tableRow.title + '"></i></span>' + _eventString;
            }

            $scope.getActionsConditionalView = function (rxg, _columnName, _value, _primaryKey, _index) {
               // $scope.preInitializeGridVarialbles();
                if (angular.isString(_value)) {
                    var _splitString = _value.trim().split("_"),
                    _passedValue = _splitString[0];
                    for (var i = 1; i < _splitString.length; i++) {
                        _passedValue += " " + _splitString[i];
                    }
                } else {
                    _passedValue = _value;
                }
                var jsonSearch = {};
                jsonSearch["columnType"] = "actionsColumn";
                var _actionsColumn = rxJson.find(rxgs.masterTableView.columns, jsonSearch);
                jsonSearch = {};
                jsonSearch["dataFieldColumn"] = _columnName;
                var _conditionalActions = rxJson.find(_actionsColumn[0].conditionalActions, jsonSearch);
                var _rxgValue = '';
                if (angular.isString(rxg[_columnName])) {
                    _rxgValue = rxg[_columnName].trim();
                } else {
                    _rxgValue = rxg[_columnName];
                }
                jsonSearch = {};
                jsonSearch["value"] = _passedValue;
                var _iconCss = rxJson.find(_conditionalActions[0].conditionalView, jsonSearch);
                if (_rxgValue != _passedValue) {
                    jsonSearch = {};
                    jsonSearch["value"] = _passedValue;
                    var _condition = rxJson.find(_actionsColumn, jsonSearch);
                    var a = "." + _iconCss[0].iconCss;
                    $("#" + rxg[_primaryKey] + "a" + _value).remove();
                }
                return "";
            }

            $scope.setDropdownActionsColumn = function (tableRow) {
                var _columnCss = !angular.isUndefined(tableRow.columnCss) ? tableRow.columnCss : '',
                    _buttonCss = !angular.isUndefined(tableRow.buttonCss) ? tableRow.buttonCss : '',
                    _iconCss = !angular.isUndefined(tableRow.iconCss) ? tableRow.iconCss : '',
                    _text = !angular.isUndefined(tableRow.text) ? tableRow.text : '',
                    _actions = !angular.isUndefined(tableRow.actions) ? true : false,
                    _primaryKeyColumn = (primaryKey != '') ? primaryKey : '';
                _actionColumnHtml = '<td class="' + _columnCss + '">' +
                                    '<div class="btn-group">' +
                                    '<button data-toggle="dropdown" class="btn ' + _buttonCss + ' dropdown-toggle"><i class="' + _iconCss + '"></i> ' + _text + '  <span class="caret"></span></button>' +
                                    '<ul class="dropdown-menu pull-right">';

                if (_actions) {
                    var _actionsLength = tableRow.actions.length - 1,
                        _lengthCount = 1;
                    angular.forEach(tableRow.actions, function (action) {
                        var _navigateUrl = !angular.isUndefined(action.navigateUrl) ? true : false,
                             _event = !angular.isUndefined(action.event) ? true : false;
                        if (_navigateUrl) {
                            _actionColumnHtml += '<li>' + $scope._CreateActionColumnHyperLink(action) + '</li>';
                        }
                        else if (_event) {
                            _actionColumnHtml += '<li>' + $scope._CreateActionColumnIconEventText(action) + '</li>';
                        }
                        else {
                            _actionColumnHtml += '<li>' + $scope._CreateActionColumnIconText(action) + '</li>';
                        }
                        if (_actionsLength >= _lengthCount) {
                            _actionColumnHtml += '<li class="divider"></li>';
                            _lengthCount++;
                        }
                    });
                }
                _actionColumnHtml += '</ul></td>';
                tableDataHtml += _actionColumnHtml;
            }

            $scope.setFooterPagingInformation = function () {
                if (showFooterPagging) {
                    var _footerPagingTemplate = '<div class="row-fluid show-grid">' +
                                            '<div class="span6">' +
                                            '<div  >{{getPagingString()}}</div>' +
                                            '</div>' +
                                            '<div class="span6 ">' +
                                            '<ul class="pagingControl" >' +
                                            '<li class="rx-pagingcontrols">' +
                                            '<button class="btn " ng-disabled="currentPage == 0" ng-click="previousPage()">  <div class="previous-control"></div> </button>' +
                                            '</li>' +
                                            '<li class="rx-pagingcontrols">' +
                                            '<button class="btn  " ng-disabled="currentPage >= filteredRxgs.length/pageSize - 1" ng-click="nextPage()"><div class="next-control"></div> </button>' +
                                            '</li>' +
                                            '</ul>' +
                                            '</div>' +
                                            '</div>';
                    return _footerPagingTemplate;
                }
                return '';
            }

            $scope.getPagingString = function () {

                if ($scope.filteredRxgs.length == 0) {
                    return "No result found";
                }
                else {
                    return $scope.setPagingString();
                }
            }
            $scope.nextPage = function () {
                if ($scope.subGridRowClass != "") {
                    $("." + $scope.subGridRowClass).remove();
                }
                $scope.currentPage = $scope.currentPage + 1
            }

            $scope.previousPage = function () {
                if ($scope.subGridRowClass != "") {
                    $("." + $scope.subGridRowClass).remove();
                }
                $scope.currentPage = $scope.currentPage - 1
            }

            $scope.setPagingString = function () {

                if ($scope.currentPage == 0) {
                    var cp = 1,
                    totallength = $scope.filteredRxgs.length,
                    rcnum = cp * $scope.pageSize - $scope.pageSize + 1;
                    tonum = cp * $scope.pageSize;
                    tonum = (totallength < tonum) ? totallength : tonum
                    var a = (isFilter) ? '(filtered from ' + $scope.rxgs.gridObject.length + ' total entries)' : '';
                    return 'Showing ' + rcnum + '-' + tonum + ' of ' + totallength + ' entries ' + a;
                }
                else {
                    var cp = $scope.currentPage + 1,
                    rcnum = cp * $scope.pageSize - $scope.pageSize + 1,
                    totallength = $scope.filteredRxgs.length,
                    tonum = cp * $scope.pageSize;
                    if (tonum > totallength) {
                        tonum = totallength;
                    }
                    var a = (isFilter) ? '(filtered from ' + $scope.rxgs.gridObject.length + ' total entries)' : '';
                    return 'Showing ' + rcnum + '-' + tonum + ' of ' + totallength + ' entries ' + a;
                }
            }

            $scope.internalJsonFilter = function (jObject, search) {
                return $filter('filter')(jObject, search);
            }

            $scope.deleteObject = function (_jArray, _jObject) {
                var i = _jArray.indexOf(_jObject);
                if (i != -1) {
                    _jArray.splice(i, 1);
                }
                return _jArray;
            }

            $scope.updateGridControlData = function (_eventName) {
                if ($scope.UpdateColumnName == "All") {
                    if (!subGrid) {
                        $scope.$parent["gridcustomize"] = $scope.UpdateJsonArray;
                    } else {
                        $scope.$parent.$parent["gridcustomize"] = $scope.UpdateJsonArray;
                    }
                    for (var i = 0; i < $scope.jsonObjectNames.length; i++) {
                        var _jsonArray = $scope.UpdateJsonArray[$scope.jsonObjectNames[i].jsonObjectName];
                        if (!angular.isUndefined(_jsonArray)) {
                            for (var j = 0; j < _jsonArray.length; j++) {
                                $scope.UpdateJsonArray[$scope.jsonObjectNames[i].jsonObjectName][j]["previous" + $scope.jsonObjectNames[i].dataField] = $scope.UpdateJsonArray[$scope.jsonObjectNames[i].jsonObjectName][j][$scope.jsonObjectNames[i].dataField];
                            }
                        }
                    }
                    $scope.UpdateJsonArray = {};

                } else {
                    if (!subGrid) {
                        $scope.$parent["gridcustomize"] = $scope.UpdateJsonArray[$scope.UpdateColumnName];
                    } else {
                        $scope.$parent.$parent["gridcustomize"] = $scope.UpdateJsonArray[$scope.UpdateColumnName];
                    }
                    var _jsonArray = $scope.UpdateJsonArray[$scope.UpdateColumnName],
                        _dataField = rxJson.find($scope.jsonObjectNames, { jsonObjectName: $scope.UpdateColumnName })[0].dataField;
                    for (var j = 0; j < _jsonArray.length; j++) {
                        $scope.UpdateJsonArray[$scope.UpdateColumnName][j]["previous" + _dataField] = $scope.UpdateJsonArray[$scope.UpdateColumnName][j][_dataField];
                    }
                    $scope.UpdateJsonArray[$scope.UpdateColumnName] = [];
                }
                if (!subGrid) {
                    $scope.$parent.$eval(_eventName + "(gridcustomize)");
                } else {
                    $scope.$parent.$parent.$eval(_eventName + "(gridcustomize)");
                }

            }

            $scope.disabledWithSubgridUpdateButton = function () {
                for (var col in rxData.subGridJsonArray) {
                    return true;
                }
                for (var i = 0; i < $scope.jsonObjectNames.length; i++) {
                    if ($scope.UpdateColumnName == "All") {
                        if (!angular.isUndefined($scope.UpdateJsonArray[$scope.jsonObjectNames[i].jsonObjectName])) {
                            if ($scope.UpdateJsonArray[$scope.jsonObjectNames[i].jsonObjectName].length > 0) {
                                return true;
                            }
                        }
                    } else {
                        if (!angular.isUndefined($scope.UpdateJsonArray[$scope.UpdateColumnName])) {
                            if ($scope.UpdateJsonArray[$scope.UpdateColumnName].length > 0) {
                                return true;
                            }
                        }
                    }
                }
                return false;
            }

            $scope.disabledUpdateButton = function () {
                for (var i = 0; i < $scope.jsonObjectNames.length; i++) {
                    if ($scope.UpdateColumnName == "All") {
                        if (!angular.isUndefined($scope.UpdateJsonArray[$scope.jsonObjectNames[i].jsonObjectName])) {
                            if ($scope.UpdateJsonArray[$scope.jsonObjectNames[i].jsonObjectName].length > 0) {
                                return true;
                            }
                        }
                    } else {
                        if (!angular.isUndefined($scope.UpdateJsonArray[$scope.UpdateColumnName])) {
                            if ($scope.UpdateJsonArray[$scope.UpdateColumnName].length > 0) {
                                return true;
                            }
                        }
                    }
                }
                return false;
            }

            $scope.disabledSubGridUpdateButton = function () {
                for (var col in rxData.subGridJsonArray) {
                    return true;
                }
                return false;
            }

            $scope.updateSubGridControlData = function (_eventName) {
                $scope.$parent.$eval(_eventName + "()");
            }

            $scope.checkUpdateScopeObject = function (tableRow) {
                if ($scope.UpdateDataDropdownObject.length == 0) {
                    $scope.UpdateDataDropdownObject.push({ objectName: "All", UpdateColumnText: "All" });
                }
                $scope.UpdateDataDropdownObject.push({ objectName: tableRow.jsonObjectName, UpdateColumnText: tableRow.headerText });
                $scope.jsonObjectNames.push({ jsonObjectName: tableRow.jsonObjectName, dataField: tableRow.dataField });
            }
            this.isSubGrid = function (_attrs) {
                attrs = _attrs;
            }
            $scope.createCustomColumns = false;
            this.updateGridSource = function (objectValue) {
                if (!angular.isUndefined(objectValue)) {
                    var _subGrid = !angular.isUndefined($scope.subGrid) ? $scope.subGrid : false;
                    if (!$scope.createCustomColumns) {
                        $scope.setGrid();
                    }
                }

            }

            $scope.$watch("gridSource", this.updateGridSource, true);
        },
        link: function (scope, elm, attrs, gridctrl) {
            if (!angular.isUndefined(attrs.subgrid)) {
                gridctrl.isSubGrid(attrs);
            }
        },
        replace: true
    };
});
rx.filter('startIndex', function () {
    return function (input, start) {
        start = +start;
        return input.slice(start);
    }
});

rx.directive('rxLazyload', function () {
    return function (scope, elm, attr) {
        var raw = elm[0];
        elm.bind('scroll', function () {
            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                scope.$apply(attr.rxLazyload);;
            }
        });
    };
});

rx.directive('rxPrintForm', function ($compile, rxJson, cacheData, rxUtils) {
    return {
        restrict: 'E',
        scope: {
            'printFormSource': '=',
            'printEnums': '=',
            'printProperties': '=',
            'htmlProperties': '=',
            'editForm': '=',
            'checkboxColumn': '=',
            'agencyData': '=',
            'childPropertyGroupSource': '=',
            'variantValues': '=',
            'paperSource':'='
        },
        controller: function ($scope, $element) {
            var htmlForm = '',
                isChild = false,
                globalPropertyName = '',
                    subMapId = false,
                    mainPropertyId = '',
                    mainPropertyName = '';
            $scope.frms = $scope.formSource = $scope.printFormSource;
            $scope.formEditSource = true;
            var setScopeObjects = {};
            setScopeObjects = $scope;

            $scope.setForm = function (objectValue) {
                $scope.showControl = true;
                //cacheData.clear("mainForm")
                //cacheData.clear("jObjects")
                removeElementsArray = [];
                var dynamicForm = '';
                if (!$scope.editForm) {
                    var printjson = _.sortBy(objectValue, "sortOrder");
                    printjson = _.groupBy(printjson, "propertyGroupName");
                    var pJArray = [];
                    for (var col in printjson) {
                        pJArray.push({ propertyGroupName: col, sortOrder: printjson[col][0].propertyGroupSortOrder, jsonResult: printjson[col] });
                    }
                    var sortedJson = _.sortBy(pJArray, "sortOrder");
                    printjson = {};
                    for (var i = 0; i < sortedJson.length; i++) {
                        printjson[sortedJson[i].propertyGroupName] = sortedJson[i].jsonResult;
                    }

                    dynamicForm = '<div id="mainForm"> <form class="form-horizontal child-form">';
                    for (var i = 0; i < sortedJson.length; i++) {
                        htmlForm = '<div id="' + $scope.spaceRemover(sortedJson[i].jsonResult[0].propertyGroupName) + '" class="row-fluid"><div class="span12"><div ><legend class="ng-binding font-size-15">' + sortedJson[i].jsonResult[0].propertyGroupName + '</legend>' +
                               '</div><div >';
                        $scope.createForm(sortedJson[i].jsonResult,sortedJson[i].jsonResult[0].propertyGroupName);
                        dynamicForm += htmlForm;
                        dynamicForm += '</div></div></div>';
                    }
                    //angular.forEach(printjson, function (rowColumn) {
                    //    htmlForm = '<div id="validation" class="row-fluid"><div class="span12"><div class="box corner-all"><div class="box-header grd-white color-silver-dark corner-top"><div class="header-control">' +
                    //           '<a data-box="collapse"><i class="icofont-caret-up"></i></a><a data-box="close">×</a></div><span>' + rowColumn[0].propertyGroupName + '</span></div><div class="box-body">';
                    //    $scope.createForm(rowColumn);
                    //    dynamicForm += htmlForm;
                    //    dynamicForm += '</div></div></div></div>';
                    //});
                    dynamicForm += '</div><div id="duplicateForm"></div><button class="btn btn-primary" ng-click="submitData()">Submit</button>';
                    //if (!angular.isUndefined(cacheData.fetch("mainForm"))) {
                    //    dynamicForm = rxUtils.convertToHtml(cacheData.fetch("mainForm"));
                    //    var jObject = cacheData.fetch("jObjects");
                    //    for (var col in jObject) {
                    //        $scope[col] = jObject[col];
                    //    }
                    //}
                    

                } else {
                    dynamicForm = '<div id="mainForm">';
                    var jObject = JSON.parse($scope.htmlProperties.jsonData);
                    for (var col in jObject) {
                        if (col != "htmlProperties") {
                            $scope[col] = jObject[col];
                        }
                    };
                    dynamicForm += rxUtils.convertToHtml($scope.htmlProperties.htmlData);
                    dynamicForm = ($scope.printFormAttributes.mode == undefined) ? S(dynamicForm).replaceAll('id="', 'id="s').s : dynamicForm;
                    $scope.showControl = ($scope.printFormAttributes.mode == undefined) ? false : true;
                    dynamicForm += (!$scope.showControl) ? '</div><div id="duplicateForm"></div>' : '</div><div id="duplicateForm"></div><button ng-click="submitData()">Submit</button>';

                }
                $scope.formEditSource = false;
                $($element).html($compile(dynamicForm)($scope));
                var t = setTimeout(function () {
                    for (var i = 0; i < removeElementsArray.length; i++) {
                        $("#" + removeElementsArray[i]).remove();
                    }
                }, 500);

                $scope.printFormSource.resetForm = function (printFormSource, printEnums, printProperties, htmlProperties, editForm, checkboxColumn, agencyData, childPropertyGroupSource, variantValues) {
                    //$scope = setScopeObjects;
                    $scope.htmlProperties = htmlProperties;
                    $scope.printFormSource = printFormSource;
                    $scope.printEnums = printEnums;
                    $scope.printProperties = printProperties;
                    $scope.htmlProperties = htmlProperties;
                    $scope.editForm = editForm;
                    //$scope.checkboxColumn = checkboxColumn;
                    //$scope.agencyData = agencyData;
                    $scope.childPropertyGroupSource = childPropertyGroupSource;
                    //$scope.variantValues = variantValues;
                    $scope.setForm($scope.printFormSource);
                }
            }
            
            var removeElementsArray = [];
            $scope.createForm = function (formCollection,_groupName) {
                var isInnerContent = false;
                htmlForm += '<form class="form-horizontal child-form">';
                angular.forEach(formCollection, function (rowColumn) {
                    if (rowColumn.isMain) {
                        if (rowColumn.hTMLControlName != "HyperLink" && rowColumn.hTMLControlName != "Textbox Split") {

                            if ($scope.checkboxColumn == undefined) {
                                isInnerContent = true;
                                htmlForm += '<div class="control-group child-group">' +
                                    '<label class="control-label child-label">' + rowColumn.propertyName + '</label>';
                                htmlForm += $scope.setControl(rowColumn);
                                htmlForm += '</div>';
                            } else {
                                if (rowColumn.hTMLControlName == "Single Select Dropdown" || rowColumn.hTMLControlName == "Textbox" || rowColumn.hTMLControlName == "Multi Select Dropdown" || rowColumn.hTMLControlName == "NumericTextbox") {
                                    var _str = $scope.agencyCheckbox(rowColumn);
                                    if (_str != "") {
                                        isInnerContent = true;
                                        htmlForm += $scope.agencyCheckbox(rowColumn);
                                        htmlForm += '</div>';
                                    }

                                }
                            }



                        }
                        if (rowColumn.hTMLControlName == "Textbox Split" && $scope.checkboxColumn == undefined) {
                            //ajay-ojha
                            htmlForm += '<div id="splitPropertyId"></div>' + '<div class="controls"><button class="btn btn-primary pull-right margin-button-right " ng-show="showRemoveButton()" ng-click="removeSplitBox(splitProperty)" >Remove</button><button ng-show="showControl" class="btn btn-primary pull-right margin-button-right" ng-click="changeSplitBox()" >Split</button></div>';
                            $scope.splitHtmlContent = $scope.setSplitBox(rowColumn);
                        }
                        //if (isChild) {
                        //    htmlForm +='<div class="control-group dispnone" id="'+globalPropertyName+'"></div>';
                        //}
                    }
                });
                htmlForm += '</form>';
                if (!isInnerContent) {
                    removeElementsArray.push($scope.spaceRemover(_groupName));
                }
            }


            $scope.showRemoveButton = function () {
                if ($scope.showControl) {
                    if ($scope.splitProperty.length > 0) {
                        return true;
                    }
                }
                return false;
            }
            $scope.splitHtmlContent = '';
            $scope.submitData = function (_isAgency) {


            

                if ($scope.splitProperties.length > 0) {
                    //$("#splitPropertyId").html(globalFrmDesign);
                }
                var jObject = {};
                if ($scope.checkboxColumn == undefined) {
                    for (var col in $scope) {
                        if (col != "this" && col != "showAgencyProperties" && col != "agencyCheck" && col != "checkboxColumn" && col != "printFormAttributes" && col != "$$asyncQueue" && col != "$$childHead" && col != "$$childTail" && col != "$$listeners" && col != "$$nextSibling" && col != "$$phase" && col != "$$prevSibling" && col != "$$watchers" && col != "$id" && col != "$parent" && col != "$root" && col != 'paperSource' && col != 'variantValues' && col != 'childPropertyGroupSource' && col != 'agencyData' && col != 'checkboxColumn' && col != 'editForm' && col != 'htmlProperties' && col != 'printProperties' && col != 'printEnums' && col != 'printFormSource') {
                            jObject[col] = $scope[col];
                        }
                        var c = col;
                    }
                    var htmlData = {
                        jsonData: JSON.stringify(jObject),
                        htmlData: rxUtils.safeHtml($("#mainForm").html())
                    }
                    $scope.$parent["submitForm"] = $scope.jsonObject;
                    $scope.$parent["htmlData"] = htmlData;
                    $scope.$parent.$eval($scope.printFormAttributes.printEvent + "(submitForm,htmlData)");
                } else {
                    for (var col in $scope) {
                        if (col != "this" && col != "checkboxColumn" && col != "printFormAttributes" && col != "$$asyncQueue" && col != "$$childHead" && col != "$$childTail" && col != "$$listeners" && col != "$$nextSibling" && col != "$$phase" && col != "$$prevSibling" && col != "$$watchers" && col != "$id" && col != "$parent" && col != "$root" && col != 'paperSource' && col != 'variantValues' && col != 'childPropertyGroupSource' && col != 'agencyData' && col != 'checkboxColumn' && col != 'editForm' && col != 'htmlProperties' && col != 'printProperties' && col != 'printEnums' && col != 'printFormSource' ) {
                            jObject[col] = $scope[col];
                        }
                        var c = col;
                    }
                    var htmlData = {
                        jsonData: JSON.stringify(jObject),
                        htmlData: rxUtils.safeHtml($("#mainForm").html())
                    }
                    $scope.$parent["submitForm"] = $scope.agencyCheck;
                    $scope.$parent["agencyTextx"] = $scope.agencyText;
                    $scope.$parent["htmlData"] = htmlData;

                    $scope.$parent.$eval($scope.printFormAttributes.printEvent + "(submitForm,agencyTextx,htmlData)");
                }



                //var a = 
                //cacheData.save("jObjects", jObject);
                //cacheData.save("mainForm", rxUtils.safeHtml($("#mainForm").html()));
                //$("#duplicateForm").html($compile($("#mainForm").html())($scope))
            }

            $scope.setControl = function (rowColumn, isSplitcontrol) {
                switch (rowColumn.hTMLControlName) {
                    case "NumericTextbox":
                        return $scope.setNumericTextBox(rowColumn, isSplitcontrol);
                        break;
                    case "Textbox":
                        return $scope.setTextBox(rowColumn, isSplitcontrol);
                        break;
                    case "Single Select Dropdown":
                        return $scope.setSelect(rowColumn, isSplitcontrol);
                        break;
                    case "Multi Select Dropdown":
                        return $scope.setMultiSelect(rowColumn, isSplitcontrol);
                        break;
                    case "Auto Complete":
                        return $scope.setTypeahead(rowColumn, isSplitcontrol);
                        break;
                    case "Textbox Split":
                        return $scope.setTextBoxSplit(rowColumn, isSplitcontrol);
                        break;
                }
            }

            $scope.changeSplitBox = function () {
                $(".remove-button-form").remove();
                $scope.splitProperty.push({ splitIndex: $scope.splitProperties.length });
                var htmlDesginSplit = S($scope.splitHtmlContent).replaceAll('id="split"', 'id="split' + $scope.splitProperty.length + '"').s;
                htmlDesginSplit = S(htmlDesginSplit).replaceAll('removeSplitBox(splitProperty)', 'removeSplitBox(' + ($scope.splitProperty.length - 1) + ')').s;
                htmlDesginSplit = S(htmlDesginSplit).replaceAll('{{splitText}}', 'Split ' + $scope.splitProperty.length).s;
                htmlDesginSplit = S(htmlDesginSplit).replaceAll('{{$index}}', ($scope.splitProperty.length- 1)).s;
                htmlDesginSplit = S(htmlDesginSplit).replaceAll('$index', ($scope.splitProperty.length - 1)).s;
                htmlDesginSplit = S(htmlDesginSplit).replaceAll('splitProperty[0]', 'splitProperty['+($scope.splitProperty.length - 1)+']').s;
                $("#splitPropertyId").append($compile(htmlDesginSplit)($scope));
            }
            $scope.splitProperties = [];
            $scope.removeSplitBox = function (splitProperty) {
                
                var i =$scope.splitProperty.length;
                $("#split" + i).remove();
                $scope.splitProperty.splice((i-1), 1);
                
            }
            var globalFrmDesign = '';
            $scope.splitProperty = [];
            $scope.setSplitBox = function (_rowColumn) {

                splitPropertyId = _rowColumn.propertyId;
                var _isMandatory = _rowColumn.isMandatory,
                _isRequired = (_isMandatory) ? "rx-required" : '';
                isSplitText = false;

                var search = { propertyId: splitPropertyId };
                var find = rxJson.find($scope.childPropertyGroupSource, search);
                var mainFrmDesign = '';// '<div id="splitPropertyId">';
                var formDesign = '<div id="split" ng-show="splitProperty.length > 0"><h5>{{splitText}}</h5><div class="control-group child-group"><label class="control-label child-label"></label><div class="controls"></div></div>';
                for (var ab = 0; ab < find.length; ab++) {
                    var findProperty = rxJson.find($scope.printFormSource, { propertyId: find[ab].childPropertyGroupmappingPropertyId });
                    if (findProperty.length > 0) {
                        //mainPropertyId = _propertyId;
                        //mainPropertyName = _propertyName;
                        //ischildPropertyGroup = true;
                        //textBoxEnumId = find[ab].enumMapIds;
                        formDesign += '<div class="control-group child-group">' +
                        '<label class="control-label child-label">' + findProperty[0].propertyName + '</label>';
                        formDesign += $scope.setControl(findProperty[0], true);
                        formDesign += '</div>';
                    }
                }
                formDesign += '</div>';
                globalFrmDesign = formDesign;
                //formDesign = mainFrmDesign + formDesign + "</div>";
                formDesign = mainFrmDesign + formDesign;
                //formDesign += '<div class="controls"><button ng-show="showControl" class="btn btn-primary pull-right" ng-click="changeSplitBox()" >Split</button></div>';
                return formDesign;
            }
            var isSplitText = false;
            var splitPropertyId = '';
            var _splitRowColumn = ''
            $scope.setTextBoxSplit = function (_rowColumn) {
                isSplitText = true;
                _splitRowColumn = _rowColumn;
            }

            $scope.setNumericTextBox = function (_rowColumn, isSplitcontrol) {
                var maxLength = !angular.isUndefined(_rowColumn.maxLength) ? "maxlength='" + _rowColumn.maxLength + "'" : '';
                if (!angular.isUndefined($scope.variantValues)) {
                    var find = rxJson.find($scope.variantValues, { propertyId: _rowColumn.propertyId })[0];
                    if (!angular.isUndefined(find)) {
                        return '<div class="controls">' + find.attributeValue + '</div>';
                    } else {
                        return '<div class="controls">N/A</div>';
                    }
                }
                if (angular.isUndefined(isSplitcontrol)) {
                    var _isMandatory = _rowColumn.isMandatory,
                _isRequired = (_isMandatory) ? "rx-required" : '';
                    if (subMapId) {
                        subMapId = false;
                        return '<div class="controls"><input rx-number ' + maxLength + ' class="span12" ng-show="showControl" type="text"  ng-change=\ttextChange("' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + '","' + _rowColumn.propertyId + '",rxdynamic.' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + ',"' + mainPropertyId + '","' + mainPropertyName + '")\ ng-model="rxdynamic.' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + '" ' + _isRequired + ' /><label class="control-label align-left"  ng-hide="showControl" ng-bind="rxdynamic.' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + '"></label></div>';
                    } else if (ischildPropertyGroup) {
                        ischildPropertyGroup = false;
                        var uniqueNumber = '';// rxJson.uniqueNumber();
                        return '<div class="controls"><input rx-number  ' + maxLength + '  class="span12" ng-show="showControl" type="text"  ng-change=\ttextChange("' + $scope.spaceRemover(_rowColumn.propertyGroupName + mainPropertyName + _rowColumn.propertyName) + uniqueNumber + '","' + _rowColumn.propertyId + '",rxdynamic.' + $scope.spaceRemover(_rowColumn.propertyGroupName + mainPropertyName + _rowColumn.propertyName) + uniqueNumber + ',"' + mainPropertyId + '","' + mainPropertyName + '","' + textBoxEnumId + '")\ ng-model="rxdynamic.' + $scope.spaceRemover(_rowColumn.propertyGroupName + mainPropertyName + _rowColumn.propertyName) + uniqueNumber + '" ' + _isRequired + ' /><label class="control-label align-left"  ng-hide="showControl" ng-bind="rxdynamic.' + $scope.spaceRemover(_rowColumn.propertyGroupName + mainPropertyName + _rowColumn.propertyName) + uniqueNumber + '"></label></div>';
                    } else {
                        return '<div class="controls"><input rx-number  ' + maxLength + '  class="span12" type="text" ng-show="showControl" ng-change=\ttextChange("' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + '","' + _rowColumn.propertyId + '",rxdynamic.' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + ')\ ng-model="rxdynamic.' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + '" ' + _isRequired + ' /><label class="control-label align-left"  ng-hide="showControl" ng-bind="rxdynamic.' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + '"></label></div>';
                    }
                } else {
                    return '<div class="controls"><input type="text"  ' + maxLength + '  rx-number class="span12" ng-show="showControl" ng-change=\ttextChange("' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + '","' + _rowColumn.propertyId + '",splitProperty[0].' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + ',undefined,undefined,undefined,splitProperty[0].splitIndex)\ ng-model="splitProperty[0].' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + '" ' + _isRequired + ' /><label class="control-label align-left"  ng-hide="showControl" ng-bind="splitProperty[0].' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + '"></label></div>';
                }


            }

            $scope.setTextBox = function (_rowColumn, isSplitcontrol) {
                var maxLength = !angular.isUndefined(_rowColumn.maxLength) ? "maxlength='" + _rowColumn.maxLength + "'" : '';
                if (!angular.isUndefined($scope.variantValues)) {
                    var find = rxJson.find($scope.variantValues, { propertyId: _rowColumn.propertyId })[0];
                    if (!angular.isUndefined(find)) {
                        return '<div class="controls">' + find.attributeValue + '</div>';
                    } else {
                        return '<div class="controls">N/A</div>';
                    }
                }
                if (angular.isUndefined(isSplitcontrol)) {
                    var _isMandatory = _rowColumn.isMandatory,
                _isRequired = (_isMandatory) ? "rx-required" : '';
                    if (subMapId) {
                        subMapId = false;
                        return '<div class="controls"><input type="text"   ' + maxLength + '   class="span12" ng-show="showControl" ng-change=\ttextChange("' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + '","' + _rowColumn.propertyId + '",rxdynamic.' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + ',"' + mainPropertyId + '","' + mainPropertyName + '")\ ng-model="rxdynamic.' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + '" ' + _isRequired + ' /><label class="control-label align-left"  ng-hide="showControl" ng-bind="rxdynamic.' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + '"></label></div>';
                    } else if (ischildPropertyGroup) {
                        ischildPropertyGroup = false;
                        var uniqueNumber = '';// rxJson.uniqueNumber();
                        return '<div class="controls"><input type="text"   ' + maxLength + '   class="span12" ng-show="showControl" ng-change=\ttextChange("' + $scope.spaceRemover(_rowColumn.propertyGroupName + mainPropertyName + _rowColumn.propertyName) + uniqueNumber + '","' + _rowColumn.propertyId + '",rxdynamic.' + $scope.spaceRemover(_rowColumn.propertyGroupName + mainPropertyName + _rowColumn.propertyName) + uniqueNumber + ',"' + mainPropertyId + '","' + mainPropertyName + '","' + textBoxEnumId + '")\ ng-model="rxdynamic.' + $scope.spaceRemover(_rowColumn.propertyGroupName + mainPropertyName + _rowColumn.propertyName) + uniqueNumber + '" ' + _isRequired + ' /><label class="control-label align-left"  ng-hide="showControl" ng-bind="rxdynamic.' + $scope.spaceRemover(_rowColumn.propertyGroupName + mainPropertyName + _rowColumn.propertyName) + uniqueNumber + '"></label></div>';
                    } else {
                        return '<div class="controls"><input type="text"   ' + maxLength + '   class="span12" ng-show="showControl" ng-change=\ttextChange("' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + '","' + _rowColumn.propertyId + '",rxdynamic.' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + ')\ ng-model="rxdynamic.' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + '" ' + _isRequired + ' /><label class="control-label align-left"  ng-hide="showControl" ng-bind="rxdynamic.' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + '"></label></div>';
                    }
                } else {
                    return '<div class="controls"><input type="text"   ' + maxLength + '   class="span12" ng-show="showControl" ng-change=\ttextChange("' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + '","' + _rowColumn.propertyId + '",splitProperty[0].' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + ',undefined,undefined,undefined,splitProperty[0].splitIndex)\ ng-model="splitProperty[0].' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + '" ' + _isRequired + ' /><label class="control-label align-left"  ng-hide="showControl" ng-bind="splitProperty[0].' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + '"></label></div>';
                }


            }
            $scope.jsonObject = {};
            $scope.textChange = function (_propertyName, _porpertyId, _propertyValue, _mainPropertyId, _mainPropertyName, _txtEnumMapId, _index) {
                if (angular.isUndefined(_mainPropertyId) && angular.isUndefined(_index)) {
                    $scope.jsonObject[_propertyName] = { propertyId: _porpertyId, attributeValue: _propertyValue };
                } else {
                    if (!angular.isUndefined(_index)) {
                        $scope.jsonObject[_propertyName + _index + 'split'] = { propertyId: _porpertyId, attributeValue: _propertyValue, mainPropertyId: _mainPropertyId, parentEnumMapId: _txtEnumMapId, isChild: true };
                    } else {
                        $scope.jsonObject[_propertyName] = { propertyId: _porpertyId, attributeValue: _propertyValue, mainPropertyId: _mainPropertyId, parentEnumMapId: _txtEnumMapId, isChild: true };
                    }
                }
            }

            $scope.selectAllAgencyCheck = function (_str, _strModel) {
                if (angular.isUndefined($scope.agencyCheck[_str]["isChecked"])) {
                    $scope.agencyCheck[_str]["isChecked"] = true;
                } else if ($scope.agencyCheck[_str]["isChecked"]) {
                    $scope.agencyCheck[_str]["isChecked"] = false;
                } else {
                    $scope.agencyCheck[_str]["isChecked"] = true;
                }
                for (var i = 0; i < $scope.agencyCheck[_str].length; i++) {
                    //if (angular.isUndefined($scope.agencyCheck[_str][i][_strModel])) {
                    //    $scope.agencyCheck[_str][i][_strModel] = false;
                    //}
                    $scope.agencyCheck[_str][i][_strModel] = $scope.agencyCheck[_str]["isChecked"];
                }
            }
            $scope.agencyCheck = {};
            $scope.showAgencyProperties = [
            {
                propertyId: '486c4f9b-a1d0-4b57-8796-6d90bd5f8138'
            },
            {
                propertyId: '245CCFBB-3014-4078-9F72-79F6ACE91B41'
            },
            {
                propertyId: '4d3a27e0-63e3-43b1-8ce5-3f92b98b19e3'
            },
            {
                propertyId: '83780003-4177-4790-b4c2-15be93236251'
            },
            {
                propertyId: '6ce2e33d-623c-4633-804c-f0edb4c9fada'
            },
            {
                propertyId: '30db061d-6d27-4211-baee-01ce7683c8d8'
            },
            {
                propertyId: 'f5cf510f-af68-469e-8cd5-3bf4eec8e51b'
            },
            {
                propertyId: 'f20a2b09-589b-4f73-8f75-60175f22fdab'
            },
            {
                propertyId: '9ebab600-55c9-4ebb-ab7d-ad168bf39bb5'
            }]
            $scope.agencyText = {};
            $scope.changeAgencyText = function (_propertyId, _name) {
                var minValue = !angular.isUndefined($scope.rxdynamic[_name + "min"]) ? $scope.rxdynamic[_name + "min"] : '';
                var maxValue = !angular.isUndefined($scope.rxdynamic[_name + "max"]) ? $scope.rxdynamic[_name + "max"] : '';
                $scope.agencyText[_name] = { propertyId: _propertyId, min: minValue, max: maxValue };
            }

            $scope.agencyCheckbox = function (_rowColumn) {
                globalPropertyName = $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName);
                var _propertyName = $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName),
                    _createChildDiv = '';
                if (_rowColumn.hTMLControlName == "Textbox" || _rowColumn.hTMLControlName == "NumericTextbox") {
                    var findShowProperty = rxJson.find($scope.showAgencyProperties, { propertyId: _rowColumn.propertyId });

                    var ht = '';
                    if (findShowProperty.length > 0) {
                        if (!angular.isUndefined($scope.agencyData)) {
                            var findJ = rxJson.find($scope.agencyData, { propertyId: _rowColumn.propertyId })[0];
                            if (angular.isUndefined($scope.rxdynamic)) {
                                $scope.rxdynamic = {};
                            }
                            if (!angular.isUndefined(findJ)) {
                                $scope.rxdynamic[$scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + 'min'] = findJ.propertyMinValue;
                                $scope.rxdynamic[$scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + 'max'] = findJ.propertyMaxValue;
                                var _name = $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName);
                                var _propertyId = _rowColumn.propertyId;
                                var minValue = !angular.isUndefined($scope.rxdynamic[_name + "min"]) ? $scope.rxdynamic[_name + "min"] : '';
                                var maxValue = !angular.isUndefined($scope.rxdynamic[_name + "max"]) ? $scope.rxdynamic[_name + "max"] : '';
                                $scope.agencyText[$scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName)] = { propertyId: _propertyId, min: minValue, max: maxValue };
                            }
                        }
                        var maxLengthAgency = !angular.isUndefined(_rowColumn.maxLength) ? _rowColumn.maxLength : 100;
                        ht += '<div class="control-group child-group">' +
                                    '<label class="control-label child-label" >' + _rowColumn.propertyName + '</label>';
                        ht += '<div class="controls"><span style="padding-right:10px;">Min</span><input type="text" rx-number maxlength="' + maxLengthAgency + '" ng-change=\changeAgencyText("' + _rowColumn.propertyId + '","' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + '")\ ng-model="rxdynamic.' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + 'min" /><span style="padding-left:10px; padding-right:10px;">Max</span><input type="text" maxlength="' + maxLengthAgency + '" rx-number ng-model="rxdynamic.' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + 'max" ng-change=\changeAgencyText("' + _rowColumn.propertyId + '","' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + '")\ /></div>';
                    }
                    return ht;

                } else {
                    var findShowProperty = rxJson.find($scope.showAgencyProperties, { propertyId: _rowColumn.propertyId })[0];
                    var ht = '';
                    if (angular.isUndefined(findShowProperty)) {
                        var str = $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + "s";
                        var strModel = $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + 'model';
                        ht += '<div class="control-group child-group">' +
                                        '<label class="control-label child-label" ng-click=\selectAllAgencyCheck("' + str + '","IsEnumMapmodel")\>' + _rowColumn.propertyName + '</label>';
                        for (var i = 0; i < _rowColumn.enums.length; i++) {
                            if (!angular.isUndefined($scope.agencyData)) {
                                var findJ = rxJson.find($scope.agencyData, { propertyId: _rowColumn.propertyId, enumMapId: _rowColumn.enums[i].enumMapIds })[0];
                                if (!angular.isUndefined(findJ)) {
                                    _rowColumn.enums[i].IsEnumMapmodel = true;
                                }

                            }
                            _rowColumn.enums[i].propertyId = _rowColumn.propertyId;
                        }
                        $scope.agencyCheck[$scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + "s"] = _rowColumn.enums;
                        ht += '<div class="controls"><label class="checkbox inline" ng-repeat="in' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + ' in agencyCheck.' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + 's"><input type="checkbox" ng-model="in' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + '.IsEnumMapmodel" >{{in' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + '.enumName}}</label></div>'
                    }
                    return ht;
                }

            }

            $scope.showVariantValues = function (changeObject, _rowColumn) {
                var formDesign = '';
                //if (changeObject.hasDependent == true) {
                //    mainPropertyId = changeObject.propertyId;
                //    mainPropertyName = _rowColumn.mainPropertyName;
                //    subMapId = true;
                //    noCount = 1;
                //    var search = { enumGroupId: changeObject.enumGroupId, parentEnumMapId: changeObject.enumMapIds };
                //    var find = rxJson.find($scope.printEnums, search);
                //    formDesign = '<div class="control-group"><label class="control-label">' + changeObject.enumName + '</label><div class="controls">' +
                //                     '<select ng-change=\changeSelect("' + $scope.spaceRemover(_name + changeObject.enumName) + 'model","' + _name + '","' + _propertyId + '","' + $scope.spaceRemover(_name + changeObject.enumName) + '")\ ng-model="' + $scope.spaceRemover(_name + changeObject.enumName) + 'model" ng-options="' + $scope.spaceRemover(_name + changeObject.enumName) + '.enumId as ' + $scope.spaceRemover(_name + changeObject.enumName) + '.enumName for ' + $scope.spaceRemover(_name + changeObject.enumName) + ' in ' + $scope.spaceRemover(_name + changeObject.enumName) + 's" ></select></div></div>';

                //}
                //if (changeObject.isProperty == true) {
                //    mainPropertyId = changeObject.propertyId;
                //    subMapId = true;
                //    var search = { propertyId: changeObject.propertyId };
                //    var find = rxJson.find($scope.printProperties, search);
                //    formDesign += '<div class="control-group">' +
                //    '<label class="control-label">' + find[0].propertyName + '</label>';
                //    formDesign += $scope.setControl(find[0]);
                //    formDesign += '</div>';
                //    noCount = 1;
                //}

                if (changeObject.isChildPropertyGroup == true) {
                    noCount = 1;
                    var search = { enumMapIds: changeObject.enumMapIds };
                    var find = rxJson.find($scope.childPropertyGroupSource, search);
                    for (var ab = 0; ab < find.length; ab++) {
                        var f = rxJson.find($scope.printFormSource, { propertyId: _rowColumn.propertyId });
                        var findProperty = rxJson.find($scope.printFormSource, { propertyId: find[ab].childPropertyGroupmappingPropertyId });
                        findProperty[0].propertyGroupName = _rowColumn.propertyGroupName.replace(" ", "_");
                        if (findProperty.length > 0) {
                            mainPropertyId = _rowColumn.propertyId;
                            mainPropertyName = $scope.spaceRemover(f[0].propertyName);
                            ischildPropertyGroup = true;
                            textBoxEnumId = find[ab].enumMapIds;
                            formDesign += '<div class="control-group child-group">' +
                            '<label class="control-label child-label">' + findProperty[0].propertyName + '</label>';
                            formDesign += $scope.setControl(findProperty[0]);
                            formDesign += '</div>';
                        }

                    }
                }
                return formDesign;
            }

            $scope.setSelect = function (_rowColumn, isSplitcontrol) {
                //return $scope.setTypeahead(_rowColumn);
                if (!angular.isUndefined($scope.variantValues)) {
                    var find = rxJson.find($scope.variantValues, { propertyId: _rowColumn.propertyId })[0];
                    var findEnums = rxJson.find(_rowColumn.enums, { enumMapIds: find.enumMapId })[0];
                    if (!angular.isUndefined(findEnums)) {
                        return '<div class="controls">' + findEnums.enumName + $scope.showVariantValues(findEnums, _rowColumn) + '</div>';
                    } else {
                        return '<div class="controls">N/A</div>';
                    }
                }
                globalPropertyName = $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName);
                var _propertyName = $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName),
                    _createChildDiv = '';
                if (angular.isUndefined(isSplitcontrol)) {
                    $scope[$scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + "s"] = _rowColumn.enums;
                    if ($scope.identifyDependent(_rowColumn.enums)) {
                        _createChildDiv = '<div class="dispnone" style="margin-top:15px;" id="frm' + _propertyName + '" ><div id="' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + '" ></div></div>';
                    }
                    if (ischildPropertyGroup) {
                        ischildPropertyGroup = false;
                        $scope[$scope.spaceRemover(_rowColumn.propertyGroupName + mainPropertyName + _rowColumn.propertyName) + "s"] = _rowColumn.enums;
                        return '<div class="controls"><select ng-show="showControl"  class="span12" ng-model="' + $scope.spaceRemover(_rowColumn.propertyGroupName + mainPropertyName + _rowColumn.propertyName) + 'model" ng-options="' + $scope.spaceRemover(_rowColumn.propertyGroupName + mainPropertyName + _rowColumn.propertyName) + '.enumId as ' + $scope.spaceRemover(_rowColumn.propertyGroupName + mainPropertyName + _rowColumn.propertyName) + '.enumName for ' + $scope.spaceRemover(_rowColumn.propertyGroupName + mainPropertyName + _rowColumn.propertyName) + ' in ' + $scope.spaceRemover(_rowColumn.propertyGroupName + mainPropertyName + _rowColumn.propertyName) + 's" ng-change=\changeSelect("' + $scope.spaceRemover(_rowColumn.propertyGroupName + mainPropertyName + _rowColumn.propertyName) + 'model","' + $scope.spaceRemover(_rowColumn.propertyGroupName + mainPropertyName + _rowColumn.propertyName) + '","' + _rowColumn.propertyId + '",undefined,undefined,"' + mainPropertyId + '","' + mainPropertyName + '","' + textBoxEnumId + '")\ ></select><label class="align-left"  ng-hide="showControl" ng-bind=\getDropdownText(' + $scope.spaceRemover(_rowColumn.propertyGroupName + mainPropertyName + _rowColumn.propertyName) + 'model,"' + _rowColumn.propertyId + '")\></label>' + _createChildDiv + '</div>';
                    }
                    return '<div class="controls"><select ng-show="showControl" class="span12"  ng-model="' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + 'model" ng-options="' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + '.enumId as ' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + '.enumName for ' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + ' in ' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + 's" ng-change=\changeSelect("' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + 'model","' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + '","' + _rowColumn.propertyId + '")\ ></select><label class="align-left"  ng-hide="showControl" ng-bind=\getDropdownText(' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + 'model,"' + _rowColumn.propertyId + '")\></label>' + _createChildDiv + '</div>';
                } else {
                    $scope[$scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + "s"] = _rowColumn.enums;
                    if ($scope.identifyDependent(_rowColumn.enums)) {
                        _createChildDiv = '<div class="dispnone" style="margin-top:15px;" id="frm{{$index}}' + _propertyName + '" ><div id="{{$index}}' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + '" ></div></div>';
                    }
                    return '<div class="controls"><select class="span12" ng-show="showControl" ng-model="splitProperty[0].' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + 'model" ng-options="' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + '.enumId as ' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + '.enumName for ' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + ' in ' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + 's" ng-change=\changeSelect(splitProperty[0].' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + 'model,"' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + '","' + _rowColumn.propertyId + '",undefined,undefined,undefined,undefined,undefined,$index,true)\ ></select><label class="align-left"  ng-hide="showControl" ng-bind=\getDropdownText(splitProperty[0].' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + 'model,"' + _rowColumn.propertyId + '")\></label>' + _createChildDiv + '</div>';
                }
            }
            $scope.getDropdownText = function (_id, propertyId) {
                if (!$scope.showControl) {
                    if (!angular.isUndefined(_id)) {
                        var find = rxJson.find($scope.printFormSource, { propertyId: propertyId })[0];
                        if (!angular.isUndefined(find)) {
                            find = rxJson.find(find.enums, { enumId: _id })[0];
                            if (!angular.isUndefined(find)) {

                                return find.enumName;
                            }
                        } else {
                            if (!angular.isUndefined($scope[propertyId])) {
                                find = rxJson.find($scope[propertyId], { enumId: _id })[0];
                                if (find != undefined) {
                                    return find.enumName;
                                }
                            }
                        }

                    }
                }
            }

            $scope.setMultiSelect = function (_rowColumn, isSplitcontrol) {
                $scope.rxTagModeName = ($scope.modeName == undefined) ? false : true;
                if (!angular.isUndefined($scope.variantValues)) {
                    var _str = '';
                    for (var i = 0; i < _rowColumn.enums.length; i++) {
                        var find = rxJson.find($scope.variantValues, { propertyId: _rowColumn.propertyId, enumMapId: _rowColumn.enums[i].enumMapIds })[0];
                        if (!angular.isUndefined(find)) {
                            _str += _rowColumn.enums[i].enumName + ",";
                        }
                    }
                    if (_str != '') {
                        for (var i = 0; i < _rowColumn.enums.length; i++) {
                            var find = rxJson.find($scope.variantValues, { propertyId: _rowColumn.propertyId, enumMapId: _rowColumn.enums[i].enumMapIds })[0];
                            if (!angular.isUndefined(find)) {
                                var findEnums = rxJson.find(_rowColumn.enums, { enumMapIds: find.enumMapId })[0];
                                if (!angular.isUndefined(findEnums)) {
                                    _str += $scope.showVariantValues(findEnums, _rowColumn);
                                }
                            }
                        }
                        return '<div class="controls">' + _str+'</div>';
                    } else {
                        return '<div class="controls">N/A</div>';
                    }

                }
                if (angular.isUndefined(isSplitcontrol)) {
                    var _propertyName = $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName),
                    _propertyId = _rowColumn.propertyId,
                    _createChildDiv = '';
                    $scope[$scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + "s"] = _rowColumn.enums;
                    var enumGroupId = _rowColumn.enums[0].enumGroupId;
                    if ($scope.identifyDependent(_rowColumn.enums)) {
                        _createChildDiv = '<div class="dispnone" style="margin-top:15px;" id="frm' + _propertyName + '" ><div id="' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + '" >';
                        for (var i = 0; i < _rowColumn.enums.length; i++) {
                            if (_rowColumn.enums[i].hasDependent == true) {
                                _createChildDiv += '<div id="' + $scope.spaceRemover(_propertyName + _rowColumn.enums[i].enumName) + '" ></div>';
                            }
                            if (_rowColumn.enums[i].isProperty == true && _rowColumn.enums[i].hasDependent == false) {
                                _createChildDiv += '<div id="' + $scope.spaceRemover(_propertyName + _rowColumn.enums[i].enumName) + '" ></div>';
                            }
                            if (_rowColumn.enums[i].isChildPropertyGroup == true) {
                                _createChildDiv += '<div id="' + $scope.spaceRemover(_propertyName + _rowColumn.enums[i].enumName) + '" ></div>';
                            }
                        }
                        _createChildDiv += '</div></div>';
                    }
                    return '<div class="controls"><input  type="text" rx-tags mode-name="rxTagModeName" show-tag="showControl" rx-tag-dynamic  rx-tagsevent=\multiSelectChange("' + enumGroupId + '",rxModel,tagSource,"' + _propertyName + '","' + _propertyId + '")\ class="span12" rx-text="enumName" rx-model="rxdynamic.' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + '" rx-value="enumMapIds" rx-source="' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + 's" /><label class="control-label align-left"  ng-hide="showControl" style="width:100% !important; margin-top:-15px;" ng-bind=\getMultiSelectDropdownText(rxdynamic.' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + ',"' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + 's")\></label>' + _createChildDiv + '</div>';
                } else {
                    var _propertyName = $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName),
                    _propertyId = _rowColumn.propertyId,
                    _createChildDiv = '';
                    $scope[$scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + "s"] = _rowColumn.enums;
                    var enumGroupId = _rowColumn.enums[0].enumGroupId;
                    if ($scope.identifyDependent(_rowColumn.enums)) {
                        _createChildDiv = '<div class="dispnone" style="margin-top:15px;" id="{{$index}}frm' + _propertyName + '" ><div id="{{$index}}' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + '" >';
                        for (var i = 0; i < _rowColumn.enums.length; i++) {
                            if (_rowColumn.enums[i].hasDependent == true) {
                                _createChildDiv += '<div id="{{$index}}' + $scope.spaceRemover(_propertyName + _rowColumn.enums[i].enumName) + '" ></div>';
                            }
                            if (_rowColumn.enums[i].isProperty == true && _rowColumn.enums[i].hasDependent == false) {
                                _createChildDiv += '<div id="{{$index}}' + $scope.spaceRemover(_propertyName + _rowColumn.enums[i].enumName) + '" ></div>';
                            }
                            if (_rowColumn.enums[i].isChildPropertyGroup == true) {
                                _createChildDiv += '<div id="{{$index}}' + $scope.spaceRemover(_propertyName + _rowColumn.enums[i].enumName) + '" ></div>';
                            }
                        }
                        _createChildDiv += '</div></div>';
                    }
                    return '<div class="controls"><input type="text" rx-tags rx-tag-dynamic mode-name="rxTagModeName" show-tag="showControl"  rx-tagsevent=\multiSelectChange("' + enumGroupId + '",rxModel,tagSource,"' + _propertyName + '","' + _propertyId + '",$index,true)\ class="span12" rx-text="enumName" rx-model="splitProperty[0].' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + '$index" rx-value="enumMapIds" rx-source="' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + 's" /><label class="control-label align-left"  ng-hide="showControl" style="width:100% !important; margin-top:-15px;" ng-bind=\getMultiSelectDropdownText(splitProperty[0].' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + '$index,"' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + 's")\></label>' + _createChildDiv + '</div>';
                }

            }

            var multiSelectJson = {};

            var ischildPropertyGroup = false;
            $scope.getMultiSelectDropdownText = function (_rxModel, _sourceName) {
                if(!angular.isUndefined(_rxModel)){
                    if (!angular.isUndefined($scope[_sourceName])) {
                        var splitText = _rxModel.split(",");
                        var returnText = '';
                        for (var i = 0; i < splitText.length; i++) {
                            var find = rxJson.find($scope[_sourceName], { enumMapIds: splitText[i] })[0];
                            if(!angular.isUndefined(find)){
                                returnText += find.enumName +", ";
                            }
                        }
                        return returnText;
                    }
                }
            }

            $scope.multiSelectChange = function (_enumGroupId, _value, _tagSource, _propertyName, _propertyId, _index, _isSplit) {
                if (!angular.isUndefined(_isSplit)) {
                    var _sValue = _value.split(",");
                    for (var i = 0; i < _sValue.length; i++) {
                        $scope.jsonObject[_propertyName + $scope.spaceRemover(_sValue[i]) + _index] = { propertyId: _propertyId, enumMapId: _sValue[i] };
                    }
                } else {
                    var _sValue = _value.split(",");
                    for (var i = 0; i < _sValue.length; i++) {
                        $scope.jsonObject[_propertyName + $scope.spaceRemover(_sValue[i])] = { propertyId: _propertyId, enumMapId: _sValue[i] };
                    }
                }

                //if (angular.isUndefined(_mainPropertyId)) {
                //    $scope.jsonObject[_propertyName] = { propertyId: _propertyId, enumMapId: changeObject.enumMapIds };
                //} else {
                //    $scope.jsonObject[_propertyName] = { propertyId: _propertyId, enumMapId: changeObject.enumMapIds, mainPropertyId: _mainPropertyId, parentEnumMapId: _txtEnumMapId, isChild: true };
                //}
                if (angular.isUndefined(_index)) {
                    _index = '';
                }
                var sameMultiSelectObjects = [];
                var _enumMapIds = _value.split(",");
                var _ename = '';
                if (angular.isUndefined(multiSelectJson[_propertyName])) {
                    multiSelectJson[_propertyName] = _enumMapIds;
                } else {
                    if (multiSelectJson[_propertyName].length < _enumMapIds.length) {

                    } else {
                        for (var j = 0; j < multiSelectJson[_propertyName].length; j++) {
                            if (angular.isUndefined(_enumMapIds[j])) {
                                var iden = false;
                                for (var k = 0; k < _enumMapIds.length; k++) {
                                    if (_enumMapIds[k] == multiSelectJson[_propertyName][j]) {
                                        iden = true;
                                        break;
                                    }
                                }
                                if (!iden) {
                                    sameMultiSelectObjects.push({ enumMapId: multiSelectJson[_propertyName][j] });
                                }
                            } else {
                                if (_enumMapIds[j] != multiSelectJson[_propertyName][j]) {
                                    sameMultiSelectObjects.push({ enumMapId: multiSelectJson[_propertyName][j] });
                                }
                            }
                        }
                    }
                    multiSelectJson[_propertyName] = _enumMapIds;
                }
                var noCount = 0;
                $("#" + _index + "frm" + _propertyName).removeClass("dispnone").addClass("dispnormal");
                for (var a = 0; a < _tagSource.length; a++) {
                    for (var i = 0; i < sameMultiSelectObjects.length; i++) {
                        if (sameMultiSelectObjects[i].enumMapId == _tagSource[a].enumMapIds) {
                            for (var b = 0; b < $scope.jsonObject[_propertyName].length; b++) {
                                var e = $scope.spaceRemover(_propertyName + _tagSource[a].enumName);
                                if (!angular.isUndefined($scope.jsonObject[_propertyName][b]["main" + e])) {
                                    $scope.jsonObject[_propertyName].splice(b, 1);
                                }
                            }
                        }
                    }
                    var _enum = $scope.spaceRemover(_propertyName + _tagSource[a].enumName);
                    var isBlankHtml = true;
                    if (multiSelectJson[_propertyName].length > 0) {
                        for (var ab = 0; ab < multiSelectJson[_propertyName].length; ab++) {
                            if (_tagSource[a].enumMapIds == multiSelectJson[_propertyName][ab]) {
                                isBlankHtml = false;
                            }
                        }
                    }
                    
                    if (isBlankHtml) {
                        $("#" + _index + _enum).html('');
                    }
                }
                for (var i = 0; i < _enumMapIds.length; i++) {
                    noCount = 0;
                    var formDesign = '';
                    for (var j = 0; j < _tagSource.length; j++) {
                        var _createChildDiv = '',
                               _enumName = $scope.spaceRemover(_propertyName + _tagSource[j].enumName);
                        _ename = $scope.spaceRemover(_tagSource[j].enumName);
                        if (_tagSource[j].enumMapIds == _enumMapIds[i]) {
                            if (multiSelectJson[_propertyName].length > 0) {
                                for (var ab = 0; ab < multiSelectJson[_propertyName].length; ab++) {
                                    if (_tagSource[j].enumMapIds == multiSelectJson[_propertyName][ab]) {
                                        isBlankHtml = true;
                                        var divElement = $("#" + _index + _enumName + " .controls").find("div");
                                        if (!angular.isUndefined(divElement[0])) {
                                            isBlankHtml = false;
                                            break;
                                        }
                                    }
                                }
                            }
                            if (angular.isUndefined($scope.jsonObject[_propertyName])) {
                                $scope.jsonObject[_propertyName] = [];
                            }
                            var identifyColumn = false;
                            changeObject = _tagSource[j];
                            //if (changeObject.hasDependent == true || changeObject.isProperty == true || changeObject.isChildPropertyGroup == true) {
                            //    for (var a = 0; a < $scope.jsonObject[_propertyName].length; a++) {
                            //        if (!angular.isUndefined($scope.jsonObject[_propertyName][a]["main" + _enumName])) {
                            //            identifyColumn = true;
                            //            break;
                            //        }
                            //    }
                            //    if (!identifyColumn) {
                            //        $scope.jsonObject[_propertyName].push({});
                            //        $scope.jsonObject[_propertyName][$scope.jsonObject[_propertyName].length - 1]["main" + _enumName] = [{}];
                            //        $scope.jsonObject[_propertyName][$scope.jsonObject[_propertyName].length - 1]["main" + _enumName][0]["main"] = { propertyId: _propertyId, propertyValue: changeObject.enumName, mainPropertyId: '', enumMapId: changeObject.enumMapIds };
                            //    }
                            //} else {
                            //    identifyColumn = false;
                            //    for (var a = 0; a < $scope.jsonObject[_propertyName].length; a++) {
                            //        if (!angular.isUndefined($scope.jsonObject[_propertyName][a]["main" + _enumName])) {
                            //            identifyColumn = true;
                            //            break;
                            //        }
                            //    }
                            //    if (!identifyColumn) {
                            //        $scope.jsonObject[_propertyName].push({});
                            //        $scope.jsonObject[_propertyName][$scope.jsonObject[_propertyName].length - 1]["main" + _enumName] = { propertyId: _propertyId, propertyValue: changeObject.enumName, mainPropertyId: '', enumMapId: changeObject.enumMapIds };
                            //    }
                            //}
                            if (_tagSource[j].hasDependent == true) {
                                noCount = 1;
                                var f = rxJson.find($scope.printFormSource, { propertyId: _propertyId });
                                var search = { enumGroupId: _enumGroupId, parentEnumMapId: _tagSource[j].enumMapIds };
                                var find = rxJson.find($scope.printEnums, search);
                                $scope[$scope.spaceRemover(_propertyName + f[0].propertyGroupName.replace(" ", "_") + _tagSource[j].enumName) + "s"] = find;
                                if ($scope.identifyDependent(find)) {
                                    _createChildDiv = '<div id="' + _enumName + '" ></div>'
                                }

                                formDesign += '<div class="control-group child-group"><label class="control-label child-label">' + _tagSource[j].enumName + '</label><div class="controls">' +
                                         '<select ng-show="showControl"  class="span12" ng-change=\changeSelect("' + $scope.spaceRemover(_propertyName + f[0].propertyGroupName.replace(" ", "_") + _tagSource[j].enumName) + 'model' + _index + '","' + $scope.spaceRemover(_propertyName + f[0].propertyGroupName.replace(" ", "_") + _tagSource[j].enumName) + '","",undefined,undefined,"' + _propertyId + '","' + mainPropertyName + '","' + _tagSource[j].enumMapIds + '")\ ng-model="' + $scope.spaceRemover(_propertyName + f[0].propertyGroupName.replace(" ", "_") + _tagSource[j].enumName) + 'model' + _index + '" ng-options="' + $scope.spaceRemover(_propertyName + f[0].propertyGroupName.replace(" ", "_") + _tagSource[j].enumName) + '.enumId as ' + $scope.spaceRemover(_propertyName + f[0].propertyGroupName.replace(" ", "_") + _tagSource[j].enumName) + '.enumName for ' + $scope.spaceRemover(_propertyName + f[0].propertyGroupName.replace(" ", "_") + _tagSource[j].enumName) + ' in ' + $scope.spaceRemover(_propertyName + f[0].propertyGroupName.replace(" ", "_") + _tagSource[j].enumName) + 's" ></select><label class="control-label align-left"  ng-hide="showControl" ng-bind=\getDropdownText(' + $scope.spaceRemover(_propertyName + f[0].propertyGroupName.replace(" ", "_") + _tagSource[j].enumName) + 'model' + _index + ',"' + $scope.spaceRemover(_propertyName + f[0].propertyGroupName.replace(" ", "_") + _tagSource[j].enumName) + 's")\></label>' + _createChildDiv + '</div></div>';

                            }

                            var htmlGroupDesign = '';
                            if (_tagSource[j].isProperty == true) {
                                noCount = 1;
                                var search = { propertyId: _tagSource[j].propertyId };
                                var find = rxJson.find($scope.printProperties, search);
                                formDesign += '<div class="control-group child-group">' +
                                '<label class="control-label child-label">' + find[0].propertyName + '</label>';
                                formDesign += $scope.setControl(find[0]);
                                formDesign += '</div>';
                            }

                            if (_tagSource[j].isChildPropertyGroup == true) {
                                noCount = 1;
                                var search = { enumMapIds: _tagSource[j].enumMapIds };

                                var find = rxJson.find($scope.childPropertyGroupSource, search);
                                htmlGroupDesign = '<h5>' + _tagSource[j].enumName + '</h5>'
                                var f = rxJson.find($scope.printFormSource, { propertyId: _propertyId });
                                for (var ab = 0; ab < find.length; ab++) {
                                    var findProperty = rxJson.find($scope.printFormSource, { propertyId: find[ab].childPropertyGroupmappingPropertyId });
                                    findProperty[0].propertyGroupName = f[0].propertyGroupName.replace(" ", "_");
                                    if (findProperty.length > 0) {
                                        mainPropertyId = _propertyId;
                                        mainPropertyName = $scope.spaceRemover(f[0].propertyName + _tagSource[j].enumName + _index);
                                        ischildPropertyGroup = true;
                                        textBoxEnumId = find[ab].enumMapIds;
                                        formDesign += '<div class="control-group child-group">' +
                                        '<label class="control-label child-label">' + findProperty[0].propertyName + '</label>';
                                        formDesign += $scope.setControl(findProperty[0]);
                                        formDesign += '</div>';
                                    }

                                }


                            }
                            htmlGroupDesign += formDesign;
                            if (isBlankHtml) {
                                if (noCount == 1) {
                                    var a = $("#" + _index + _enumName);
                                    $("#" + _index + _enumName).html($compile(htmlGroupDesign)($scope));
                                }
                            }
                        }
                    }
                }


            }

            var textBoxEnumId = '';
            $scope.setTypeahead = function (_rowColumn, isSplitcontrol) {
                globalPropertyName = $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName);
                var _propertyName = $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName),
                    _createChildDiv = '';
                $scope[$scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + "s"] = $scope.paperSource;
                var _isMandatory = _rowColumn.isMandatory,
                _isRequired = (_isMandatory) ? "rx-required" : '';
                if (angular.isUndefined(isSplitcontrol)) {
                    return '<div class="controls"><input class="span12" type="text" ng-show="showControl" ng-model="rxdynamic.' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + '" rx-autocomplete rx-autocompletesource="' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + 's" rx-autocompletetext="supplier" rx-autocompletevalue="paperTypeId" /><label class="control-label align-left"  ng-hide="showControl" >{{rxdynamic.' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + '}}</label></div>'
                } else {
                    return '<div class="controls"><input class="span12" type="text" ng-show="showControl" ng-model="splitProperty[0].' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + '" rx-autocomplete rx-autocompletesource="' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + 's" rx-autocompletetext="supplier" rx-autocompletevalue="paperTypeId" /><label class="control-label align-left"  ng-hide="showControl" >{{splitProperty[0].' + $scope.spaceRemover(_rowColumn.propertyGroupName + _rowColumn.propertyName) + '}}</label></div>'
                }
            }

            $scope.changeSelect = function (changeObject, _name, _propertyId, _enumNames, isMultiSelect, _mainPropertyId, _mainPropertyName, _txtEnumMapId, _index, _isSplit) {
                if (!angular.isUndefined(_isSplit)) {
                    changeObject = rxJson.find($scope[_name + "s"], { enumId: changeObject })[0];
                } else {
                    if (angular.isUndefined(_index)) {
                        _index = '';
                    }
                    var noCount = 0;
                    var formDesign = '';
                    if (angular.isUndefined(_enumNames)) {
                        changeObject = rxJson.find($scope[_name + "s"], { enumId: $scope[changeObject] })[0];
                    } else if (angular.isUndefined(isMultiSelect)) {
                        changeObject = rxJson.find($scope[_enumNames + "s"], { enumId: $scope[changeObject] })[0];
                    }
                    
                }
                if (angular.isUndefined(_mainPropertyId)) {
                    $scope.jsonObject[_name + _index] = { propertyId: _propertyId, enumMapId: changeObject.enumMapIds };
                } else {
                    if (!angular.isUndefined(_isSplit)) {
                        $scope.jsonObject[_name + _index] = { propertyId: _propertyId, enumMapId: changeObject.enumMapIds, mainPropertyId: _mainPropertyId, parentEnumMapId: _txtEnumMapId, isChild: true,index:_index };
                    }
                    else {
                        $scope.jsonObject[_name + _index] = { propertyId: _propertyId, enumMapId: changeObject.enumMapIds, mainPropertyId: _mainPropertyId, parentEnumMapId: _txtEnumMapId, isChild: true };
                    }
                    
                }


                //if (angular.isUndefined(_enumNames)) {
                //    if (changeObject.hasDependent == true || changeObject.isProperty == true) {
                //        $scope.jsonObject[_name] = [];
                //        $scope.jsonObject[_name].push({ main: {} });
                //        $scope.jsonObject[_name][0]["main"] = { propertyId: _propertyId, propertyValue: changeObject.enumName, mainPropertyId: '', enumMapId: changeObject.enumMapIds };
                //    } else {
                //        $scope.jsonObject[_name] = {};
                //        $scope.jsonObject[_name] = { propertyId: _propertyId, propertyValue: changeObject.enumName, mainPropertyId: '', enumMapId: changeObject.enumMapIds };
                //    }
                //}

                
                formDesign = '';
                if (changeObject.hasDependent == true) {
                    mainPropertyId = changeObject.propertyId;
                    mainPropertyName = _name;
                    subMapId = true;
                    noCount = 1;
                    var search = { enumGroupId: changeObject.enumGroupId, parentEnumMapId: changeObject.enumMapIds };
                    var find = rxJson.find($scope.printEnums, search);
                    var _createChildDiv = '',
                        _enumName = $scope.spaceRemover(_name + changeObject.enumName);
                    for (var xy = 0; xy < find.length; xy++) {
                        $("#" + $scope.spaceRemover(_name + find[xy].enumName)).html('');
                    }
                    if ($scope.identifyDependent(find)) {
                        _createChildDiv = '<div id="' + _index + _enumName + '" ></div>'
                    }
                    $scope[$scope.spaceRemover(_name + changeObject.enumName) + "s"] = find;
                    formDesign = '<div class="control-group child-group"><label class="control-label child-label">' + changeObject.enumName + '</label><div class="controls">' +
                                     '<select  class="span12" ng-change=\changeSelect("' + $scope.spaceRemover(_name + changeObject.enumName) + 'model","' + _name + '","' + _propertyId + '","' + $scope.spaceRemover(_name + changeObject.enumName) + '")\ ng-model="' + $scope.spaceRemover(_name + changeObject.enumName) + 'model" ng-options="' + $scope.spaceRemover(_name + changeObject.enumName) + '.enumId as ' + $scope.spaceRemover(_name + changeObject.enumName) + '.enumName for ' + $scope.spaceRemover(_name + changeObject.enumName) + ' in ' + $scope.spaceRemover(_name + changeObject.enumName) + 's" ></select>' + _createChildDiv + '</div></div>';

                }
                if (changeObject.isProperty == true) {
                    mainPropertyId = changeObject.propertyId;
                    subMapId = true;
                    var search = { propertyId: changeObject.propertyId };
                    var find = rxJson.find($scope.printProperties, search);
                    formDesign += '<div class="control-group  child-group">' +
                    '<label class="control-label child-label">' + find[0].propertyName + '</label>';
                    formDesign += $scope.setControl(find[0]);
                    formDesign += '</div>';
                    noCount = 1;
                }

                if (changeObject.isChildPropertyGroup == true) {
                    noCount = 1;
                    var search = { enumMapIds: changeObject.enumMapIds };
                    var find = rxJson.find($scope.childPropertyGroupSource, search);
                    for (var ab = 0; ab < find.length; ab++) {
                        var f = rxJson.find($scope.printFormSource, { propertyId: _propertyId });
                        var findProperty = rxJson.find($scope.printFormSource, { propertyId: find[ab].childPropertyGroupmappingPropertyId });
                        findProperty[0].propertyGroupName = f[0].propertyGroupName.replace(" ", "_");
                        if (findProperty.length > 0) {
                            mainPropertyId = _propertyId;
                            mainPropertyName = $scope.spaceRemover(f[0].propertyName + changeObject.enumName + _index);
                            ischildPropertyGroup = true;
                            textBoxEnumId = find[ab].enumMapIds;
                            formDesign += '<div class="control-group  child-group">' +
                            '<label class="control-label child-label">' + findProperty[0].propertyName + '</label>';
                            formDesign += $scope.setControl(findProperty[0]);
                            formDesign += '</div>';
                        }

                    }
                }
                if (noCount == 0) {
                    if (angular.isUndefined(_enumNames)) {
                        if (_propertyId != "") {
                            $("#frm" + _name).removeClass("dispnormal").addClass("dispnone");
                            $("#" +_index+ _name).html('');
                        }
                    }
                }
                if (noCount == 1) {
                    if (!angular.isUndefined(_enumNames)) {
                        $("#" + _index + _name).append($("#" + _enumNames).html($compile(formDesign)($scope)));
                    } else {
                        $("#frm" + _index + _name).removeClass("dispnone").addClass("dispnormal");
                        $("#" + _index + _name).html($compile(formDesign)($scope));
                    }
                    $("#frm" + _index + _name).removeClass("dispnone").addClass("dispnormal");
                }

            }

            $scope.spaceRemover = function (_string) {
                var _stringValues = _string.split(" "),
                    _lengthCount = _stringValues.length - 1,
                    _stringText = '';
                for (var i = 0; i < _stringValues.length; i++) {
                    _stringText += _stringValues[i].replace("(", "").replace(")", "").replace("-", "").replace("$", "").replace("/", "").replace(" / ", "").replace("#", "");
                }
                return _stringText.toLowerCase().trim();
            }

            $scope.commaSplitter = function (_string) {
                return _string.split(",");
            }

            $scope.identifyDependent = function (enumsObject) {
                var search = { hasDependent: true }
                var find = rxJson.find(enumsObject, search);
                if (find.length == 0) {
                    search = { isProperty: true }
                    find = rxJson.find(enumsObject, search);
                    if (find.length == 0) {
                        search = { isChildPropertyGroup: true }
                        find = rxJson.find(enumsObject, search);
                        if (find.length == 0) {
                            return false;
                        } else {
                            return true;
                        }

                    } else {
                        return true
                    }
                }
                return true;
            }

            $scope.setFunctionPrintForm = function () {
                $scope.printFormSource.resetForm = function (printFormSource, printEnums, printProperties, htmlProperties, editForm, checkboxColumn, agencyData, childPropertyGroupSource, variantValues) {
                    //$scope.showControl = false;
                    $scope.printFormSource = printFormSource;
                    $scope.printEnums = printEnums;
                    $scope.printProperties = printProperties;
                    $scope.htmlProperties = htmlProperties;
                    $scope.editForm = editForm;
                    $scope.checkboxColumn = checkboxColumn;
                    $scope.agencyData = agencyData;
                    $scope.childPropertyGroupSource = childPropertyGroupSource;
                    $scope.variantValues = variantValues;
                    $scope.setForm($scope.printFormSource);
                }
            }

            this.updatePrintFormSource = function (objectValue) {
                if (!angular.isUndefined(objectValue) && objectValue.length > 0) {
                    if ($scope.formEditSource) {
                        $scope.setFunctionPrintForm();
                        $scope.setForm(objectValue);
                    }

                }
            }
            $scope.printFormAttributes = {};
            this.setAttributes = function (attr) {
                $scope.printFormAttributes = attr;
                $scope.modeName = attr.mode;
            }

            $scope.$watch("printFormSource", this.updatePrintFormSource, true);
        },
        link: function (scope, elm, attrs, gridctrl) {
            var _setDynamic = '';
            gridctrl.setAttributes(attrs);
        },
        replace: true
    };
});


