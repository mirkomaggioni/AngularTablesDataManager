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

        public getFieldConfigurationTipology(entityName: string, fieldName: string): ng.IPromise<string> {
            var defer: ng.IDeferred<string> = this.$q.defer();

            this.getFieldConfiguration(entityName, fieldName).then((data: models.IFieldConfiguration) => {
                if (data != null) {
                    defer.resolve(data.Tipology);
                }
                else {
                    defer.resolve('');
                }
            }, (error) => {
                defer.reject(error);
            });

            return defer.promise;
        }

        public getFieldValues(entityName: string, fieldName: string): ng.IPromise<Array<string>> {
            var defer: ng.IDeferred<Array<string>> = this.$q.defer();
            var vm = this;

            this.getFieldConfiguration(entityName, fieldName).then((data: models.IFieldConfiguration) => {
                if (data != null && data.Values != null && data.Values != "") {
                    defer.resolve(data.Values.split(";"));
                }
                else {
                    defer.resolve(new Array<string>());
                }

            }, (error) => {
                defer.reject(error);
            });

            if (this.fieldConfigurations) {

            }
            else {

            }

            return defer.promise;
        }

        private getFieldConfiguration(entityName: string, fieldName: string): ng.IPromise<models.IFieldConfiguration> {
            var defer: ng.IDeferred<models.IFieldConfiguration> = this.$q.defer();
            var vm = this;

            if (this.fieldConfigurations == null) {
                vm.resource.query().$promise.then((data: any) => {
                    vm.fieldConfigurations = data["value"];
                    defer.resolve(vm.getField(entityName, fieldName));
                }, (error) => {
                    defer.reject(error);
                });
            }
            else {
                defer.resolve(vm.getField(entityName, fieldName));
            }

            return defer.promise;
        }

        private getField(entityName: string, fieldName: string): models.IFieldConfiguration {
            var fieldConfigurations: Array<models.IFieldConfiguration> = this.$filter('filter')(this.fieldConfigurations, { 'Entity': entityName, 'Field': fieldName });
            if (fieldConfigurations.length > 0) {
                return fieldConfigurations[0];
            }
            else {
                return null;
            }
        }

        static factory() {
            return (r: ngr.IResourceService, $q: ng.IQService, $filter: ng.IFilterService, MetadataService: services.MetadataService) => new FieldConfigurationsService(r, $q, $filter, MetadataService);
        }
    }

    AngularTablesDataManager.module.factory('FieldConfigurationsService', ['$resource', '$q', '$filter', 'MetadataService', FieldConfigurationsService.factory()]);
}
