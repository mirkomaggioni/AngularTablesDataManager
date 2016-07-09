/// <reference path="../../scripts/typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
/// <reference path="../../scripts/typings/angularjs-toaster/angularjs-toaster.d.ts" />
/// <reference path="../../scripts/typings/angularjs/angular-resource.d.ts" />
/// <reference path="../models/grid.ts" />
/// <reference path="../services/entities/citiesservice.ts" />
/// <reference path="../services/entities/zipsservice.ts" />
var AngularTablesDataManagerApp;
(function (AngularTablesDataManagerApp) {
    var Controllers;
    (function (Controllers) {
        var commons = AngularTablesDataManagerApp.Commons;
        var models = AngularTablesDataManagerApp.Models;
        var CitiesController = (function () {
            function CitiesController(toaster, CitiesService, ZipsService) {
                this.citiesService = CitiesService;
                this.zipsService = ZipsService;
                this.constant = commons.Constants;
                this.toaster = toaster;
                this.entityName = this.citiesService.entityName;
                this.grid = new models.Grid();
                this.fieldItems = new Array();
                this.grid.Title = 'Cities';
                this.Load();
            }
            CitiesController.prototype.Load = function () {
                var _this = this;
                var columns = new Array();
                var column = new models.Column('Name', true, true);
                columns.push(column);
                column = new models.Column('IdZip', false, true);
                columns.push(column);
                var vm = this;
                this.zipsService.getAll().then(function (data) {
                    var zips = new models.FieldItems('IdZip');
                    for (var i = 0; i < data.length; i++) {
                        zips.FieldItems.push(new models.FieldItem(data[i].Id, data[i].Code.toString()));
                    }
                    vm.fieldItems.push(zips);
                    vm.citiesService.getMetadata(columns).then(function (data) {
                        vm.grid.Columns = data;
                        vm.rowModel = _this.citiesService.createGridData(data);
                        vm.citiesService.getGridData(data).then(function (data) {
                            vm.grid.Rows = data;
                            vm.toaster.success('Cities loaded successfully.');
                            return;
                        }, function (error) {
                            vm.toaster.error('Error loading cities', error.message);
                        });
                    }, function (error) {
                        vm.toaster.error('Error loading cities metadata', error.data.message);
                    });
                }, function (error) {
                    vm.toaster.error('Error loading zips metadata', error.data.message);
                });
            };
            CitiesController.prototype.Save = function (item) {
                var _this = this;
                var vm = this;
                var isNew = false;
                if (item.Entity.Id == commons.Constants.GuidEmpty)
                    isNew = true;
                this.citiesService.saveGridData(item).then(function (data) {
                    if (isNew)
                        vm.grid.Rows.push(data);
                    _this.toaster.success("City saved successfully.");
                }, function (error) {
                    _this.toaster.error("Error saving city", error.data.message);
                });
            };
            CitiesController.prototype.Delete = function (item) {
                var _this = this;
                var vm = this;
                this.citiesService.deleteGridData(item).then(function (data) {
                    var index = vm.grid.Rows.indexOf(item);
                    vm.grid.Rows.splice(index, 1);
                    _this.toaster.success("City deleted successfully.");
                }, function (error) {
                    _this.toaster.error("Error deleting city", error.data.message);
                });
            };
            return CitiesController;
        }());
        Controllers.CitiesController = CitiesController;
        AngularTablesDataManagerApp.AngularTablesDataManager.module.controller('CitiesController', CitiesController);
    })(Controllers = AngularTablesDataManagerApp.Controllers || (AngularTablesDataManagerApp.Controllers = {}));
})(AngularTablesDataManagerApp || (AngularTablesDataManagerApp = {}));

//# sourceMappingURL=CitiesController.js.map
