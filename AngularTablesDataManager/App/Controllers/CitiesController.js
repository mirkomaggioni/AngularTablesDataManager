/// <reference path="../../scripts/typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
/// <reference path="../../scripts/typings/angularjs-toaster/angularjs-toaster.d.ts" />
/// <reference path="../../scripts/typings/angularjs/angular-resource.d.ts" />
/// <reference path="../models/grid.ts" />
/// <reference path="../services/entities/citiesservice.ts" />
var AngularTablesDataManagerApp;
(function (AngularTablesDataManagerApp) {
    var Controllers;
    (function (Controllers) {
        var commons = AngularTablesDataManagerApp.Commons;
        var models = AngularTablesDataManagerApp.Models;
        var CitiesController = (function () {
            function CitiesController(toaster, CitiesService) {
                this.citiesService = CitiesService;
                this.constant = commons.Constants;
                this.toaster = toaster;
                this.grid = new models.Grid();
                this.grid.Title = 'Cities';
                this.Load();
            }
            CitiesController.prototype.Load = function () {
                var _this = this;
                var columns = new Array('Name');
                var vm = this;
                this.citiesService.getMetadata(columns).then(function (data) {
                    vm.grid.Columns = data;
                    vm.rowModel = _this.citiesService.createGridData(data);
                    _this.citiesService.getGridData(data).then(function (data) {
                        vm.grid.Rows = data;
                        vm.toaster.success('Cities loaded successfully.');
                        return;
                    }, function (error) {
                        vm.toaster.error('Error loading cities', error.message);
                    });
                }, function (error) {
                    vm.toaster.error('Error loading cities metadata', error.data.message);
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
                    _this.toaster.success("Order saved successfully.");
                }, function (error) {
                    _this.toaster.error("Error saving order", error.data.message);
                });
            };
            CitiesController.prototype.Delete = function (item) {
                var _this = this;
                var vm = this;
                this.citiesService.deleteGridData(item).then(function (data) {
                    var index = vm.grid.Rows.indexOf(item);
                    vm.grid.Rows.splice(index, 1);
                    _this.toaster.success("Order deleted successfully.");
                }, function (error) {
                    _this.toaster.error("Error deleting order", error.data.message);
                });
            };
            return CitiesController;
        }());
        Controllers.CitiesController = CitiesController;
        AngularTablesDataManagerApp.AngularTablesDataManager.module.controller('CitiesController', CitiesController);
    })(Controllers = AngularTablesDataManagerApp.Controllers || (AngularTablesDataManagerApp.Controllers = {}));
})(AngularTablesDataManagerApp || (AngularTablesDataManagerApp = {}));

//# sourceMappingURL=CitiesController.js.map
