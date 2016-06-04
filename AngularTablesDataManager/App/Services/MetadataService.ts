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

        public getMetadata(entityName: string, columns: Array<string>): ng.IPromise<Array<models.MetadataProperty>> {
            var defer: ng.IDeferred<any> = this.$q.defer();

            var req = {
                method: 'GET',
                url: '/odata/$metadata#' + entityName
            };

            var vm = this;
            this.$http(req).then(function (result) {
                var data: string = result.data.toString();
                var xmlDoc: XMLDocument = $.parseXML(data);
                var xml: JQuery = $(xmlDoc);
                var properties: Array<models.MetadataProperty> = new Array<models.MetadataProperty>();

                xml.find('EntityType').find('Property').each(function () {
                    if (vm.$filter('filter')(columns, { $: $(this).attr('Name') }).length > 0) {
                        var metadataProperty: models.MetadataProperty = new models.MetadataProperty();
                        metadataProperty.Name = $(this).attr('Name');
                        metadataProperty.Type = $(this).attr('Type');
                        metadataProperty.Nullable = ($(this).attr('Nullable') != null) && ($(this).attr('Nullable').toLowerCase() == 'true');

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