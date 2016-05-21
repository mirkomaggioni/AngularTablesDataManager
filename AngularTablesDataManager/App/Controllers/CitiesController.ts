/// <reference path="../../scripts/typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
/// <reference path="../../scripts/typings/angularjs-toaster/angularjs-toaster.d.ts" />
/// <reference path="../../scripts/typings/angularjs/angular-resource.d.ts" />
/// <reference path="../models/cities.ts" />
/// <reference path="../models/metadataproperties.ts" />
/// <reference path="../services/citiesservice.ts" />

module AngularTablesDataManagerApp.Controllers {
    import ngr = ng.resource;
    import commons = AngularTablesDataManagerApp.Commons;
    import models = AngularTablesDataManagerApp.Models;
    import services = AngularTablesDataManagerApp.Services;

    export class CitiesController {
        cities: ngr.IResourceArray<ngr.IResource<models.ICity>>;
        order: models.ICity;
        title: string;
        toaster: ngtoaster.IToasterService;

        private citiesService: services.CitiesService;
        private constant: commons.Constants;
        private metadataProperties: Array<models.MetadataProperty>;

        constructor(toaster: ngtoaster.IToasterService, CitiesService: services.CitiesService) {
            this.citiesService = CitiesService;
            this.constant = commons.Constants;

            this.toaster = toaster;
            this.title = 'Cities';

            this.Load();
        }

        private Load() {
            this.citiesService.getMetadata().then((data) => {
                this.metadataProperties = data;
            }, (error) => {
                this.toaster.error('Error loading cities medatad', error.data.message);
            });

            this.citiesService.getAll().then((data) => {
                this.cities = data;
                this.toaster.success('Cities loaded successfully.');
                return;
            }, (error) => {
                this.toaster.error('Error loading cities', error.message);
            });
        }
    }

    AngularTablesDataManager.module.controller('CitiesController', CitiesController);
}