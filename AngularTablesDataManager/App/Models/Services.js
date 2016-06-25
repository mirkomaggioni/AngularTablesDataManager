/// <reference path="grid.ts" />
/// <reference path="../../scripts/typings/angularjs/angular-resource.d.ts" />
var AngularTablesDataManagerApp;
(function (AngularTablesDataManagerApp) {
    var Models;
    (function (Models) {
        var FieldItems = (function () {
            function FieldItems(fieldName) {
                this.FieldName = fieldName;
                this.FieldItems = new Array();
            }
            return FieldItems;
        }());
        Models.FieldItems = FieldItems;
        var FieldItem = (function () {
            function FieldItem(Id, Value) {
                this.Id = Id;
                this.Value = Value;
            }
            return FieldItem;
        }());
        Models.FieldItem = FieldItem;
    })(Models = AngularTablesDataManagerApp.Models || (AngularTablesDataManagerApp.Models = {}));
})(AngularTablesDataManagerApp || (AngularTablesDataManagerApp = {}));

//# sourceMappingURL=Services.js.map
