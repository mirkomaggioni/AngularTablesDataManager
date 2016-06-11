/// <reference path="../../app.ts" />
/// <reference path="../../commons.ts" />
/// <reference path="../../models/cities.ts" />
/// <reference path="../../models/services.ts" />
/// <reference path="../gridservice.ts" />
/// <reference path="../../../scripts/typings/angularjs/angular-resource.d.ts" />

module AngularTablesDataManagerApp.Services {
    import ngr = ng.resource;
    import commons = AngularTablesDataManagerApp.Commons;
    import models = AngularTablesDataManagerApp.Models;
    import services = AngularTablesDataManagerApp.Services;

    export interface ICitiesResourceClass extends ngr.IResourceClass<ngr.IResource<models.ICity>> {
        create(city: models.ICity): ngr.IResource<models.ICity>;
    }

    export class CitiesService extends services.GridService {
        private resource: ICitiesResourceClass;
        private $q: ng.IQService;

        constructor($resource: ngr.IResourceService, $q: ng.IQService, metadataService: services.MetadataService) {
            super('Cities', 'City', metadataService);

            this.$q = $q;
            this.metadataService = metadataService;

            this.resource = <ICitiesResourceClass>$resource('/odata/' + this.entitySet + "(guid':key')", { key: '@Id' }, {
                get: { method: 'GET' },
                create: { method: 'POST', isArray: false, url: '/odata/' + this.entitySet  },
                save: { method: 'PUT' },
                query: { method: 'GET', isArray: false, url: '/odata/' + this.entitySet },
                delete: { method: 'DELETE' }
            });
        }

        public create(city: models.ICity) {
            return this.resource.create(city);
        }

        public save(city: models.ICity) {
            if (city.Id == commons.Constants.GuidEmpty) {
                return this.resource.create(city);
            }
            else {
                return this.resource.save(city);
            }
        }

        public delete(city: models.ICity) {
            return this.resource.delete({ key: city.Id });
        }

        public getGridData(Columns: Array<models.MetadataProperty>): ng.IPromise<Array<models.Row>> {
            var datas: Array<models.ICity>;
            var defer: ng.IDeferred<any> = this.$q.defer();

            this.resource.query().$promise.then((data: any) => {
                datas = data["value"];

                return defer.resolve(super.getData(Columns, <Array<models.IEntity>>datas));
            }, (error) => {
                return defer.reject(error);
            });

            return defer.promise;
        }

        public createGridData(Columns: Array<models.MetadataProperty>): models.Row {
            var entity: models.ICity = { Id: commons.Constants.GuidEmpty, Name: '' };

            return super.createData(Columns, entity);
        }

        public saveGridData(item: models.Row) {
            var defer: ng.IDeferred<any> = this.$q.defer();

            this.save(<models.ICity>super.saveData(item)).$promise.then((data: any) => {
                item.Entity = data;
                return defer.resolve(item);
            }, (error) => {
                return defer.reject(error);
            });

            return defer.promise;
        }

        public deleteGridData(item: models.Row) {
            var defer: ng.IDeferred<any> = this.$q.defer();

            this.delete(<models.ICity>item.Entity).$promise.then((data: any) => {
                return defer.resolve(item);
            }, (error) => {
                return defer.reject(error);
            });

            return defer.promise;
        }

        static factory() {
            return (r: ngr.IResourceService, $q: ng.IQService, MetadataService: services.MetadataService) => new CitiesService(r, $q, MetadataService);
        }
    }

    AngularTablesDataManager.module.factory('CitiesService', ['$resource', '$q', 'MetadataService', CitiesService.factory()]);
}
