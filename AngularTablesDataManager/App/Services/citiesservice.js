/// <reference path="../app.ts" />
/// <reference path="../commons.ts" />
/// <reference path="../models/cities.ts" />
/// <reference path="../models/services.ts" />
/// <reference path="metadataservice.ts" />
/// <reference path="../../scripts/typings/angularjs/angular-resource.d.ts" />
var AngularTablesDataManagerApp;
(function (AngularTablesDataManagerApp) {
    var Services;
    (function (Services) {
        var entityName = 'Cities';
        var commons = AngularTablesDataManagerApp.Commons;
        var CitiesService = (function () {
            function CitiesService($resource, $q, MetadataService) {
                this.$q = $q;
                this.metadataService = MetadataService;
                this.resource = $resource('/odata/' + entityName + '/:id', { id: '@Id' }, {
                    get: { method: "GET" },
                    create: { method: "POST" },
                    save: { method: "PUT" },
                    query: { method: "GET", isArray: false },
                    delete: { method: "DELETE" }
                });
            }
            CitiesService.prototype.create = function (order) {
                return this.resource.create(order);
            };
            CitiesService.prototype.save = function (order) {
                if (order.Id == commons.Constants.GuidEmpty) {
                    return this.resource.create(order);
                }
                else {
                    return this.resource.save(order);
                }
            };
            CitiesService.prototype.delete = function (order) {
                return this.resource.remove(order);
            };
            CitiesService.prototype.getAll = function () {
                var datas;
                var defer = this.$q.defer();
                this.resource.query().$promise.then(function (data) {
                    datas = data["value"];
                    return defer.resolve(datas);
                }, function (error) {
                    return defer.reject(datas);
                });
                return defer.promise;
            };
            CitiesService.prototype.getMetadata = function () {
                return this.metadataService.getMetadata(entityName);
            };
            CitiesService.factory = function () {
                return function (r, $q, MetadataService) { return new CitiesService(r, $q, MetadataService); };
            };
            return CitiesService;
        }());
        Services.CitiesService = CitiesService;
        AngularTablesDataManagerApp.AngularTablesDataManager.module.factory('CitiesService', ['$resource', '$q', 'MetadataService', CitiesService.factory()]);
    })(Services = AngularTablesDataManagerApp.Services || (AngularTablesDataManagerApp.Services = {}));
})(AngularTablesDataManagerApp || (AngularTablesDataManagerApp = {}));

//# sourceMappingURL=CitiesService.js.map
