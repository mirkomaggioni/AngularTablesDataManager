/// <reference path="../../scripts/typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
/// <reference path="../../scripts/typings/angularjs-toaster/angularjs-toaster.d.ts" />
/// <reference path="../../scripts/typings/angularjs/angular-resource.d.ts" />
/// <reference path="../models/grid.ts" />
/// <reference path="../services/citiesservice.ts" />

module AngularTablesDataManagerApp.Controllers {
    import ngr = ng.resource;
    import commons = AngularTablesDataManagerApp.Commons;
    import models = AngularTablesDataManagerApp.Models;
    import services = AngularTablesDataManagerApp.Services;

    export class CitiesController {
        grid: models.Grid;
        rowModel: models.Row;
        toaster: ngtoaster.IToasterService;

        private citiesService: services.CitiesService;
        private constant: commons.Constants;

        constructor(toaster: ngtoaster.IToasterService, CitiesService: services.CitiesService) {
            this.citiesService = CitiesService;
            this.constant = commons.Constants;
            this.toaster = toaster;

            this.grid = new models.Grid();
            this.grid.Title = 'Cities';
            this.Load();
        }

        private Load() {
            var columns: Array<string> = new Array<string>('Name');
            var vm = this;

            this.citiesService.getMetadata(columns).then((data) => {
                vm.grid.Columns = data;
                vm.rowModel = this.citiesService.createGridData(data);

                this.citiesService.getGridData(data).then((data) => {
                    vm.grid.Rows = data;
                    vm.toaster.success('Cities loaded successfully.');
                    return;
                }, (error) => {
                    vm.toaster.error('Error loading cities', error.message);
                });

            }, (error) => {
                vm.toaster.error('Error loading cities metadata', error.data.message);
            });
        }

        public Save(item: models.Row) {
            var vm = this;
            var isNew: boolean = false;

            if (item.Entity.Id == commons.Constants.GuidEmpty)
                isNew = true;

            this.citiesService.saveGridData(item).then((data: models.Row) => {
                if (isNew)
                    vm.grid.Rows.push(data);

                this.toaster.success("Order saved successfully.");
            }, (error: any) => {
                this.toaster.error("Error saving order", error.data.message);
            });
        }

        public Delete(item: models.Row) {

            var vm = this;
            this.citiesService.deleteGridData(item).then((data: any) => {
                var index = vm.grid.Rows.indexOf(item);
                vm.grid.Rows.splice(index, 1);

                this.toaster.success("Order deleted successfully.");
            }, (error: any) => {
                this.toaster.error("Error deleting order", error.data.message);
            });
        }
    }

    AngularTablesDataManager.module.controller('CitiesController', CitiesController);
}