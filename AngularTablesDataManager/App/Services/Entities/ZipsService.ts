/// <reference path="../../app.ts" />
/// <reference path="../../commons.ts" />
/// <reference path="../../models/zips.ts" />
/// <reference path="../../models/services.ts" />
/// <reference path="../gridservice.ts" />
/// <reference path="../../../scripts/typings/angularjs/angular-resource.d.ts" />

module AngularTablesDataManagerApp.Services {
    import ngr = ng.resource;
    import commons = AngularTablesDataManagerApp.Commons;
    import models = AngularTablesDataManagerApp.Models;
    import services = AngularTablesDataManagerApp.Services;

    export interface IZipsResourceClass extends ngr.IResourceClass<ngr.IResource<models.IZip>> {
        create(zip: models.IZip): ngr.IResource<models.IZip>;
    }

    export class ZipsService extends services.GridService {
        private resource: IZipsResourceClass;
        private $q: ng.IQService;

        constructor($resource: ngr.IResourceService, $q: ng.IQService, metadataService: services.MetadataService) {
            super('Zips', 'Zip', metadataService);

            this.$q = $q;
            this.metadataService = metadataService;

            this.resource = <IZipsResourceClass>$resource('/odata/' + this.entitySet + "(guid':key')", { key: '@Id' }, {
                get: { method: 'GET' },
                create: { method: 'POST', isArray: false, url: '/odata/' + this.entitySet },
                save: { method: 'PUT' },
                query: { method: 'GET', isArray: false, url: '/odata/' + this.entitySet },
                delete: { method: 'DELETE' }
            });
        }

        public create(zip: models.IZip) {
            return this.resource.create(zip);
        }

        public save(zip: models.IZip) {
            if (zip.Id == commons.Constants.GuidEmpty) {
                return this.resource.create(zip);
            }
            else {
                return this.resource.save(zip);
            }
        }

        public delete(zip: models.IZip) {
            return this.resource.delete({ key: zip.Id });
        }

        public getGridData(Columns: Array<models.MetadataProperty>): ng.IPromise<Array<models.Row>> {
            var datas: Array<models.IZip>;
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
            var entity: models.IZip = { Id: commons.Constants.GuidEmpty, Code: null };

            return super.createData(Columns, entity);
        }

        public saveGridData(item: models.Row) {
            var defer: ng.IDeferred<any> = this.$q.defer();

            this.save(<models.IZip>super.saveData(item)).$promise.then((data: any) => {
                item.Entity = data;
                return defer.resolve(item);
            }, (error) => {
                return defer.reject(error);
            });

            return defer.promise;
        }

        public deleteGridData(item: models.Row) {
            var defer: ng.IDeferred<any> = this.$q.defer();

            this.delete(<models.IZip>item.Entity).$promise.then((data: any) => {
                return defer.resolve(item);
            }, (error) => {
                return defer.reject(error);
            });

            return defer.promise;
        }

        static factory() {
            return (r: ngr.IResourceService, $q: ng.IQService, MetadataService: services.MetadataService) => new ZipsService(r, $q, MetadataService);
        }
    }

    AngularTablesDataManager.module.factory('ZipsService', ['$resource', '$q', 'MetadataService', ZipsService.factory()]);
}
