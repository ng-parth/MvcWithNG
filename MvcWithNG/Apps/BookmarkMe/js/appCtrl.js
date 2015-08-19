'use strict';
//var bookMe = angular.module('bookMe', ['ng', '$strap.directives']);
//var util = angular.module('util', []);
//util.factory('new', function () {
//    return {
//        success: function (msg) {
//            toastr.success(msg);
//        },
//    };
//});
//var newTest = angular.module('newTest', ['$strap.directives']);
//newTest.filter('gt25', function () {
//    return function (input) {
//        if (parseInt(input) > 25) {
//            input = input + ' GT_25';
//            var a = this;
//        }
//        return input;
//    }
//});
//newTest.controller('mainCtrl', function ($scope) {
//    $scope.datepicker = { date: '2012-09-01T00:00:00.000Z' };
//});

var bookMe = angular.module('bookMe', []);
bookMe.factory('notify', function () {
    return {
        success: function (msg) {
            toastr.success(msg);
        },
        error: function (msg) {
            toastr.warning(msg);
        },
    };
});

bookMe.directive('bmDropdown', function () {

});

bookMe.filter('dateToMDY', function () {
    return function (value) {
        return moment(value).format("MMM Do YYYY");
    }
});
bookMe.filter('classfilter', function () {
    return function (value, rowObject, conditionalObject) {
        for (var i = 0; i < conditionalObject.length; i++) {
            if (rowObject[conditionalObject[i].columnOne] == conditionalObject[i].valueOne && rowObject[conditionalObject[i].columnTwo] == conditionalObject[i].valueTwo) {
                return conditionalObject[i].className
            }
        }
        //for (var i = 0; i < conditionalValue.length; i++) {
        //    if (value == conditionalValue[i].conditionalValue) {
        //        return conditionalValue[i].className
        //    }
        //}
        //if (value == conditionalValue) {
        //    return className;
        //}
        return "";
    }
});

bookMe.filter('lt25', function () {
    return function (input) {
        if (parseInt(input) < 25) {
            input = input + ' LT_25';
            var a = this;
        }
        return input;
    }
});

bookMe.controller('bookMeCtrl', function ($scope, notify, $timeout) {

    $scope.conditionalObject = [{ columnOne: 'Tags', columnTwo: 'Title', valueOne: 'theme', valueTwo: 'abc', className: 'tagclass-red' }] //[{ conditionalValue: 'IIS', className: 'tagclass-red' }, { conditionalValue: 'theme', className: 'tagclass-green' }, { conditionalValue: 'song server', className: 'tagclass-blue' }];
    function _ajax_request(url, data, callback, type, method) {
        if (jQuery.isFunction(data)) {
            callback = data;
            data = {};
        }
        return jQuery.ajax({
            type: method,
            url: url,
            data: data,
            success: callback,
            dataType: type
        });
    }

    jQuery.extend({
        put: function (url, data, callback, type) {
            return _ajax_request(url, data, callback, type, 'PUT');
        },
        delete_: function (url, data, callback, type) {
            return _ajax_request(url, data, callback, type, 'DELETE');
        }
    });

    //========================Date===============//
    $scope.dt = new Date();
    $scope.openNow = function () {
        debugger;
        //$timeout(function () {
        //    $scope.opened = true;
        //});
        //$('#loader').modal('show');
    };
    $scope.showWeeks = false;
    $scope.dateOptions = {
        'year-format': "'yy'",
        'starting-day': 1
    };
    //========================Date===============//
    $scope.show = false;
    $scope.showLoader = false;
    $scope.addBook = function (bookM) {
        $scope.bookM = { url: '', title: '', tags: '' };
        $scope.showLoader = true;
        $('#loader').modal('show');
        $.post('/api/bookme/bookmark', bookM, function (response) {
            alert(response);
            notify.success(response);
            $scope.showLoader = false;
            $('#loader').modal('hide');
            $scope.$apply();
        });
        //$.ajax({
        //    type: "POST",
        //    url: "/api/bookme/bookmark",
        //    data: bookM,
        //    success: function (response) {
        //        alert(response);
        //        $scope.showLoader = false;
        //        $('#loader').modal('hide');
        //        $scope.$apply();
        //    },
        //    error: function (response) {
        //        alert(response.d);
        //        $scope.showLoader = false;
        //        $scope.$apply();
        //    }
        //});
    };
    $scope.listItem = [{ id: 1, title: 'MeLike' }, { id: 2, title: 'Performance' }, { id: 3, title: 'Tuning' }, { id: 4, title: 'Timing' }, { id: 5, title: 'Feel' }, { id: 6, title: 'Looks' }];
    $scope.items = [{ id: 1, name: 'Parth', age: 23, number: 123123123, active: false }, { id: 2, name: 'Parth2', age: 12, number: 12223123, active: false }, { id: 3, name: 'Parth3', age: 21, number: 123123, active: false }, { id: 4, name: 'Parth4', age: 13, number: 123123, active: false }, { id: 5, name: 'Parth5', age: 21, number: 125523, active: false } ];
    $scope.save = function (i) {
        $scope.items[i - 1].active = false;
    }
    $scope.edit= function (i) {
        $scope.items[i - 1].active = true;
    }
    $scope.sendData = function (newA) {
        debugger;
    }

    $scope.click = function () {
        debugger;
    };
    $scope.editBookMark = function (bookM) {
        $scope.eBookM = { Id: bookM.Id, Url: bookM.Url, Title: bookM.Title, Tags: bookM.Tags };
        $('#editBookM').modal('show');
    };
    $scope.editUrl = function (Id) {
    };
    $scope.putBookMark = function (eBookM) {
        $('#editBookM').modal('hide');
        $('#loader').modal('show');
        $.put('/api/bookme/bookmark', eBookM, function (response) {
            //alert(response);
            if (response.Msg == 'Success') {
                $scope.bookMarks = response.DataObj;
                notify.success(response.Msg);
            }
            else {
                notify.error(response);
                $scope.show = true;
            }
            $scope.showLoader = false;
            $('#loader').modal('hide');
            //$('#editBookM').modal('hide');
            $scope.$apply();
        });

    };
    $scope.getData = function () {
        $('#loader').modal('show');
        $.ajax({
            type: "GET",
            url: "/api/bookme/bookmark",
            success: function (response) {
                //alert(response);
                $scope.bookMarks = response;
                $scope.search = { Id: '', Title: '', Url: '', Tags: '' };
                if ($scope.bookMarks.length > 0)
                    $scope.show = true;
                else
                    $scope.show = false;
                $('#loader').modal('hide');
                $scope.$apply();
            },
            error: function (response) {
                alert(response.d);
                $('#loader').modal('hide');
            }
        });
    };
    $scope.deleteBookMark = function (Id) {
        var bookM = { Id: Id };
        //var bookM = Id;
        $.ajax({
            type: "DELETE",
            url: "/api/bookme/",
            data: bookM,
            success: function (response) {
                if (response.Msg = "Success") {
                    $scope.bookMarks = response.DataObj
                    $scope.$apply();
                    alert(response.Msg);
                }
            },
            error: function (response) {
                alert(response.d);
            }
        });
    };
    $scope.myToast = function () {
        //toastr.options.closeButton = true;
        //toastr.options.showEasing = 'easeInOutCirc';
        //toastr.options.hideEasing = 'easeOutBounce';
        //toastr.warning('My name is Inigo Montoya. You killed my father, prepare to die!');
        //toastr.success('Hey!! Toasted My Msg.. ', 'Parth Mistry!    ');
        notify.success('Hey! Notified! :)')
        notify.error('Oh! Something bad! :(')
    };


    //=================PNR Status JavaScript==========================//
    //function D(a, b) {
    //    c = b.split('|');
    //    d = false;
    //    for (q = 0; q < c.length; q++) {
    //        if (c[q] == a)
    //            d = true;
    //    } return d;
    //}
    //function E() {
    //    f0 = document.forms[0];
    //    if (f0['passengers[0].passengerName'])
    //        f0['passengers[0].passengerName'].value = 'Prakash R Mistry';
    //    if (f0['passengers[0].passengerAge'])
    //        f0['passengers[0].passengerAge'].value = '56';
    //    if (f0['passengers[0].passengerSex'])
    //        f0['passengers[0].passengerSex'].value = 'm';
    //    if (f0['passengers[0].berthPreffer'])
    //        f0['passengers[0].berthPreffer'].value = 'Side_Lower';
    //    if (f0['passengers[0].idCardType'])
    //        f0['passengers[0].idCardType'].value = 'PANC';
    //    if (f0['passengers[0].idCardNo'])
    //        f0['passengers[0].idCardNo'].value = 'ABOPM3937F';
    //    if (f0['passengers[0].foodPreffer'])
    //        f0['passengers[0].foodPreffer'].value = 'Veg';
    //    if (f0['passengers[1].idCardType'])
    //        f0['passengers[1].idCardType'].value = '0';
    //    if (f0['passengers[2].idCardType']) f0['passengers[2].idCardType'].value = '0';
    //    if (f0['passengers[3].idCardType']) f0['passengers[3].idCardType'].value = '0';
    //    if (f0['passengers[4].idCardType']) f0['passengers[4].idCardType'].value = '0';
    //    if (f0['passengers[5].idCardType']) f0['passengers[5].idCardType'].value = '0';
    //}
    //E()


    //PHONE NO HTML CODE
    //    <table width="100%" border="1" celllspacing="0" cellspacing="1">





    //<tbody><tr bgcolor="#f1f1f1">
    //		<td class="normalmsgtxt" style="padding:4px;">Passenger Mobile Number: +91<font class="starmand" align="absmiddle">*</font> <input type="text" name="mobileNumber" maxlength="10" size="12" value="9427077530" onkeypress="return isNumber(event)" class="txtfld">&nbsp;&nbsp; SMS will be sent to this Mobile Number.</td>
    //</tr>                           




    //</tbody></table>

    //function Clear() {
    //    document.getElementById("railways").reset();
    //    document.getElementById("magic").style.display = "none";
    //}
    //var fz = new Array();
    //var z = new Array();
    //function F(p) {
    //    var m = new Array();
    //    for (n = 0; n < p.length; n++) {
    //        var q = new Array();
    //        for (ind = 0; ind < p[n].length; ind++) {
    //            q.push('\'' + p[n][ind] + '\'')
    //        }
    //        m[n] = eval('[' + q.join(',') + ']');
    //    }
    //    return m;
    //}
    //function C(n, cz) {
    //    var i = -1;
    //    for (ab = 0; ab < cz.length; ab++) {
    //        if (cz[ab][1] == n) i = ab;
    //    }
    //    return i;
    //}
    //function B() {
    //    fz.length = 0;
    //    if (!document.forms.length) {
    //        alert('There are no forms in this page.');
    //        return;
    //    }
    //    for (fi = 0; fi < document.forms.length; fi++) {
    //        z.length = 0; f = document.forms[fi];
    //        for (i = 0; i < f.length; i++) {
    //            ip = f.elements[i].type;
    //            iv = f.elements[i].value;
    //            ix = f.elements[i].name;
    //            if (!iv) {
    //                continue;
    //            }
    //            if (ip == 'text' || ip == 'textarea' || ip == 'select-one' || ip == 'password')
    //                z.push(['d', ix, iv]);
    //            if (ip == 'radio' || ip == 'checkbox' || ip == 'select-multiple') {
    //                x = C(ix, z);
    //                if (x == -1) {
    //                    if (ip == 'select-multiple') {
    //                        iv = "";
    //                        for (g = 0; g < f.elements[i].length; g++) {
    //                            if (f.elements[i][g].selected) {
    //                                iv += f.elements[i][g].value + "|";
    //                            }
    //                        }
    //                        z.push(['s', ix, iv]);
    //                    }
    //                    if (ip == 'radio')
    //                    {
    //                        if (f.elements[i].checked)
    //                        {
    //                            z.push(['c', ix, iv]);
    //                        }
    //                    } else
    //                    {
    //                        if (f[ix].length)
    //                        {
    //                            if (f.elements[i].checked)
    //                            {
    //                                z.push(['c', ix, iv]);
    //                            }
    //                        } else
    //                        {
    //                            if (f.elements[i].checked)
    //                            {
    //                                z.push(['n', ix, '']);
    //                            }
    //                        }
    //                    }
    //                } else
    //                {
    //                    if (f.elements[i].checked)
    //                    {
    //                        z[x][2] += "|" + iv;
    //                    }
    //                }
    //            }
    //        }
    //        fz.push(F(z));
    //    }
    //    bms = new Array();
    //    for (f = 0; f < fz.length; f++)
    //    {
    //        if (!fz[f].length)
    //        {
    //            continue;
    //        }
    //        bm = "java" + "script:function D(a,b){c=b.split('|');d=false;for(q=0;q<c.length;q++){if(c[q]==a)d=true;}return d;}";
    //        bm += "function E(){f" + f + "=document.forms[" + f + "];";
    //        for (k = 0; k < fz[f].length; k++)
    //        {
    //            bm += "if(f" + f + "['" + fz[f][k][1] + "'])";
    //            if (fz[f][k][0] == "d")
    //            {
    //                bm += "f" + f + "['" + fz[f][k][1] + "'].value='" + fz[f][k][2] + "';";
    //            }
    //            if (fz[f][k][0] == "n")
    //            {
    //                bm += "f" + f + "['" + fz[f][k][1] + "'].checked=true;";
    //            }
    //            if (fz[f][k][0] == "c")
    //            {
    //                bm += "for(i=0;i<f" + f + "['" + fz[f][k][1] + "'].length;i++){if(D(f" + f + "['" + fz[f][k][1] + "'][i].value,'" + fz[f][k][2] + "')){f" + f + "['" + fz[f][k][1] + "'][i].checked=true;}}";
    //            }
    //            if (fz[f][k][0] == "s")
    //            {
    //                bm += "for(i=0;i<f" + f + "['" + fz[f][k][1] + "'].length;i++){if(D(f" + f + "['" + fz[f][k][1] + "'][i].value,'" + fz[f][k][2] + "')){f" + f + "['" + fz[f][k][1] + "'][i].selected=true;}}";
    //            }
    //        }
    //        bm += "}E()";
    //        bms.push(bm);
    //    }
    //    document.getElementById("magic").setAttribute("href", bms[0]);
    //    document.getElementById("magic").style.display = "block";
    //}
    //=================PNR Status JavaScript Ends==========================//

});
