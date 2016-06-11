/// <reference path="../../scripts/typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
/// <reference path="../../scripts/typings/angularjs-toaster/angularjs-toaster.d.ts" />
/// <reference path="../../scripts/typings/angularjs/angular-resource.d.ts" />
/// <reference path="../models/grid.ts" />
/// <reference path="../services/entities/zipsservice.ts" />

module AngularTablesDataManagerApp.Controllers {
    import ngr = ng.resource;
    import commons = AngularTablesDataManagerApp.Commons;
    import models = AngularTablesDataManagerApp.Models;
    import services = AngularTablesDataManagerApp.Services;

    export class ZipsController {
        grid: models.Grid;
        rowModel: models.Row;
        toaster: ngtoaster.IToasterService;

        private zipsService: services.ZipsService;
        private constant: commons.Constants;

        constructor(toaster: ngtoaster.IToasterService, ZipsService: services.ZipsService) {
            this.zipsService = ZipsService;
            this.constant = commons.Constants;
            this.toaster = toaster;

            this.grid = new models.Grid();
            this.grid.Title = 'Zips';
            this.Load();
        }

        private Load() {
            var columns: Array<string> = new Array<string>('Code');
            var vm = this;

            this.zipsService.getMetadata(columns).then((data) => {
                vm.grid.Columns = data;
                vm.rowModel = this.zipsService.createGridData(data);

                this.zipsService.getGridData(data).then((data) => {
                    vm.grid.Rows = data;
                    vm.toaster.success('Zips loaded successfully.');
                    return;
                }, (error) => {
                    vm.toaster.error('Error loading zips', error.message);
                });

            }, (error) => {
                vm.toaster.error('Error loading zips metadata', error.data.message);
            });
        }

        public Save(item: models.Row) {
            var vm = this;
            var isNew: boolean = false;

            if (item.Entity.Id == commons.Constants.GuidEmpty)
                isNew = true;

            this.zipsService.saveGridData(item).then((data: models.Row) => {
                if (isNew)
                    vm.grid.Rows.push(data);

                this.toaster.success("Zip saved successfully.");
            }, (error: any) => {
                this.toaster.error("Error saving zip", error.data.message);
            });
        }

        public Delete(item: models.Row) {
            var vm = this;
            this.zipsService.deleteGridData(item).then((data: any) => {
                var index = vm.grid.Rows.indexOf(item);
                vm.grid.Rows.splice(index, 1);

                this.toaster.success("Zip deleted successfully.");
            }, (error: any) => {
                this.toaster.error("Error deleting zip", error.data.message);
            });
        }
    }

    AngularTablesDataManager.module.controller('ZipsController', ZipsController);
}