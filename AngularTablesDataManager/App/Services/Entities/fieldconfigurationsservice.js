/// <reference path="../../app.ts" />
/// <reference path="../../commons.ts" />
/// <reference path="../../models/fieldconfigurations.ts" />
/// <reference path="../../models/services.ts" />
/// <reference path="../../../scripts/typings/angularjs/angular-resource.d.ts" />
var AngularTablesDataManagerApp;
(function (AngularTablesDataManagerApp) {
    var Services;
    (function (Services) {
        var commons = AngularTablesDataManagerApp.Commons;
        var FieldConfigurationsService = (function () {
            function FieldConfigurationsService($resource, $q, $filter, metadataService) {
                this.entitySet = 'FieldConfigurations';
                this.$q = $q;
                this.$filter = $filter;
                this.metadataService = metadataService;
                this.resource = $resource('/odata/' + this.entitySet + "(guid':key')", { key: '@Id' }, {
                    get: { method: 'GET' },
                    create: { method: 'POST', isArray: false, url: '/odata/' + this.entitySet },
                    save: { method: 'PUT' },
                    query: { method: 'GET', isArray: false, url: '/odata/' + this.entitySet },
                    delete: { method: 'DELETE' }
                });
            }
            FieldConfigurationsService.prototype.create = function (fieldConfiguration) {
                return this.resource.create(fieldConfiguration);
            };
            FieldConfigurationsService.prototype.save = function (fieldConfiguration) {
                if (fieldConfiguration.Id == commons.Constants.GuidEmpty) {
                    return this.resource.create(fieldConfiguration);
                }
                else {
                    return this.resource.save(fieldConfiguration);
                }
            };
            FieldConfigurationsService.prototype.delete = function (fieldConfiguration) {
                return this.resource.delete({ key: fieldConfiguration.Id });
            };
            FieldConfigurationsService.prototype.getFieldConfiguration = function (entityName, fieldName) {
                var defer = this.$q.defer();
                var vm = this;
                if (this.fieldConfigurations == null) {
                    vm.resource.query().$promise.then(function (data) {
                        vm.fieldConfigurations = data["value"];
                        defer.resolve(vm.getFieldTipology(entityName, fieldName));
                    }, function (error) {
                        defer.reject(error);
                    });
                }
                else {
                    //return <ng.IPromise<string>><any>defer.resolve(vm.getFieldTipology(entityName, fieldName));
                    defer.resolve(vm.getFieldTipology(entityName, fieldName));
                }
                return defer.promise;
            };
            FieldConfigurationsService.prototype.getFieldTipology = function (entityName, fieldName) {
                var fieldConfigurations = this.$filter('filter')(this.fieldConfigurations, { 'Entity': entityName, 'Field': fieldName });
                if (fieldConfigurations.length > 0) {
                    return fieldConfigurations[0].Tipology;
                }
                else {
                    return '';
                }
            };
            FieldConfigurationsService.factory = function () {
                return function (r, $q, $filter, MetadataService) { return new FieldConfigurationsService(r, $q, $filter, MetadataService); };
            };
            return FieldConfigurationsService;
        }());
        Services.FieldConfigurationsService = FieldConfigurationsService;
        AngularTablesDataManagerApp.AngularTablesDataManager.module.factory('FieldConfigurationsService', ['$resource', '$q', '$filter', 'MetadataService', FieldConfigurationsService.factory()]);
    })(Services = AngularTablesDataManagerApp.Services || (AngularTablesDataManagerApp.Services = {}));
})(AngularTablesDataManagerApp || (AngularTablesDataManagerApp = {}));

//# sourceMappingURL=FieldConfigurationsService.js.map
