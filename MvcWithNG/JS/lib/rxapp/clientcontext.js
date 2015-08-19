/*
 clientcontextJS v0.2
*/
rx.factory('clientcontext', function clientcontext(loader) {
    var $ = window.jQuery,
    dsKey = '',
    returnObject = {},
    colArrary = [],
    incremental = 0,
    requestType = '',
    initializeApi = function (jObject, key) {
        returnObject = {};
        if (!angular.isUndefined(jObject.get)) {
            dsKey = key + "get";
            requestDefine(jObject.get, "GET")
        }
        if (!angular.isUndefined(jObject.post)) {
            dsKey = key + "post";
            requestDefine(jObject.post, "POST")
        } if (!angular.isUndefined(jObject.put)) {
            dsKey = key+"put";
            requestDefine(jObject.put, "PUT")
        }
        if (!angular.isUndefined(jObject.del)) {
            dsKey = key + "del";
            requestDefine(jObject.del, "DELETE")
        }
        if (!angular.isUndefined(jObject.getby)) {
            dsKey = key + "getby";
            requestDefine(jObject.getby, "GETBY")
        }
        return returnObject;
    }
    requestDefine = function (jObject, type) {
        requestType = type;
        colArrary = [];
        for (var col in jObject) {
            col = String(col)
            colArrary.push(col.charAt(0).toUpperCase() + col.slice(1));
        }; incremental = 0,
        angular.forEach(jObject, function (apiUrl) {
            var splitvalue = apiUrl.split("/");
            requestType = (type == "GETBY") ? "GET" : type;
            amplify.request.define(dsKey + splitvalue[splitvalue.length - 1], 'ajax', {
                url: apiUrl,
                dataType: 'json',
                type: requestType,
                cache: false
            });
            if (type == "GET") {
                var AmplifyFunction = function (callbacks, resourceKey) {
                    return amplify.request({
                        resourceId: resourceKey,
                        success: callbacks.success,
                        error: callbacks.error
                    });
                }
                returnObject['get' + colArrary[incremental]] = getData(AmplifyFunction, dsKey + splitvalue[splitvalue.length - 1]);
            }
            else {
                var AmplifyFunction = function (callbacks, data,resourceKey) {
                    return amplify.request({
                        resourceId: resourceKey,
                        data: data,
                        success: callbacks.success,
                        error: callbacks.error
                    });
                }
                switch (type) {
                    case "POST":
                        returnObject['post' + colArrary[incremental]] = postData(AmplifyFunction, dsKey + splitvalue[splitvalue.length - 1]);
                        break;
                    case "PUT":
                        returnObject['put' + colArrary[incremental]] = putData(AmplifyFunction, dsKey + splitvalue[splitvalue.length - 1]);
                        break;
                    case "DELETE":
                        returnObject['delete' + colArrary[incremental]] = deleteData(AmplifyFunction, dsKey + splitvalue[splitvalue.length - 1]);
                        break;
                    case "GETBY":
                        returnObject['getBy' + colArrary[incremental]] = getByData(AmplifyFunction, dsKey + splitvalue[splitvalue.length - 1]);
                        break;
                }
            }
            incremental++;
        });
    },
    getData = function (serviceFunction, resourceKey) {
        get = function () {
            loader.load(true);
            return $.Deferred(function (def) {
                serviceFunction({
                    success: function (dtoList) {
                        loader.load(false);
                        def.resolve(dtoList);
                    },
                    error: function (response) {
                        loader.load(false);
                        def.reject();
                    }
                },resourceKey);
            }).promise()
        };
        return {
            get: get
        }
    },
    postData = function (serviceFunction,resourceKey) {
        post = function (entity) {
            loader.load(true);
            return $.Deferred(function (def) {
                serviceFunction({
                    success: function (dtoList) {
                        loader.load(false);
                        def.resolve(dtoList);
                    },
                    error: function (response) {
                        loader.load(false);
                        def.reject();
                    }
                }, entity, resourceKey);
            }).promise()
        };
        return {
            post: post
        }
    },
    putData = function (serviceFunction, resourceKey) {
        put = function (entity) {
            loader.load(true);
            return $.Deferred(function (def) {
                serviceFunction({
                    success: function (dtoList) {
                        loader.load(false);
                        def.resolve(dtoList);
                    },
                    error: function (response) {
                        loader.load(false);
                        def.reject();
                    }
                }, entity, resourceKey);
            }).promise()
        };
        return {
            put: put
        }
    },
    deleteData = function (serviceFunction, resourceKey) {
     var del = function (entity) {
         return $.Deferred(function (def) {
             loader.load(true);
                serviceFunction({
                    success: function (dtoList) {
                        loader.load(false);
                        def.resolve(dtoList);
                    },
                    error: function (response) {
                        loader.load(false);
                        def.reject();
                    }
                }, entity, resourceKey);
            }).promise()
        };
        return {
            del: del
        }
    }, getByData = function (serviceFunction, resourceKey) {
        get = function (entity) {
            return $.Deferred(function (def) {
                loader.load(true);
                serviceFunction({
                    success: function (dtoList) {
                        loader.load(false);
                        def.resolve(dtoList);
                    },
                    error: function (response) {
                        loader.load(false);
                        def.reject();
                    }
                }, entity, resourceKey);
            }).promise()
        };
        return {
            get: get
        }
    }
    return {
        initializeApi: initializeApi
    }
});