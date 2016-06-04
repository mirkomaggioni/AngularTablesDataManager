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
        var commons = AngularTablesDataManagerApp.Commons;
        var models = AngularTablesDataManagerApp.Models;
        var CitiesService = (function () {
            function CitiesService($resource, $q, MetadataService) {
                this.entitySet = 'Cities';
                this.entityName = 'City';
                this.$q = $q;
                this.metadataService = MetadataService;
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
            CitiesService.prototype.getAll = function () {
                var datas;
                var defer = this.$q.defer();
                this.resource.query().$promise.then(function (data) {
                    datas = data["value"];
                    return defer.resolve(datas);
                }, function (error) {
                    return defer.reject(error);
                });
                return defer.promise;
            };
            CitiesService.prototype.getMetadata = function (columns) {
                return this.metadataService.getMetadata(this.entitySet, columns);
            };
            CitiesService.prototype.getGridData = function (Columns) {
                var _this = this;
                var gridData = new Array();
                var rowData;
                var defer = this.$q.defer();
                this.getAll().then(function (data) {
                    for (var i = 0; i < data.length; i++) {
                        var city = data[i];
                        rowData = new Array();
                        for (var a = 0; a < Columns.length; a++) {
                            rowData.push(new models.RowProperty(Columns[a].Name, city[Columns[a].Name], Columns[a].Nullable));
                        }
                        gridData.push(new models.Row(city, _this.entityName, rowData));
                    }
                    return defer.resolve(gridData);
                }, function (error) {
                    return defer.reject(error);
                });
                return defer.promise;
            };
            CitiesService.prototype.createGridData = function (Columns) {
                var entity = { Id: commons.Constants.GuidEmpty, Name: '' };
                var datas = new Array();
                //datas.push({ Name: 'Name', Value: '', Nullable: false });
                var item = new models.Row(entity, 'City', datas);
                for (var a = 0; a < Columns.length; a++) {
                    datas.push(new models.RowProperty(Columns[a].Name, '', Columns[a].Nullable));
                }
                return item;
            };
            CitiesService.prototype.saveGridData = function (item) {
                var defer = this.$q.defer();
                for (var i = 0; i < item.Properties.length; i++) {
                    item.Entity[item.Properties[i].Name] = item.Properties[i].Value;
                }
                this.save(item.Entity).$promise.then(function (data) {
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
        }());
        Services.CitiesService = CitiesService;
        AngularTablesDataManagerApp.AngularTablesDataManager.module.factory('CitiesService', ['$resource', '$q', 'MetadataService', CitiesService.factory()]);
    })(Services = AngularTablesDataManagerApp.Services || (AngularTablesDataManagerApp.Services = {}));
})(AngularTablesDataManagerApp || (AngularTablesDataManagerApp = {}));

//# sourceMappingURL=CitiesService.js.map
