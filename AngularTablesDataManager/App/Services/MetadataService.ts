/// <reference path="../app.ts" />
/// <reference path="../models/grid.ts" />

module AngularTablesDataManagerApp.Services {

    import models = AngularTablesDataManagerApp.Models;

    export class MetadataService {
        private $http: ng.IHttpService;
        private $q: ng.IQService;
        private $filter: ng.IFilterService;

        constructor($http: ng.IHttpService, $q: ng.IQService, $filter: ng.IFilterService) {
            this.$http = $http;
            this.$q = $q;
            this.$filter = $filter;
        }

        public getMetadata(entityName: string, columns: Array<models.Column>): ng.IPromise<Array<models.MetadataProperty>> {
            var defer: ng.IDeferred<any> = this.$q.defer();

            var req = {
                method: 'GET',
                url: '/odata/$metadata'
            };

            var vm = this;
            this.$http(req).then(function (result) {
                var data: string = result.data.toString();
                var xmlDoc: XMLDocument = $.parseXML(data);
                var xml: JQuery = $(xmlDoc);
                var properties: Array<models.MetadataProperty> = new Array<models.MetadataProperty>();

                xml.find('EntityType[Name="'+ entityName +'"]').find('Property').each(function () {
                    if (vm.$filter('filter')(columns, { 'Name': $(this).attr('Name') }, true).length > 0) {
                        var column: models.Column = vm.$filter('filter')(columns, { 'Name': $(this).attr('Name') }, true)[0];

                        var metadataProperty: models.MetadataProperty = new models.MetadataProperty(
                            $(this).attr('Name'),
                            $(this).attr('Type'),
                            ($(this).attr('Nullable') != null) && ($(this).attr('Nullable').toLowerCase() == 'true'),
                            column.ShowedInGrid,
                            column.ShowedInDetail);
                        properties.push(metadataProperty);
                    }                
                });

                return defer.resolve(properties);
            });

            return defer.promise;
        }

        static factory() {
            return ($http: ng.IHttpService, $q: ng.IQService, $filter: ng.IFilterService) => new MetadataService($http, $q, $filter);
        }
    }

    AngularTablesDataManager.module.factory('MetadataService', ['$http', '$q', '$filter', MetadataService.factory()]);
}