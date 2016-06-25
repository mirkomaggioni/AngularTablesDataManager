/// <reference path="../../scripts/typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
/// <reference path="../../scripts/typings/angularjs-toaster/angularjs-toaster.d.ts" />
/// <reference path="../../scripts/typings/angularjs/angular-resource.d.ts" />
/// <reference path="../models/grid.ts" />
/// <reference path="../services/entities/zipsservice.ts" />
var AngularTablesDataManagerApp;
(function (AngularTablesDataManagerApp) {
    var Controllers;
    (function (Controllers) {
        var commons = AngularTablesDataManagerApp.Commons;
        var models = AngularTablesDataManagerApp.Models;
        var ZipsController = (function () {
            function ZipsController(toaster, ZipsService) {
                this.zipsService = ZipsService;
                this.constant = commons.Constants;
                this.toaster = toaster;
                this.grid = new models.Grid();
                this.fieldItems = new Array();
                this.grid.Title = 'Zips';
                this.Load();
            }
            ZipsController.prototype.Load = function () {
                var _this = this;
                var columns = new Array();
                var column = new models.Column('Code', true, true);
                columns.push(column);
                var vm = this;
                this.zipsService.getMetadata(columns).then(function (data) {
                    vm.grid.Columns = data;
                    vm.rowModel = _this.zipsService.createGridData(data);
                    _this.zipsService.getGridData(data).then(function (data) {
                        vm.grid.Rows = data;
                        vm.toaster.success('Zips loaded successfully.');
                        return;
                    }, function (error) {
                        vm.toaster.error('Error loading zips', error.message);
                    });
                }, function (error) {
                    vm.toaster.error('Error loading zips metadata', error.data.message);
                });
            };
            ZipsController.prototype.Save = function (item) {
                var _this = this;
                var vm = this;
                var isNew = false;
                if (item.Entity.Id == commons.Constants.GuidEmpty)
                    isNew = true;
                this.zipsService.saveGridData(item).then(function (data) {
                    if (isNew)
                        vm.grid.Rows.push(data);
                    _this.toaster.success("Zip saved successfully.");
                }, function (error) {
                    _this.toaster.error("Error saving zip", error.data.message);
                });
            };
            ZipsController.prototype.Delete = function (item) {
                var _this = this;
                var vm = this;
                this.zipsService.deleteGridData(item).then(function (data) {
                    var index = vm.grid.Rows.indexOf(item);
                    vm.grid.Rows.splice(index, 1);
                    _this.toaster.success("Zip deleted successfully.");
                }, function (error) {
                    _this.toaster.error("Error deleting zip", error.data.message);
                });
            };
            return ZipsController;
        }());
        Controllers.ZipsController = ZipsController;
        AngularTablesDataManagerApp.AngularTablesDataManager.module.controller('ZipsController', ZipsController);
    })(Controllers = AngularTablesDataManagerApp.Controllers || (AngularTablesDataManagerApp.Controllers = {}));
})(AngularTablesDataManagerApp || (AngularTablesDataManagerApp = {}));

//# sourceMappingURL=ZipsController.js.map
