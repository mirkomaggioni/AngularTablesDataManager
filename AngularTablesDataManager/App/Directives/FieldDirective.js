/// <reference path="../models/grid.ts" />
/// <reference path="../services/entities/fieldconfigurationsservice.ts" />
var AngularTablesDataManagerApp;
(function (AngularTablesDataManagerApp) {
    var Directives;
    (function (Directives) {
        var models = AngularTablesDataManagerApp.Models;
        var FieldDirective = (function () {
            function FieldDirective(fieldConfigurationService) {
                var _this = this;
                this.restrict = 'E';
                this.scope = {
                    entityName: '=',
                    tipology: '=',
                    property: '=',
                    fieldItems: '='
                };
                this.template = '<ng-include src="contentUrl" />';
                this.link = function (scope, element, attrs) {
                    scope.values = new Array();
                    if (scope.fieldItems != null) {
                        for (var i = 0; i < scope.fieldItems.length; i++) {
                            scope.values.push(scope.fieldItems[i]);
                        }
                    }
                    var tipology = scope.tipology.Type;
                    _this.fieldConfigurationsService.getFieldConfigurationTipology(scope.entityName, scope.tipology.Name).then(function (data) {
                        if (data != "") {
                            tipology = data;
                            _this.fieldConfigurationsService.getFieldValues(scope.entityName, scope.tipology.Name).then(function (data) {
                                for (var i = 0; i < data.length; i++) {
                                    var item = new models.FieldItem(data[i], data[i]);
                                    scope.values.push(item);
                                }
                                _this.openView(scope, tipology);
                            });
                        }
                        else {
                            _this.openView(scope, tipology);
                        }
                    });
                };
                this.fieldConfigurationsService = fieldConfigurationService;
            }
            FieldDirective.prototype.openView = function (scope, tipology) {
                if (tipology.toLowerCase().indexOf('int') != -1) {
                    scope.contentUrl = 'app/directives/InputNumber.html';
                }
                else if (tipology.toLowerCase().indexOf('radio') != -1) {
                    scope.contentUrl = 'app/directives/InputRadio.html';
                }
                else if (tipology.toLowerCase().indexOf('select') != -1) {
                    scope.contentUrl = 'app/directives/InputSelect.html';
                }
                else {
                    scope.contentUrl = 'app/directives/InputText.html';
                }
            };
            return FieldDirective;
        }());
        Directives.FieldDirective = FieldDirective;
        AngularTablesDataManagerApp.AngularTablesDataManager.module.directive('field', ['FieldConfigurationsService', function (fieldConfigurationService) { return new Directives.FieldDirective(fieldConfigurationService); }]);
    })(Directives = AngularTablesDataManagerApp.Directives || (AngularTablesDataManagerApp.Directives = {}));
})(AngularTablesDataManagerApp || (AngularTablesDataManagerApp = {}));

//# sourceMappingURL=FieldDirective.js.map
