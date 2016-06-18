/// <reference path="../models/grid.ts" />
/// <reference path="../services/entities/fieldconfigurationsservice.ts" />
var AngularTablesDataManagerApp;
(function (AngularTablesDataManagerApp) {
    var Directives;
    (function (Directives) {
        var FieldDirective = (function () {
            function FieldDirective(fieldConfigurationService) {
                var _this = this;
                this.restrict = 'A';
                this.scope = {
                    entityName: '=',
                    tipology: '='
                };
                this.link = function (scope, element, attrs) {
                    _this.fieldConfigurationsService.getFieldConfiguration(scope.entityName, scope.tipology.Name).then(function (data) {
                        var tipology = data;
                        if (tipology == '') {
                            tipology = scope.tipology.Type;
                        }
                        if (tipology == 'Edm.String') {
                            element.attr('type', 'text');
                        }
                        else if (scope.tipology.Type.toLowerCase().indexOf('int') != -1) {
                            element.attr('type', 'number');
                        }
                    });
                };
                this.fieldConfigurationsService = fieldConfigurationService;
            }
            return FieldDirective;
        }());
        Directives.FieldDirective = FieldDirective;
        AngularTablesDataManagerApp.AngularTablesDataManager.module.directive('field', ['FieldConfigurationsService', function (fieldConfigurationService) { return new Directives.FieldDirective(fieldConfigurationService); }]);
    })(Directives = AngularTablesDataManagerApp.Directives || (AngularTablesDataManagerApp.Directives = {}));
})(AngularTablesDataManagerApp || (AngularTablesDataManagerApp = {}));

//# sourceMappingURL=FieldDirective.js.map
