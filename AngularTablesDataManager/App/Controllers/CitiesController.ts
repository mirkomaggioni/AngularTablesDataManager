/// <reference path="../../scripts/typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
/// <reference path="../../scripts/typings/angularjs-toaster/angularjs-toaster.d.ts" />
/// <reference path="../../scripts/typings/angularjs/angular-resource.d.ts" />
/// <reference path="../models/grid.ts" />
/// <reference path="../services/entities/citiesservice.ts" />

module AngularTablesDataManagerApp.Controllers {
    import ngr = ng.resource;
    import commons = AngularTablesDataManagerApp.Commons;
    import models = AngularTablesDataManagerApp.Models;
    import services = AngularTablesDataManagerApp.Services;

    export class CitiesController {
        entityName: string;
        grid: models.Grid;
        fieldItems: Array<models.FieldItems>;
        rowModel: models.Row;
        toaster: ngtoaster.IToasterService;

        private citiesService: services.CitiesService;
        private zipsService: services.ZipsService;
        private constant: commons.Constants;

        constructor(toaster: ngtoaster.IToasterService, CitiesService: services.CitiesService, ZipsService: services.ZipsService) {
            this.citiesService = CitiesService;
            this.zipsService = ZipsService;
            this.constant = commons.Constants;
            this.toaster = toaster;
            this.entityName = this.citiesService.entityName;

            this.grid = new models.Grid();
            this.fieldItems = new Array<models.FieldItems>();
            this.grid.Title = 'Cities';
            this.Load();
        }

        private Load() {
            var columns: Array<models.Column> = new Array<models.Column>();
            var column: models.Column = new models.Column('Name', true, true);
            columns.push(column);
            column = new models.Column('IdZip', false, true);
            columns.push(column);
            var vm = this;

            this.zipsService.getAll().then((data) => {
                var zips: models.FieldItems = new models.FieldItems('IdZip');

                for (var i = 0; i < data.length; i++) {
                    zips.FieldItems.push(new models.FieldItem(data[i].Id, data[i].Code.toString()));
                }

                vm.fieldItems.push(zips);

                vm.citiesService.getMetadata(columns).then((data) => {
                    vm.grid.Columns = data;
                    vm.rowModel = this.citiesService.createGridData(data);

                    vm.citiesService.getGridData(data).then((data) => {
                        vm.grid.Rows = data;
                        vm.toaster.success('Cities loaded successfully.');
                        return;
                    }, (error) => {
                        vm.toaster.error('Error loading cities', error.message);
                    });

                }, (error) => {
                    vm.toaster.error('Error loading cities metadata', error.data.message);
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

            this.citiesService.saveGridData(item).then((data: models.Row) => {
                if (isNew)
                    vm.grid.Rows.push(data);

                this.toaster.success("City saved successfully.");
            }, (error: any) => {
                this.toaster.error("Error saving city", error.data.message);
            });
        }

        public Delete(item: models.Row) {
            var vm = this;
            this.citiesService.deleteGridData(item).then((data: any) => {
                var index = vm.grid.Rows.indexOf(item);
                vm.grid.Rows.splice(index, 1);

                this.toaster.success("City deleted successfully.");
            }, (error: any) => {
                this.toaster.error("Error deleting city", error.data.message);
            });
        }
    }

    AngularTablesDataManager.module.controller('CitiesController', CitiesController);
}