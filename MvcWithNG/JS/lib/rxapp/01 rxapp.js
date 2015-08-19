/*
 rxAppJS v0.2
*/
var rx = angular.module('rx', ['ng', 'ngCookies', 'ngResource']);
rx.factory('RxAuth', ['$location', 'cookieconfig', 'response', 'appconfig', 'encrydecry', 'rxJson', 'request', 'cacheData', function ($location, cookieconfig, response, appconfig, encrydecry, rxJson, request, cacheData) {

    UserLoginID = cookieconfig.get('lid'),

    User = cookieconfig.get('username'),

    UserRole = cookieconfig.get('rolename'),

    IsUserAuthenticate = function () {
        if (cookieconfig.get('lid') != null && cookieconfig.get('lid') != undefined && cookieconfig.get('userRoleId') != undefined && cookieconfig.get('userRoleId') != "") {
            return true;
        }
        return false;
    },

    userAccessRights = function (rolename) {
        if (cookieconfig.get('rolename') == rolename) {
            return true;
        }
        return false;
    },

    roleMenu = function (list) {
        var _urlArray = rxJson.convertToArrary(list, "url"),
            _stringUrl = '';
        angular.forEach(list, function (l) {
            if ((!angular.isUndefined(l.subLinks))) {
                var _urls = rxJson.convertToArrary(l.subLinks, "url");
                for (var i = 0; i < _urls.length; i++) {
                    _urlArray.push(_urls[i]);
                }
            }
            if ((!angular.isUndefined(l.otherLinks))) {
                if (l.otherLinks.length > 0) {
                    var _urls = rxJson.convertToArrary(l.otherLinks, "url");
                    for (var i = 0; i < _urls.length; i++) {
                        _urlArray.push(_urls[i]);
                    }
                }
            }
        });
        for (var i = 0; i < _urlArray.length; i++) {
            _stringUrl += _urlArray[i].replace("#/", "") + ',';
        }
        var en = encrydecry.encrypt(_stringUrl);
        response.cookies('appauth').add(_stringUrl, appconfig.storeExpirationMs);
        response.cookies('roleaccess').add(en, appconfig.storeExpirationMs);
        return list;
    },
    operationsRights = function (operationId) {
        var url = request.rawUrl();
        var cuarr = url.split("/");
        if (angular.isArray(cuarr)) {
            if (cuarr.length > 2) {
                url = "/" + cuarr[1];
            }
        }
        var jsonArray = cacheData.fetch("operationsRightsJson");
        var search = { userRole: UserRole, url: "#" + url ,operationTypeId:operationId};
        var filteredJson = rxJson.find(jsonArray, search);
        if (filteredJson.length > 0) {
            return true;
        }
        return false;
    }
    stopOperation = function () {
        angular.noop();
    };

    return {
        UserLoginID: UserLoginID,
        User: User,
        UserRole: UserRole,
        IsUserAuthenticate: IsUserAuthenticate,
        userAccessRights: userAccessRights,
        stopOperation: stopOperation,
        roleMenu: roleMenu,
        operationsRights: operationsRights
    };
}]);
rx.factory('appconfig', ['$location', function ($location) {

    logger = window.toastr,

    storeExpirationMs = (1000 * 60 * 60 * 24), // 1 day

    throttle = 400,

    toastrTimeout = 2000,

   urlKey = {
       loginurl: '/login',
       defaulturl: '/home',
       unauthorized: '/unauthorized'
   },

toasts = {
    changesPending: 'Please save or cancel your changes before leaving the page.',
    errorSavingData: 'Data could not be saved. Please check the logs.',
    errorUpdatingData: 'Data could not be updated. Please check the logs.',
    errorGettingData: 'Could not retrieve data.  Please check the logs.',
    errorDeletingData: 'Data could not be deleted. Please check the logs.',
    invalidRoute: 'Cannot navigate. Invalid route',
    retreivedData: 'Data retrieved successfully',
    savedData: 'Data saved successfully',
    updatedData: 'Data updated successfully',
    deleteData: 'Data successfully deleted',
    loggedin: 'Successfully Loggedin',
    cloneData: "Cloning has been done successfully",
    mappingData: "Current record is used by other user"
};
    return {
        logger: logger,
        storeExpirationMs: storeExpirationMs,
        toasts: toasts,
        urlKey: urlKey,
    };
}]);
rx.factory('rxNotification', function () {
    window.toastr.options= {
        "debug": false,
        "positionClass": "toast-bottom-full-width",
        "onclick": null,
        "fadeIn": 300,
        "fadeOut": 1000,
        "timeOut": 5000,
        "extendedTimeOut": 1000
    };
    return window.toastr;
});
rx.factory('loader', function () {
    var load = function (show) {
        if (show) {
            $("#rxload").removeClass("rxloadout").addClass("rxloadin");
            $("#rxload").append('<div style="position:absolute; top:40%; left:50%">' +
            '<center>' +
            '<div>Loading</div>' +
            '<img src="data:image/gif;base64,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" id="abc"  />' +
            '</center></div>');
        }
        else {
            $("#rxload").removeClass("rxloadin").addClass("rxloadout");
        }
    }

    return {
        load: load
    };
});

rx.factory('cacheData', ['appconfig',
    function (appconfig) {
        var amplify = window.amplify,
            $ = window.jQuery,
            expires = { expires: appconfig.storeExpirationMs },

            clear = function (key) {
                return amplify.store(key, null);
            },

            fetch = function (key) {
                return amplify.store(key);
            },

            save = function (key, value) {
                amplify.store(key, value, expires);
            };

        return {
            clear: clear,
            fetch: fetch,
            save: save
        };
    }]);
rx.factory('cookieconfig', ['$cookieStore', function ($cookieStore) {

    return {
        get: function (c_name) {
            var i, x, y, ARRcookies = document.cookie.split(";");
            for (i = 0; i < ARRcookies.length; i++) {
                x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
                y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
                x = x.replace(/^\s+|\s+$/g, "");
                if (x == c_name) {
                    return unescape(y);
                }
            }
        },
        save: function (key, value, exdays) {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + exdays);
            var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
            document.cookie = key + "=" + c_value;
        },
        put: function (key, value) {
            $cookieStore[key] = angular.toJson(value);
        },
        remove: function (key) {
            delete $cookieStore[key];
        }
    };
}]);

rx.factory('response', ['$location', '$cookieStore', 'cookieconfig', function ($location, $cookieStore, cookieconfig) {

    return {
        redirect: function (url) {
            $location.url(url);
        },
        cookies: function (key) {
            return {
                add: function (value, exdays) {
                    var exdate = new Date();
                    exdate.setDate(exdate.getDate() + exdays);
                    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
                    document.cookie = key + "=" + c_value;
                },
                put: function (value) {
                    $cookieStore[key] = angular.toJson(value);
                },
                expires: function () {
                    delete $cookieStore[key];
                },
            }
        },

    };
}]);
rx.factory('request', ['cookieconfig', '$routeParams', '$location', function (cookieconfig, $routeParams, $location) {

    return {
        cookies: function (key) {
            return {
                value: cookieconfig.get(key)
            }
        },
        queryString: function (key) {
            return $routeParams[key];
        },
        rawUrl: function () { return $location.path() },
        Url: function () { return $location.absUrl() }

    };
}]);
rx.factory('encrydecry', function (cookieconfig, securitykey) {
    var
        encrypt = function (value) {
            var et = CryptoJS.AES.encrypt(value, securitykey.appKey);
            return String(et);
        },
        decrypt = function (value) {
            return CryptoJS.AES.decrypt(value, securitykey.appKey).toString(CryptoJS.enc.Utf8);
        }
    return {
        encrypt: encrypt,
        decrypt: decrypt
    };
});
rx.factory('securitykey', function (cookieconfig) {

    return {
        appKey: 'radix'
    };
});
rx.factory('rxGridService', function ($rootScope) {
    var rxGridService = { eventString: '', Object: '', broadCast: '', ArrayObject: '', call: true };

    rxGridService.BroadCastEvent = function (eventstring, object, arrayobject, broadcast) {
        this.call = true;
        this.broadCast = broadcast;
        this.ArrayObject = arrayobject;
        this.Object = object;
        this.eventString = eventstring;
        this.broadcastService();
    };

    rxGridService.add = function (obj) {
        rxGridService.ArrayObject.push(obj);
    }

    rxGridService.delete = function () {
        var i = rxGridService.ArrayObject.indexOf(rxGridService.Object);
        if (i != -1) {
            rxGridService.ArrayObject.splice(i, 1);
        }
    }

    rxGridService.broadcastService = function () {
        $rootScope.$broadcast(rxGridService.broadCast);
    };

    return rxGridService;
});
rx.factory('rxData', function ($rootScope,rxJson) {
    var rxData = { jsonObject: {}, jsonArray: [], eventJsonArray: [], filteredJsonArray: [], isFiltered: false, headingJsonArray: [], subGridJsonArray: {}, gridChangedData: {} };

    rxData.setJsonObject = function (_jsonObject) {
        rxData.jsonObject = _jsonObject;
    };

    rxData.setJsonArray = function (_jsonArray) {
        rxData.jsonArray = _jsonArray;
    };

    rxData.setFilteredJsonArray = function (_jsonArray) {
        rxData.filteredJsonArray = _jsonArray;
    };

    rxData.setFilteredFalse = function () {
        rxData.isFiltered = false;
    };

    rxData.setFilteredTrue = function () {
        rxData.isFiltered = true;
    };

    rxData.setEventJsonArray = function (_eventJsonArray) {
        rxData.eventJsonArray = _eventJsonArray;
    }

    rxData.setGridChangedData = function (objectName,data) {
        rxData.gridChangedData[objectName] = [];
        rxData.gridChangedData[objectName] = data;

    }
    rxData.setLanguageHeader = function (_JsonArray) {
        for (var _jo in _JsonArray) {
            var _jObject = rxJson.find(rxData.headingJsonArray, { languageProperty: _jo })[0];
            var _index = rxData.headingJsonArray.indexOf(_jObject);
            if (_index != -1) {
                rxData.headingJsonArray[_index]["headerText"] = _JsonArray[_jo];
            }
        }
    }

    rxData.setHeadingJsonArray = function (_headingJsonArray) {
        rxData.headingJsonArray = _headingJsonArray;
    }

    rxData.add = function (_jsonObject) {
        rxData.jsonArray.push(_jsonObject);
    }

    rxData.delete = function () {
        var i = rxData.jsonArray.indexOf(rxData.jsonObject);
        if (i != -1) {
            rxData.jsonArray.splice(i, 1);
        }
        if (rxData.filteredJsonArray != 0) {
            i = rxData.filteredJsonArray.indexOf(rxData.jsonObject);
            if (i != -1) {
                rxData.filteredJsonArray.splice(i, 1);
            }
        }

    }
    return rxData;
});
rx.factory('rxJson', function ($filter) {
    var filter = function (key, value, json) {
        var search = {};
        search[key] = value;
        var filterJson = $filter('filter')(json, search);
        var rJson = [];
        for (var i = 0; i < filterJson.length; i++) {
            if (filterJson[i][key] == value) {
                rJson.push(filterJson[i]);
            }
        }
        return rJson;
    },
    advanceFilter = function (jsonArray, jsonObject) {
        var filterJson = $filter('filter')(jsonArray, jsonObject);
        return filterJson
    },
    convertToArrary = function (jsonArrary, key) {
        return _.pluck(jsonArrary, key)
    },
    max = function (jsonArrary, key) {
        return _.max(jsonArrary, function (json) { return json[key]; });
    },
    min = function (jsonArrary, key) {
        return _.min(jsonArrary, function (json) { return json[key]; });
    },
    unique = function (RxArray) {
        return _.uniq(RxArray);
    }
    find = function (jsonArrary, jsonObject) {
        return _.where(jsonArrary, jsonObject);
    },
    del = function (jsonArray, jsonObject) {
        var i = jsonArray.indexOf(jsonObject);
        if (i != -1) {
            jsonArray.splice(i, 1);
        }
        return jsonArray;
    },
    removeColumn = function (jsonObject, key) {
        return _.omit(jsonObject, key)
    },
    arrayContains = function (array, value) {
        return _.contains(array, value);
    },
    uniqueNumber = function () {
        return _.uniqueId();
    }
    createJsonObject = function (jsonArray, keyColumn, valueColumn) {
        var jObject = {};
        for (var i = 0; i < jsonArray.length; i++) {
            jObject[jsonArray[i][keyColumn]] = jsonArray[i][valueColumn];
        }
        return jObject;
    }
    groupBy = function (jsonArray, columnName) {
        return _.groupBy(jsonArray, columnName);
    }
    return {
        filter: filter,
        convertToArrary: convertToArrary,
        max: max,
        min: min,
        find: find,
        unique: unique,
        advanceFilter: advanceFilter,
        del: del,
        createJsonObject: createJsonObject,
        removeColumn: removeColumn,
        arrayContains: arrayContains,
        uniqueNumber: uniqueNumber,
        groupBy: groupBy
    }
});
rx.factory('rxHtml', function () {
    var safeHtml = function (htmlData) {
        return _.escape(htmlData)
    },
    convertToHtml = function (data) {
        return _.unescape(data);
    }

    return {
        safeHtml: safeHtml,
        convertToHtml: convertToHtml
    }
});
rx.factory('rxUtils', function () {
    var safeHtml = function (htmlData) {
        return _.escape(htmlData)
    },
    convertToHtml = function (data) {
        return _.unescape(data);
    }

    return {
        safeHtml: safeHtml,
        convertToHtml: convertToHtml
    }
});

rx.factory("$exceptionHandler", ["loader", "rxNotification", function (loader, rxNotification) {
    return function (exception, cause) {
        loader.load(false);
        rxNotification.error("Error : " + exception.message);
        console.error("Error : " + exception.message);
        console.error("Stack : " + exception.stack);

    }
}]);
rx.factory('rxLanguage', function ($rootScope, request, cacheData, rxJson, response) {
    var rxLanguage = { languageName: '', languageId: 0, jsonObject: {},gridObject:[] };

    rxLanguage.set = function (_languageName, _languageId) {
        response.cookies("languageName").add(_languageName, 30);
        response.cookies("languageId").add(_languageId, 30);
        var url = request.rawUrl();
        var jsonArray = cacheData.fetch("languageJson");
        var search = { languageId: _languageId, url: "#" + url };
        var filteredJson = rxJson.find(jsonArray, search);
        var gridJsonArray = cacheData.fetch("gridJson");
        var filteredGridJson = rxJson.find(gridJsonArray, search);
        rxLanguage.gridObject = rxJson.createJsonObject(filteredGridJson, 'textFieldName', 'languageText');
        rxLanguage.jsonObject = rxJson.createJsonObject(filteredJson, 'textFieldName', 'languageText');
        this.broadcastLanguage();
    };
    rxLanguage.initializeLanguage = function () {
        if (!angular.isUndefined(request.cookies("languageName").value)) {
            var languageName = request.cookies("languageName").value;
            var languageId = request.cookies("languageId").value;
            var url = request.rawUrl();
            var cuarr = url.split("/");
            if (angular.isArray(cuarr)) {
                if (cuarr.length > 2) {
                    url = "/" + cuarr[1];
                }
            }
            var jsonArray = cacheData.fetch("languageJson");
            var search = { languageId: languageId, url: "#" + url };
            var filteredJson = rxJson.find(jsonArray, search);
            var gridJsonArray = cacheData.fetch("gridJson");
            var filteredGridJson = rxJson.find(gridJsonArray, search);
            rxLanguage.gridObject = rxJson.createJsonObject(filteredGridJson, 'textFieldName', 'languageText');
            rxLanguage.jsonObject = rxJson.createJsonObject(filteredJson, 'textFieldName', 'languageText');
            return rxLanguage.jsonObject;
        } else {
            var url = request.rawUrl();
            var jsonArray = cacheData.fetch("languageJson");
            var search = { languageId: 1, url: "#" + url };
            var filteredJson = rxJson.find(jsonArray, search);
            rxLanguage.jsonObject = rxJson.createJsonObject(filteredJson, 'textFieldName', 'languageText');
            return rxLanguage.jsonObject;
        }
    }

    rxLanguage.initializeGridHeader = function () {
        if (!angular.isUndefined(request.cookies("languageName").value)) {
            var languageName = request.cookies("languageName").value;
            var languageId = request.cookies("languageId").value;
            var url = request.rawUrl();
            var cuarr = url.split("/");
            if (angular.isArray(cuarr)) {
                if (cuarr.length > 2) {
                    url = "/" + cuarr[1];
                }
            }
            var jsonArray = cacheData.fetch("languageJson");
            var search = { languageId: languageId, url: "#" + url };
            var filteredJson = rxJson.find(jsonArray, search);
            var gridJsonArray = cacheData.fetch("gridJson");
            var filteredGridJson = rxJson.find(gridJsonArray, search);
            rxLanguage.gridObject = rxJson.createJsonObject(filteredGridJson, 'textFieldName', 'languageText');
            rxLanguage.jsonObject = rxJson.createJsonObject(filteredJson, 'textFieldName', 'languageText');
            this.broadcastLanguage();
        } else {
            var url = request.rawUrl();
            var jsonArray = cacheData.fetch("languageJson");
            var search = { languageId: 1, url: "#" + url };
            var filteredJson = rxJson.find(jsonArray, search);
            var gridJsonArray = cacheData.fetch("gridJson");
            var filteredGridJson = rxJson.find(gridJsonArray, search);
            rxLanguage.gridObject = rxJson.createJsonObject(filteredGridJson, 'textFieldName', 'languageText');
            rxLanguage.jsonObject = rxJson.createJsonObject(filteredJson, 'textFieldName', 'languageText');
            this.broadcastLanguage();
        }
    }

    rxLanguage.masterData = function (_source, tableId, keyColumn, textColumn) {
        if (!angular.isUndefined(request.cookies("languageName").value)) {
            var languageName = request.cookies("languageName").value;
            var languageId = request.cookies("languageId").value;
            var jsonArray = cacheData.fetch("masterDataJson");
            var search = { tableId: tableId.toLowerCase(),languageId:languageId };
            var filteredJson = rxJson.find(jsonArray, search);
            for (var i = 0; i < filteredJson.length; i++) {
                for (var j = 0; j < _source.length; j++) {
                    if (filteredJson[i]["referenceId"] == _source[j][keyColumn]) {
                        _source[j][textColumn] = filteredJson[i]["text"];
                        break;
                    }
                }
            }
            return _source;
        }
    }
   
    rxLanguage.message = function (_propertyName) {
        if (!angular.isUndefined(request.cookies("languageName").value)) {
            var languageName = request.cookies("languageName").value;
            var languageId = request.cookies("languageId").value;
            var url = request.rawUrl();
            var jsonArray = cacheData.fetch("errorMessageJson");
            var search = { languageId: languageId };
            var filteredJson = rxJson.find(jsonArray, search);
            var jsonObject = rxJson.createJsonObject(filteredJson, 'textFieldName', 'languageText');
            return jsonObject[_propertyName];
        }
    }
    rxLanguage.broadcastLanguage = function () {
        $rootScope.$broadcast('$changedLanguage');
    };

    return rxLanguage;
});

rx.factory('rxPopupData', function () {
    var rxPopupData = { activeName: '' };

    rxPopupData.setObject = function (object, name) {
        if (angular.isUndefined(rxPopupData[name])) {
            rxPopupData[name] = {};
        }
        rxPopupData[name] = object
    }
    return rxPopupData;
});
rx.factory('rxPopup', ['$compile', '$rootScope', function ($compile, $rootScope) {
    return {
        showPopup: function (src, css) {
            if (angular.isUndefined($rootScope.popupTemplateSrc)) {
                $rootScope.popupTemplateSrc = { src: src, popupCss: css };
            } else {
                $rootScope.popupTemplateSrc = { src: src, popupCss: css };
            }
            var _element = $("#rxPopupFactory");
            if (angular.isUndefined(_element[0])) {
                var htmlDesign = '<div  id="rxPopupFactory" class="modal fade {{popupTemplateSrc.popupCss}}"  tabindex="-1" role="dialog" aria-labelledby="popupTemplateLabel" aria-hidden="true">' +
                           '<div ng-include src="popupTemplateSrc.src"></div>' +
                                             '</div>';
                htmlDesign += '<div  id="rxPopupFactorysubPopup" class="modal fade {{popupTemplate.popupCss}} showpopup"  tabindex="-1" role="dialog" aria-labelledby="popupTemplateLabel" aria-hidden="true">' +
                        '<div ng-include src="subPopupTemplateSrc.src"></div>' +
                                          '</div>';
                $("#body").append($compile(htmlDesign)($rootScope));
                $('#rxPopupFactory').on('hidden', function () {
                    $rootScope.$apply(function () { $rootScope.popupTemplateSrc = { src: 'Scripts/lib/rxapp/template/blank.html', popupCss: '' }; });
                });

                $('#rxPopupFactorysubPopup').on('hidden', function () {
                    $rootScope.$apply(function () { $rootScope.popupTemplateSrc = { src: 'Scripts/lib/rxapp/template/blank.html', popupCss: '' }; });
                });
                var t = setTimeout(function () {
                    $('#rxPopupFactory').modal({
                        backdrop: 'static',
                        keyboard: false
                    });
                    $('#rxPopupFactory').modal('show');
                }, 200);
            } else {
                $('#rxPopupFactory').modal('show');
            }

        },
        showSubPopup: function (src, css) {
            //$(".popover").remove();
            $('#rxPopupFactory').addClass("displayNone");
            $rootScope.popupTemplate = { popupCss: css }
            $rootScope.subPopupTemplateSrc = { src: src };
            if (!$('#rxPopupFactorysubPopup').hasClass("in")) {
                $('#rxPopupFactorysubPopup').modal({
                    backdrop: 'static',
                    keyboard: false
                });
                $('#rxPopupFactorysubPopup').modal('show');
                $('#rxPopupFactorysubPopup').addClass("in");
                $('#rxPopupFactorysubPopup').removeClass("displayNone");
            } else {
                $('#rxPopupFactorysubPopup').removeClass("displayNone");
            }

        },
        hideSubPopup: function () {
            $('#rxPopupFactory').removeClass("displayNone");
            $rootScope.subPopupTemplateSrc = { src: 'Scripts/lib/rxapp/template/blank.html' };
            $('#rxPopupFactorysubPopup').addClass("displayNone");
        },
        hidePopup: function () {
            $('#rxPopupFactory').modal('hide');
            $('#rxPopupFactorysubPopup').modal('hide');
        }
    }
}])