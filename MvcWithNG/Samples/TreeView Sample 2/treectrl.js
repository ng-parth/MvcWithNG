(function () {

    //angular module
    var myApp = angular.module('myApp', ['angularTreeview']);

    //test controller
    myApp.controller('myController', function ($scope) {

        //test tree model 1
        $scope.roleList1 = [
            {
                "roleName": "User", "roleId": "role1", "children": [
                { "roleName": "subUser1", "roleId": "role11", "children": [] },
                {
                    "roleName": "subUser2", "roleId": "role12", "children": [
                    {
                        "roleName": "subUser2-1", "roleId": "role121", "children": [
                        { "roleName": "subUser2-1-1", "roleId": "role1211", "children": [] },
                        { "roleName": "subUser2-1-2", "roleId": "role1212", "children": [] }
                        ]
                    }
                    ]
                }
                ]
            },
            { "roleName": "Admin", "roleId": "role2", "children": [] },
            { "roleName": "Guest", "roleId": "role3", "children": [] }
        ];
        //Product
        $scope.product = [{ "stage": 0, "displayTitle": null, "children": [], "enumGroupId": "", "propertySortOrder": 1, "type": "Property", "htmlControl": "Textbox", "property": "| Jobtitle", "propertyGroup": "PREPRESS/PLANNING" }, { "stage": 0, "displayTitle": null, "children": [], "enumGroupId": "", "propertySortOrder": 2, "type": "Property", "htmlControl": "Textbox", "property": "| Product Type", "propertyGroup": "PREPRESS/PLANNING" }, { "stage": 0, "displayTitle": null, "children": [], "enumGroupId": "", "propertySortOrder": 3, "type": "Property", "htmlControl": "Textbox", "property": "| Priority", "propertyGroup": "PREPRESS/PLANNING" }, { "stage": 0, "displayTitle": null, "children": [], "enumGroupId": "", "propertySortOrder": 4, "type": "Property", "htmlControl": "Textbox", "property": "| Basis", "propertyGroup": "PREPRESS/PLANNING" }, { "stage": 0, "displayTitle": null, "children": [], "enumGroupId": "", "propertySortOrder": 5, "type": "Property", "htmlControl": "NumericTextbox", "property": "| Circulation", "propertyGroup": "PREPRESS/PLANNING" }, { "stage": 0, "displayTitle": null, "children": [], "enumGroupId": "", "propertySortOrder": 6, "type": "Property", "htmlControl": "NumericTextbox", "property": "| Flw. X", "propertyGroup": "PREPRESS/PLANNING" }, { "stage": 0, "displayTitle": null, "children": [], "enumGroupId": "", "propertySortOrder": 7, "type": "Property", "htmlControl": "NumericTextbox", "property": "| Frequency", "propertyGroup": "PREPRESS/PLANNING" }, { "stage": 0, "displayTitle": null, "children": [], "enumGroupId": "", "propertySortOrder": 8, "type": "Property", "htmlControl": "NumericTextbox", "property": "| Height", "propertyGroup": "FORMAT" }, { "stage": 0, "displayTitle": null, "children": [], "enumGroupId": "", "propertySortOrder": 9, "type": "Property", "htmlControl": "NumericTextbox", "property": "| Width", "propertyGroup": "FORMAT" }, { "stage": 0, "displayTitle": null, "children": [{ "stage": 1, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 11, "type": "Enum", "htmlControl": null, "property": " |   - > INCH", "propertyGroup": null }, { "stage": 1, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 12, "type": "Enum", "htmlControl": null, "property": " |   - > MM", "propertyGroup": null }], "enumGroupId": "7737bdaf-f157-4354-920d-e4ce9523d57f", "propertySortOrder": 10, "type": "Property", "htmlControl": "Single Select Dropdown", "property": "| Units", "propertyGroup": "FORMAT" }, { "stage": 0, "displayTitle": null, "children": [{ "stage": 1, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 14, "type": "Enum", "htmlControl": null, "property": " |   - > 4", "propertyGroup": null }, { "stage": 1, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 15, "type": "Enum", "htmlControl": null, "property": " |   - > 8", "propertyGroup": null }, { "stage": 1, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 16, "type": "Enum", "htmlControl": null, "property": " |   - > 10", "propertyGroup": null }], "enumGroupId": "edbe232a-927b-4342-ba84-16eb434af63d", "propertySortOrder": 13, "type": "Property", "htmlControl": "Single Select Dropdown", "property": "| Pages", "propertyGroup": "COVER" }, { "stage": 0, "displayTitle": null, "children": [{ "stage": 1, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 18, "type": "Enum", "htmlControl": null, "property": " |   - > 0+0", "propertyGroup": null }, { "stage": 1, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 19, "type": "Enum", "htmlControl": null, "property": " |   - > 1+0", "propertyGroup": null }, { "stage": 1, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 20, "type": "Enum", "htmlControl": null, "property": " |   - > 1+1", "propertyGroup": null }, { "stage": 1, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 21, "type": "Enum", "htmlControl": null, "property": " |   - > 2+0", "propertyGroup": null }, { "stage": 1, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 22, "type": "Enum", "htmlControl": null, "property": " |   - > 2+1", "propertyGroup": null }, { "stage": 1, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 23, "type": "Enum", "htmlControl": null, "property": " |   - > 3+0", "propertyGroup": null }, { "stage": 1, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 24, "type": "Enum", "htmlControl": null, "property": " |   - > 3+1", "propertyGroup": null }, { "stage": 1, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 25, "type": "Enum", "htmlControl": null, "property": " |   - > 3+2", "propertyGroup": null }, { "stage": 1, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 26, "type": "Enum", "htmlControl": null, "property": " |   - > 3+3", "propertyGroup": null }], "enumGroupId": "67847615-dac2-46a0-a755-6ce0fee5827f", "propertySortOrder": 17, "type": "Property", "htmlControl": "Single Select Dropdown", "property": "| Print", "propertyGroup": "COVER" }, { "stage": 0, "displayTitle": null, "children": [{ "stage": 1, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 28, "type": "Enum", "htmlControl": null, "property": " |   - > CMYK", "propertyGroup": null }, { "stage": 1, "displayTitle": null, "children": [{ "stage": 2, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 30, "type": "Property", "htmlControl": null, "property": " |- - >> Enter colour", "propertyGroup": null }], "enumGroupId": null, "propertySortOrder": 29, "type": "Enum", "htmlControl": null, "property": " |   - > Other", "propertyGroup": null }], "enumGroupId": "0574034e-6051-4916-b872-615415a2f042", "propertySortOrder": 27, "type": "Property", "htmlControl": "Single Select Dropdown", "property": "| Print colourspace", "propertyGroup": "COVER" }, { "stage": 0, "displayTitle": null, "children": [{ "stage": 1, "displayTitle": null, "children": [{ "stage": 2, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 33, "type": "Enum", "htmlControl": null, "property": " |- - >> 0+1 Gloss", "propertyGroup": null }, { "stage": 2, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 34, "type": "Enum", "htmlControl": null, "property": " |- - >> 0+1 Matt", "propertyGroup": null }, { "stage": 2, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 35, "type": "Enum", "htmlControl": null, "property": " |- - >> 0+1 Neutral", "propertyGroup": null }, { "stage": 2, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 36, "type": "Enum", "htmlControl": null, "property": " |- - >> 1+0Neutral", "propertyGroup": null }, { "stage": 2, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 37, "type": "Enum", "htmlControl": null, "property": " |- - >> 1+0 Matt", "propertyGroup": null }, { "stage": 2, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 38, "type": "Enum", "htmlControl": null, "property": " |- - >> 1+0 Gloss", "propertyGroup": null }, { "stage": 2, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 39, "type": "Enum", "htmlControl": null, "property": " |- - >> 1+1 Gloss", "propertyGroup": null }, { "stage": 2, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 40, "type": "Enum", "htmlControl": null, "property": " |- - >> 1+1 Matt", "propertyGroup": null }, { "stage": 2, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 41, "type": "Enum", "htmlControl": null, "property": " |- - >> 1+1 Neutral", "propertyGroup": null }], "enumGroupId": null, "propertySortOrder": 32, "type": "Enum", "htmlControl": null, "property": " |   - > Aqua Varnish", "propertyGroup": null }, { "stage": 1, "displayTitle": null, "children": [{ "stage": 2, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 43, "type": "Enum", "htmlControl": null, "property": " |- - >> 0+1 Gloss", "propertyGroup": null }, { "stage": 2, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 44, "type": "Enum", "htmlControl": null, "property": " |- - >> 0+1 Matt", "propertyGroup": null }, { "stage": 2, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 45, "type": "Enum", "htmlControl": null, "property": " |- - >> 1+0 Gloss", "propertyGroup": null }, { "stage": 2, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 46, "type": "Enum", "htmlControl": null, "property": " |- - >> 1+0 Matt", "propertyGroup": null }, { "stage": 2, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 47, "type": "Enum", "htmlControl": null, "property": " |- - >> 1+1 Gloss", "propertyGroup": null }, { "stage": 2, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 48, "type": "Enum", "htmlControl": null, "property": " |- - >> 1+1 Matt", "propertyGroup": null }], "enumGroupId": null, "propertySortOrder": 42, "type": "Enum", "htmlControl": null, "property": " |   - > UV", "propertyGroup": null }, { "stage": 1, "displayTitle": null, "children": [{ "stage": 2, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 50, "type": "Enum", "htmlControl": null, "property": " |- - >> 0+1 Gloss", "propertyGroup": null }, { "stage": 2, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 51, "type": "Enum", "htmlControl": null, "property": " |- - >> 0+1 Matt", "propertyGroup": null }, { "stage": 2, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 52, "type": "Enum", "htmlControl": null, "property": " |- - >> 1+0 Gloss", "propertyGroup": null }, { "stage": 2, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 53, "type": "Enum", "htmlControl": null, "property": " |- - >> 1+0 Matt", "propertyGroup": null }, { "stage": 2, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 54, "type": "Enum", "htmlControl": null, "property": " |- - >> 1+1 Gloss", "propertyGroup": null }, { "stage": 2, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 55, "type": "Enum", "htmlControl": null, "property": " |- - >> 1+1 Matt", "propertyGroup": null }], "enumGroupId": null, "propertySortOrder": 49, "type": "Enum", "htmlControl": null, "property": " |   - > Spot UV", "propertyGroup": null }], "enumGroupId": "08504b0c-4a2e-406f-9d46-d0000d4704cb", "propertySortOrder": 31, "type": "Property", "htmlControl": "Multi Select Dropdown", "property": "| Varnish", "propertyGroup": "COVER" }, { "stage": 0, "displayTitle": null, "children": [{ "stage": 1, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 57, "type": "Enum", "htmlControl": null, "property": " |   - > Mat laminate", "propertyGroup": null }, { "stage": 1, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 58, "type": "Enum", "htmlControl": null, "property": " |   - > Gloss laminate", "propertyGroup": null }, { "stage": 1, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 59, "type": "Enum", "htmlControl": null, "property": " |   - > Soft touch/rubber duck laminate", "propertyGroup": null }, { "stage": 1, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 60, "type": "Enum", "htmlControl": null, "property": " |   - > Hammer laminate", "propertyGroup": null }, { "stage": 1, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 61, "type": "Enum", "htmlControl": null, "property": " |   - > Structure laminate", "propertyGroup": null }, { "stage": 1, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 62, "type": "Enum", "htmlControl": null, "property": " |   - > Embossed laminate", "propertyGroup": null }, { "stage": 1, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 63, "type": "Enum", "htmlControl": null, "property": " |   - > Gold laminate", "propertyGroup": null }, { "stage": 1, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 64, "type": "Enum", "htmlControl": null, "property": " |   - > Silver laminate", "propertyGroup": null }, { "stage": 1, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 65, "type": "Enum", "htmlControl": null, "property": " |   - > Hologrphic laminate", "propertyGroup": null }, { "stage": 1, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 66, "type": "Enum", "htmlControl": null, "property": " |   - > Scratch free laminate", "propertyGroup": null }], "enumGroupId": "f637f0e1-6228-4f87-b3d8-a16d036db546", "propertySortOrder": 56, "type": "Property", "htmlControl": "Multi Select Dropdown", "property": "| Lamination", "propertyGroup": "COVER" }, { "stage": 0, "displayTitle": null, "children": [{ "stage": 1, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 68, "type": "Enum", "htmlControl": null, "property": " |   - > Crease", "propertyGroup": null }, { "stage": 1, "displayTitle": null, "children": [{ "stage": 2, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 70, "type": "Enum", "htmlControl": null, "property": " |- - >> #1", "propertyGroup": null }, { "stage": 2, "displayTitle": null, "children": [{ "stage": 3, "displayTitle": null, "children": [], "enumGroupId": "", "propertySortOrder": 72, "type": "Property", "htmlControl": "NumericTextbox", "property": " |- - - >>> Height", "propertyGroup": null }, { "stage": 3, "displayTitle": null, "children": [], "enumGroupId": "", "propertySortOrder": 73, "type": "Property", "htmlControl": "NumericTextbox", "property": " |- - - >>> Width", "propertyGroup": null }], "enumGroupId": null, "propertySortOrder": 71, "type": "Enum", "htmlControl": null, "property": " |- - >> #2", "propertyGroup": null }, { "stage": 2, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 74, "type": "Enum", "htmlControl": null, "property": " |- - >> #3", "propertyGroup": null }], "enumGroupId": null, "propertySortOrder": 69, "type": "Enum", "htmlControl": null, "property": " |   - > Deboss (like foils)", "propertyGroup": null }, { "stage": 1, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 75, "type": "Enum", "htmlControl": null, "property": " |   - > Die Cut", "propertyGroup": null }, { "stage": 1, "displayTitle": null, "children": [{ "stage": 2, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 77, "type": "Enum", "htmlControl": null, "property": " |- - >> #1", "propertyGroup": null }, { "stage": 2, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 78, "type": "Enum", "htmlControl": null, "property": " |- - >> #2", "propertyGroup": null }, { "stage": 2, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 79, "type": "Enum", "htmlControl": null, "property": " |- - >> #3", "propertyGroup": null }], "enumGroupId": null, "propertySortOrder": 76, "type": "Enum", "htmlControl": null, "property": " |   - > Emboss (like foils)", "propertyGroup": null }, { "stage": 1, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 80, "type": "Enum", "htmlControl": null, "property": " |   - > Filigran", "propertyGroup": null }, { "stage": 1, "displayTitle": null, "children": [{ "stage": 2, "displayTitle": null, "children": [{ "stage": 3, "displayTitle": null, "children": [{ "stage": 4, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 84, "type": "Enum", "htmlControl": null, "property": " |- - - - >>>> Silver", "propertyGroup": null }, { "stage": 4, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 85, "type": "Enum", "htmlControl": null, "property": " |- - - - >>>> Gold", "propertyGroup": null }, { "stage": 4, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 86, "type": "Enum", "htmlControl": null, "property": " |- - - - >>>> Metalic", "propertyGroup": null }, { "stage": 4, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 87, "type": "Enum", "htmlControl": null, "property": " |- - - - >>>> Aluminium", "propertyGroup": null }], "enumGroupId": null, "propertySortOrder": 83, "type": "Enum", "htmlControl": null, "property": " |- - - >>> Type", "propertyGroup": null }], "enumGroupId": null, "propertySortOrder": 82, "type": "Enum", "htmlControl": null, "property": " |- - >> #1", "propertyGroup": null }, { "stage": 2, "displayTitle": null, "children": [{ "stage": 3, "displayTitle": null, "children": [{ "stage": 4, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 90, "type": "Enum", "htmlControl": null, "property": " |- - - - >>>> Silver", "propertyGroup": null }, { "stage": 4, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 91, "type": "Enum", "htmlControl": null, "property": " |- - - - >>>> Gold", "propertyGroup": null }, { "stage": 4, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 92, "type": "Enum", "htmlControl": null, "property": " |- - - - >>>> Metalic", "propertyGroup": null }, { "stage": 4, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 93, "type": "Enum", "htmlControl": null, "property": " |- - - - >>>> Aluminium", "propertyGroup": null }], "enumGroupId": null, "propertySortOrder": 89, "type": "Enum", "htmlControl": null, "property": " |- - - >>> Type", "propertyGroup": null }], "enumGroupId": null, "propertySortOrder": 88, "type": "Enum", "htmlControl": null, "property": " |- - >> #2", "propertyGroup": null }, { "stage": 2, "displayTitle": null, "children": [{ "stage": 3, "displayTitle": null, "children": [{ "stage": 4, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 96, "type": "Enum", "htmlControl": null, "property": " |- - - - >>>> Silver", "propertyGroup": null }, { "stage": 4, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 97, "type": "Enum", "htmlControl": null, "property": " |- - - - >>>> Gold", "propertyGroup": null }, { "stage": 4, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 98, "type": "Enum", "htmlControl": null, "property": " |- - - - >>>> Metalic", "propertyGroup": null }, { "stage": 4, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 99, "type": "Enum", "htmlControl": null, "property": " |- - - - >>>> Aluminium", "propertyGroup": null }], "enumGroupId": null, "propertySortOrder": 95, "type": "Enum", "htmlControl": null, "property": " |- - - >>> Type", "propertyGroup": null }], "enumGroupId": null, "propertySortOrder": 94, "type": "Enum", "htmlControl": null, "property": " |- - >> #3", "propertyGroup": null }], "enumGroupId": null, "propertySortOrder": 81, "type": "Enum", "htmlControl": null, "property": " |   - > Foil stamp", "propertyGroup": null }, { "stage": 1, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 100, "type": "Enum", "htmlControl": null, "property": " |   - > Laser die cut", "propertyGroup": null }, { "stage": 1, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 101, "type": "Enum", "htmlControl": null, "property": " |   - > Scent varnish", "propertyGroup": null }, { "stage": 1, "displayTitle": null, "children": [], "enumGroupId": null, "propertySortOrder": 102, "type": "Enum", "htmlControl": null, "property": " |   - > Scratch silver", "propertyGroup": null }], "enumGroupId": "5cbf0ebd-2dff-4f0d-8c40-787c9ff513e5", "propertySortOrder": 67, "type": "Property", "htmlControl": "Multi Select Dropdown", "property": "| Pre finishing", "propertyGroup": "COVER" }];


        //test tree model 2
        $scope.roleList2 = [
            {
                "roleName": "User", "roleId": "role1", "children": [
                { "roleName": "subUser1", "roleId": "role11", "collapsed": true, "children": [] },
                {
                    "roleName": "subUser2", "roleId": "role12", "collapsed": true, "children": [
                    {
                        "roleName": "subUser2-1", "roleId": "role121", "children": [
                        { "roleName": "subUser2-1-1", "roleId": "role1211", "children": [] },
                        { "roleName": "subUser2-1-2", "roleId": "role1212", "children": [] }
                        ]
                    }
                    ]
                }
                ]
            },

            {
                "roleName": "Admin", "roleId": "role2", "children": [
                { "roleName": "subAdmin1", "roleId": "role11", "collapsed": true, "children": [] },
                {
                    "roleName": "subAdmin2", "roleId": "role12", "children": [
                    {
                        "roleName": "subAdmin2-1", "roleId": "role121", "children": [
                        { "roleName": "subAdmin2-1-1", "roleId": "role1211", "children": [] },
                        { "roleName": "subAdmin2-1-2", "roleId": "role1212", "children": [] }
                        ]
                    }
                    ]
                }
                ]
            },

            {
                "roleName": "Guest", "roleId": "role3", "children": [
                { "roleName": "subGuest1", "roleId": "role11", "children": [] },
                {
                    "roleName": "subGuest2", "roleId": "role12", "collapsed": true, "children": [
                    {
                        "roleName": "subGuest2-1", "roleId": "role121", "children": [
                        { "roleName": "subGuest2-1-1", "roleId": "role1211", "children": [] },
                        { "roleName": "subGuest2-1-2", "roleId": "role1212", "children": [] }
                        ]
                    }
                    ]
                }
                ]
            }
        ];



        //roleList1 to treeview
        $scope.roleList = $scope.roleList1;

    });

})();


/*
	@license Angular Treeview version 0.1.5
	? 2013 AHN JAE-HA http://github.com/eu81273/angular.treeview
	License: MIT
*/

(function (f) {
    f.module("angularTreeview", []).directive("treeModel", function ($compile) {
        return {
            restrict: "A",
            link: function (b, h, c) {
                var a = c.treeId,
                    g = c.treeModel,
                    e = c.nodeLabel || "label",
                    d = c.nodeChildren || "children",
                    e = '<ul><li data-ng-repeat="node in ' + g + '"><i class="collapsed" data-ng-show="node.' + d + '.length && node.collapsed" data-ng-click="' + a +
                    '.selectNodeHead(node)"></i><i class="expanded" data-ng-show="node.' + d + '.length && !node.collapsed" data-ng-click="' + a +
                    '.selectNodeHead(node)"></i><i class="normal" data-ng-hide="node.' + d + '.length"></i> <span data-ng-class="node.selected" data-ng-click="' + a +
                    '.selectNodeLabel(node)">{{node.' + e + '}}</span><div data-ng-hide="node.collapsed" data-tree-id="' + a + '" data-tree-model="node.' + d +
                    '" data-node-id=' + (c.nodeId || "id") + " data-node-label=" + e + " data-node-children=" + d + "></div></li></ul>";

                a && g && (c.angularTreeview && (b[a] = b[a] || {}, b[a].selectNodeHead = b[a].selectNodeHead || function (a) { a.collapsed = !a.collapsed }, b[a].selectNodeLabel = b[a].selectNodeLabel || function (c) {
                    b[a].currentNode && b[a].currentNode.selected &&
                    (b[a].currentNode.selected = void 0); c.selected = "selected"; b[a].currentNode = c
                    //}), h.html(null).append($compile(e)(b)))
                    }), h.html('').append($compile(e)(b)))
            }
        }
    })
})(angular);