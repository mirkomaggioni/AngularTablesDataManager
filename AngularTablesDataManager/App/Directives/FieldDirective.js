/// <reference path="../models/grid.ts" />
var AngularTablesDataManagerApp;
(function (AngularTablesDataManagerApp) {
    var Directives;
    (function (Directives) {
        var FieldDirective = (function () {
            function FieldDirective() {
                this.restrict = 'A';
                this.scope = {
                    tipology: '=',
                };
                this.link = function (scope, element, attrs) {
                    if (scope.tipology.Type == 'Edm.String') {
                        element.attr('type', 'text');
                    }
                    else if (scope.tipology.Type.toLowerCase().indexOf('int') != -1) {
                        element.attr('type', 'number');
                    }
                };
            }
            return FieldDirective;
        }());
        Directives.FieldDirective = FieldDirective;
        AngularTablesDataManagerApp.AngularTablesDataManager.module.directive('field', function () { return new Directives.FieldDirective; });
    })(Directives = AngularTablesDataManagerApp.Directives || (AngularTablesDataManagerApp.Directives = {}));
})(AngularTablesDataManagerApp || (AngularTablesDataManagerApp = {}));

//# sourceMappingURL=FieldDirective.js.map
