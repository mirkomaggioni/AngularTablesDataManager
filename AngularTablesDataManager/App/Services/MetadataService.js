/// <reference path="../app.ts" />
/// <reference path="../models/grid.ts" />
var AngularTablesDataManagerApp;
(function (AngularTablesDataManagerApp) {
    var Services;
    (function (Services) {
        var models = AngularTablesDataManagerApp.Models;
        var MetadataService = (function () {
            function MetadataService($http, $q, $filter) {
                this.$http = $http;
                this.$q = $q;
                this.$filter = $filter;
            }
            MetadataService.prototype.getMetadata = function (entityName, columns) {
                var defer = this.$q.defer();
                var req = {
                    method: 'GET',
                    url: '/odata/$metadata'
                };
                var vm = this;
                this.$http(req).then(function (result) {
                    var data = result.data.toString();
                    var xmlDoc = $.parseXML(data);
                    var xml = $(xmlDoc);
                    var properties = new Array();
                    xml.find('EntityType[Name="' + entityName + '"]').find('Property').each(function () {
                        if (vm.$filter('filter')(columns, { $: $(this).attr('Name') }).length > 0) {
                            var metadataProperty = new models.MetadataProperty();
                            metadataProperty.Name = $(this).attr('Name');
                            metadataProperty.Type = $(this).attr('Type');
                            metadataProperty.Nullable = ($(this).attr('Nullable') != null) && ($(this).attr('Nullable').toLowerCase() == 'true');
                            properties.push(metadataProperty);
                        }
                    });
                    return defer.resolve(properties);
                });
                return defer.promise;
            };
            MetadataService.factory = function () {
                return function ($http, $q, $filter) { return new MetadataService($http, $q, $filter); };
            };
            return MetadataService;
        }());
        Services.MetadataService = MetadataService;
        AngularTablesDataManagerApp.AngularTablesDataManager.module.factory('MetadataService', ['$http', '$q', '$filter', MetadataService.factory()]);
    })(Services = AngularTablesDataManagerApp.Services || (AngularTablesDataManagerApp.Services = {}));
})(AngularTablesDataManagerApp || (AngularTablesDataManagerApp = {}));

//# sourceMappingURL=MetadataService.js.map
