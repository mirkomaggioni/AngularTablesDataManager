/// <reference path="../../scripts/typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
/// <reference path="../../scripts/typings/angularjs-toaster/angularjs-toaster.d.ts" />
/// <reference path="../../scripts/typings/angularjs/angular-resource.d.ts" />
/// <reference path="../models/cities.ts" />
/// <reference path="../models/metadataproperties.ts" />
/// <reference path="../services/citiesservice.ts" />
var AngularTablesDataManagerApp;
(function (AngularTablesDataManagerApp) {
    var Controllers;
    (function (Controllers) {
        var commons = AngularTablesDataManagerApp.Commons;
        var CitiesController = (function () {
            function CitiesController(toaster, CitiesService) {
                this.citiesService = CitiesService;
                this.constant = commons.Constants;
                this.toaster = toaster;
                this.title = 'Cities';
                this.Load();
            }
            CitiesController.prototype.Load = function () {
                var _this = this;
                this.citiesService.getMetadata().then(function (data) {
                    _this.metadataProperties = data;
                }, function (error) {
                    _this.toaster.error('Error loading cities medatad', error.data.message);
                });
                this.citiesService.getAll().then(function (data) {
                    _this.cities = data;
                    _this.toaster.success('Cities loaded successfully.');
                    return;
                }, function (error) {
                    _this.toaster.error('Error loading cities', error.message);
                });
            };
            return CitiesController;
        }());
        Controllers.CitiesController = CitiesController;
        AngularTablesDataManagerApp.AngularTablesDataManager.module.controller('CitiesController', CitiesController);
    })(Controllers = AngularTablesDataManagerApp.Controllers || (AngularTablesDataManagerApp.Controllers = {}));
})(AngularTablesDataManagerApp || (AngularTablesDataManagerApp = {}));

//# sourceMappingURL=CitiesController.js.map
