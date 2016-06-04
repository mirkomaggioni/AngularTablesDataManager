/// <reference path="../app.ts" />
/// <reference path="../commons.ts" />
/// <reference path="../models/cities.ts" />
/// <reference path="../models/services.ts" />
/// <reference path="metadataservice.ts" />
/// <reference path="../../scripts/typings/angularjs/angular-resource.d.ts" />

module AngularTablesDataManagerApp.Services {
    import ngr = ng.resource;
    import commons = AngularTablesDataManagerApp.Commons;
    import models = AngularTablesDataManagerApp.Models;
    import services = AngularTablesDataManagerApp.Services;

    export interface ICitiesResourceClass extends ngr.IResourceClass<ngr.IResource<models.ICity>> {
        create(city: models.ICity): ngr.IResource<models.ICity>;
    }

    export class CitiesService implements models.IService {
        private entitySet: string = 'Cities';
        private entityName: string = 'City';
        private resource: ICitiesResourceClass;
        private $q: ng.IQService;
        private metadataService: services.MetadataService;

        constructor($resource: ngr.IResourceService, $q: ng.IQService, MetadataService: services.MetadataService) {
            this.$q = $q;
            this.metadataService = MetadataService;

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

        public getAll() {
            var datas: ngr.IResourceArray<ngr.IResource<models.ICity>>;
            var defer: ng.IDeferred<any> = this.$q.defer();

            this.resource.query().$promise.then((data: any) => {
                datas = data["value"];

                return defer.resolve(datas);
            }, (error) => {
                return defer.reject(error);
            });

            return defer.promise;
        }

        public getMetadata(columns: Array<string>): ng.IPromise<Array<models.MetadataProperty>> {
            return this.metadataService.getMetadata(this.entitySet, columns);
        }

        public getGridData(Columns: Array<models.MetadataProperty>): ng.IPromise<Array<models.Row>> {
            var gridData: Array<models.Row> = new Array<models.Row>();
            var rowData: Array<models.RowProperty>;
            var defer: ng.IDeferred<any> = this.$q.defer();

            this.getAll().then((data) => {
                for (var i = 0; i < data.length; i++) {
                    var city: models.ICity = data[i];
                    rowData = new Array<models.RowProperty>();

                    for (var a = 0; a < Columns.length; a++) {
                        rowData.push(new models.RowProperty(Columns[a].Name, (<any>city)[Columns[a].Name], Columns[a].Nullable));
                    }

                    gridData.push(new models.Row(city, this.entityName, rowData));
                }

                return defer.resolve(gridData);
            }, (error) => {
                return defer.reject(error);
            });

            return defer.promise;
        }

        public createGridData(Columns: Array<models.MetadataProperty>) {
            var entity: models.ICity = { Id: commons.Constants.GuidEmpty, Name: '' };
            var datas: Array<models.RowProperty> = new Array<models.RowProperty>();
            var item: models.Row = new models.Row(entity, 'City', datas);

            for (var a = 0; a < Columns.length; a++) {
                datas.push(new models.RowProperty(Columns[a].Name, '', Columns[a].Nullable));
            }

            return item;
        }

        public saveGridData(item: models.Row) {
            var defer: ng.IDeferred<any> = this.$q.defer();

            for (var i = 0; i < item.Properties.length; i++) {
                (<any>item.Entity)[item.Properties[i].Name] = item.Properties[i].Value;
            }

            this.save(<models.ICity>item.Entity).$promise.then((data: any) => {
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
