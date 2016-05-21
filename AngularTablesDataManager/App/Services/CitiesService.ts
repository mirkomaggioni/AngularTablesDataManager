/// <reference path="../app.ts" />
/// <reference path="../commons.ts" />
/// <reference path="../models/cities.ts" />
/// <reference path="../models/services.ts" />
/// <reference path="metadataservice.ts" />
/// <reference path="../../scripts/typings/angularjs/angular-resource.d.ts" />

module AngularTablesDataManagerApp.Services {

    const entityName: string = 'Cities';
    import ngr = ng.resource;
    import commons = AngularTablesDataManagerApp.Commons;
    import models = AngularTablesDataManagerApp.Models;
    import services = AngularTablesDataManagerApp.Services;

    export interface ICitiesResourceClass extends ngr.IResourceClass<ngr.IResource<models.ICity>> {
        create(order: models.ICity): ngr.IResource<models.ICity>;
    }

    export class CitiesService implements models.IService {
        private resource: ICitiesResourceClass;
        private $q: ng.IQService;
        private metadataService: services.MetadataService;

        constructor($resource: ngr.IResourceService, $q: ng.IQService, MetadataService: services.MetadataService) {
            this.$q = $q;
            this.metadataService = MetadataService;

            this.resource = <ICitiesResourceClass>$resource('/odata/' + entityName + '/:id', { id: '@Id' }, {
                get: { method: "GET" },
                create: { method: "POST" },
                save: { method: "PUT" },
                query: { method: "GET", isArray: false },
                delete: { method: "DELETE" }
            });
        }

        public create(order: models.ICity) {
            return this.resource.create(order);
        }

        public save(order: models.ICity) {
            if (order.Id == commons.Constants.GuidEmpty) {
                return this.resource.create(order);
            }
            else {
                return this.resource.save(order);
            }
        }

        public delete(order: models.ICity) {
            return this.resource.remove(order);
        }

        public getAll() {
            var datas: ngr.IResourceArray<ngr.IResource<models.ICity>> 
            var defer: ng.IDeferred<any> = this.$q.defer();

            this.resource.query().$promise.then((data: any) => {
                datas = data["value"];

                return defer.resolve(datas);
            }, (error) => {
                return defer.reject(datas);
            });

            return defer.promise;
        }

        public getMetadata(): ng.IPromise<Array<models.MetadataProperty>> {
            return this.metadataService.getMetadata(entityName);
        }

        static factory() {
            return (r: ngr.IResourceService, $q: ng.IQService, MetadataService: services.MetadataService) => new CitiesService(r, $q, MetadataService);
        }
    }

    AngularTablesDataManager.module.factory('CitiesService', ['$resource', '$q', 'MetadataService', CitiesService.factory()]);
}
