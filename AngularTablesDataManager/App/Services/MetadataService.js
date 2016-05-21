/// <reference path="../app.ts" />
/// <reference path="../models/metadataproperties.ts" />
var AngularTablesDataManagerApp;
(function (AngularTablesDataManagerApp) {
    var Services;
    (function (Services) {
        var models = AngularTablesDataManagerApp.Models;
        var MetadataService = (function () {
            function MetadataService($http, $q) {
                this.$http = $http;
                this.$q = $q;
            }
            MetadataService.prototype.getMetadata = function (entityName) {
                var defer = this.$q.defer();
                var req = {
                    method: 'GET',
                    url: '/odata/$metadata#' + entityName
                };
                this.$http(req).then(function (result) {
                    var data = result.data.toString();
                    var xmlDoc = $.parseXML(data);
                    var xml = $(xmlDoc);
                    var properties = new Array();
                    xml.find('EntityType').find('Property').each(function () {
                        var metadataProperty = new models.MetadataProperty();
                        metadataProperty.Name = $(this).attr('Name');
                        metadataProperty.Type = $(this).attr('Type');
                        metadataProperty.Nullable = ($(this).attr('Nullable') != null) && ($(this).attr('Nullable').toLowerCase() == 'true');
                        properties.push(metadataProperty);
                    });
                    return defer.resolve(properties);
                });
                return defer.promise;
            };
            MetadataService.factory = function () {
                return function ($http, $q) { return new MetadataService($http, $q); };
            };
            return MetadataService;
        }());
        Services.MetadataService = MetadataService;
        AngularTablesDataManagerApp.AngularTablesDataManager.module.factory('MetadataService', ['$http', '$q', MetadataService.factory()]);
    })(Services = AngularTablesDataManagerApp.Services || (AngularTablesDataManagerApp.Services = {}));
})(AngularTablesDataManagerApp || (AngularTablesDataManagerApp = {}));

//# sourceMappingURL=MetadataService.js.map
