/// <reference path="../../app.ts" />
/// <reference path="../../commons.ts" />
/// <reference path="../../models/zips.ts" />
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
        var ZipsService = (function (_super) {
            __extends(ZipsService, _super);
            function ZipsService($resource, $q, metadataService) {
                _super.call(this, 'Zips', 'Zip', metadataService);
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
            ZipsService.prototype.create = function (zip) {
                return this.resource.create(zip);
            };
            ZipsService.prototype.save = function (zip) {
                if (zip.Id == commons.Constants.GuidEmpty) {
                    return this.resource.create(zip);
                }
                else {
                    return this.resource.save(zip);
                }
            };
            ZipsService.prototype.delete = function (zip) {
                return this.resource.delete({ key: zip.Id });
            };
            ZipsService.prototype.getAll = function () {
                var defer = this.$q.defer();
                this.resource.query().$promise.then(function (data) {
                    return defer.resolve(data["value"]);
                }, function (error) {
                    return defer.reject(error);
                });
                return defer.promise;
            };
            ZipsService.prototype.getGridData = function (Columns) {
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
            ZipsService.prototype.createGridData = function (Columns) {
                var entity = { Id: commons.Constants.GuidEmpty, Code: null };
                return _super.prototype.createData.call(this, Columns, entity);
            };
            ZipsService.prototype.saveGridData = function (item) {
                var defer = this.$q.defer();
                this.save(_super.prototype.saveData.call(this, item)).$promise.then(function (data) {
                    item.Entity = data;
                    return defer.resolve(item);
                }, function (error) {
                    return defer.reject(error);
                });
                return defer.promise;
            };
            ZipsService.prototype.deleteGridData = function (item) {
                var defer = this.$q.defer();
                this.delete(item.Entity).$promise.then(function (data) {
                    return defer.resolve(item);
                }, function (error) {
                    return defer.reject(error);
                });
                return defer.promise;
            };
            ZipsService.factory = function () {
                return function (r, $q, MetadataService) { return new ZipsService(r, $q, MetadataService); };
            };
            return ZipsService;
        }(services.GridService));
        Services.ZipsService = ZipsService;
        AngularTablesDataManagerApp.AngularTablesDataManager.module.factory('ZipsService', ['$resource', '$q', 'MetadataService', ZipsService.factory()]);
    })(Services = AngularTablesDataManagerApp.Services || (AngularTablesDataManagerApp.Services = {}));
})(AngularTablesDataManagerApp || (AngularTablesDataManagerApp = {}));

//# sourceMappingURL=ZipsService.js.map
