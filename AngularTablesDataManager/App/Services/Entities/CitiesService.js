/// <reference path="../../app.ts" />
/// <reference path="../../commons.ts" />
/// <reference path="../../models/cities.ts" />
/// <reference path="../../models/services.ts" />
/// <reference path="../gridservice.ts" />
/// <reference path="../../../scripts/typings/angularjs/angular-resource.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AngularTablesDataManagerApp;
(function (AngularTablesDataManagerApp) {
    var Services;
    (function (Services) {
        var commons = AngularTablesDataManagerApp.Commons;
        var services = AngularTablesDataManagerApp.Services;
        var CitiesService = (function (_super) {
            __extends(CitiesService, _super);
            function CitiesService($resource, $q, metadataService) {
                _super.call(this, 'Cities', 'City', metadataService);
                this.$q = $q;
                this.metadataService = metadataService;
                this.resource = $resource('/odata/' + this.entitySet + "(guid':key')", { key: '@Id' }, {
                    get: { method: 'GET' },
                    create: { method: 'POST', isArray: false, url: '/odata/' + this.entitySet },
                    save: { method: 'PUT' },
                    query: { method: 'GET', isArray: false, url: '/odata/' + this.entitySet },
                    delete: { method: 'DELETE' }
                });
            }
            CitiesService.prototype.create = function (city) {
                return this.resource.create(city);
            };
            CitiesService.prototype.save = function (city) {
                if (city.Id == commons.Constants.GuidEmpty) {
                    return this.resource.create(city);
                }
                else {
                    return this.resource.save(city);
                }
            };
            CitiesService.prototype.delete = function (city) {
                return this.resource.delete({ key: city.Id });
            };
            CitiesService.prototype.getGridData = function (Columns) {
                var _this = this;
                var datas;
                var defer = this.$q.defer();
                this.resource.query().$promise.then(function (data) {
                    datas = data["value"];
                    return defer.resolve(_super.prototype.getData.call(_this, Columns, datas));
                }, function (error) {
                    return defer.reject(error);
                });
                return defer.promise;
            };
            CitiesService.prototype.createGridData = function (Columns) {
                var entity = { Id: commons.Constants.GuidEmpty, Name: '' };
                return _super.prototype.createData.call(this, Columns, entity);
            };
            CitiesService.prototype.saveGridData = function (item) {
                var defer = this.$q.defer();
                this.save(_super.prototype.saveData.call(this, item)).$promise.then(function (data) {
                    item.Entity = data;
                    return defer.resolve(item);
                }, function (error) {
                    return defer.reject(error);
                });
                return defer.promise;
            };
            CitiesService.prototype.deleteGridData = function (item) {
                var defer = this.$q.defer();
                this.delete(item.Entity).$promise.then(function (data) {
                    return defer.resolve(item);
                }, function (error) {
                    return defer.reject(error);
                });
                return defer.promise;
            };
            CitiesService.factory = function () {
                return function (r, $q, MetadataService) { return new CitiesService(r, $q, MetadataService); };
            };
            return CitiesService;
        }(services.GridService));
        Services.CitiesService = CitiesService;
        AngularTablesDataManagerApp.AngularTablesDataManager.module.factory('CitiesService', ['$resource', '$q', 'MetadataService', CitiesService.factory()]);
    })(Services = AngularTablesDataManagerApp.Services || (AngularTablesDataManagerApp.Services = {}));
})(AngularTablesDataManagerApp || (AngularTablesDataManagerApp = {}));

//# sourceMappingURL=CitiesService.js.map
