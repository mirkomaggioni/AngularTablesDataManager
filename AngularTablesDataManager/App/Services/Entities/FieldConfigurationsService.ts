/// <reference path="../../app.ts" />
/// <reference path="../../commons.ts" />
/// <reference path="../../models/fieldconfigurations.ts" />
/// <reference path="../../models/services.ts" />
/// <reference path="../../../scripts/typings/angularjs/angular-resource.d.ts" />

module AngularTablesDataManagerApp.Services {
    import ngr = ng.resource;
    import commons = AngularTablesDataManagerApp.Commons;
    import models = AngularTablesDataManagerApp.Models;
    import services = AngularTablesDataManagerApp.Services;

    export interface IFieldConfigurationsResourceClass extends ngr.IResourceClass<ngr.IResource<models.IFieldConfiguration>> {
        create(zip: models.IFieldConfiguration): ngr.IResource<models.IFieldConfiguration>;
    }

    export class FieldConfigurationsService {
        private resource: IFieldConfigurationsResourceClass;
        private $q: ng.IQService;
        private $filter: ng.IFilterService;
        private metadataService: services.MetadataService;
        private entitySet: string = 'FieldConfigurations';
        private fieldConfigurations: Array<models.IFieldConfiguration>;

        constructor($resource: ngr.IResourceService, $q: ng.IQService, $filter: ng.IFilterService, metadataService: services.MetadataService) {
            this.$q = $q;
            this.$filter = $filter;
            this.metadataService = metadataService;

            this.resource = <IFieldConfigurationsResourceClass>$resource('/odata/' + this.entitySet + "(guid':key')", { key: '@Id' }, {
                get: { method: 'GET' },
                create: { method: 'POST', isArray: false, url: '/odata/' + this.entitySet },
                save: { method: 'PUT' },
                query: { method: 'GET', isArray: false, url: '/odata/' + this.entitySet },
                delete: { method: 'DELETE' }
            });
        }

        public create(fieldConfiguration: models.IFieldConfiguration) {
            return this.resource.create(fieldConfiguration);
        }

        public save(fieldConfiguration: models.IFieldConfiguration) {
            if (fieldConfiguration.Id == commons.Constants.GuidEmpty) {
                return this.resource.create(fieldConfiguration);
            }
            else {
                return this.resource.save(fieldConfiguration);
            }
        }

        public delete(fieldConfiguration: models.IFieldConfiguration) {
            return this.resource.delete({ key: fieldConfiguration.Id });
        }

        public getFieldConfiguration(entityName: string, fieldName: string): ng.IPromise<string> {
            var defer: ng.IDeferred<string> = this.$q.defer();
            var vm = this;

            if (this.fieldConfigurations == null) {
                vm.resource.query().$promise.then((data: any) => {
                    vm.fieldConfigurations = data["value"];
                    defer.resolve(vm.getFieldTipology(entityName, fieldName));
                }, (error) => {
                    defer.reject(error);
                });
            }
            else {
                defer.resolve(vm.getFieldTipology(entityName, fieldName));
            }

            return defer.promise;
        }

        private getFieldTipology(entityName: string, fieldName: string): string {
            var fieldConfigurations: Array<models.IFieldConfiguration> = this.$filter('filter')(this.fieldConfigurations, { 'Entity': entityName, 'Field': fieldName });
            if (fieldConfigurations.length > 0) {
                return fieldConfigurations[0].Tipology;
            }
            else {
                return '';
            }
        }

        static factory() {
            return (r: ngr.IResourceService, $q: ng.IQService, $filter: ng.IFilterService, MetadataService: services.MetadataService) => new FieldConfigurationsService(r, $q, $filter, MetadataService);
        }
    }

    AngularTablesDataManager.module.factory('FieldConfigurationsService', ['$resource', '$q', '$filter', 'MetadataService', FieldConfigurationsService.factory()]);
}
