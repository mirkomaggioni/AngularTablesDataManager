/// <reference path="../models/grid.ts" />
/// <reference path="../services/entities/fieldconfigurationsservice.ts" />

module AngularTablesDataManagerApp.Directives {
    import models = AngularTablesDataManagerApp.Models;
    import services = AngularTablesDataManagerApp.Services;

    interface IFieldDirectiveScope extends ng.IScope {
        entityName: string;
        tipology: models.MetadataProperty;
    }

    export class FieldDirective implements ng.IDirective {
        fieldConfigurationsService: services.FieldConfigurationsService;
        public restrict = 'A';
        public scope = {
            entityName: '=',
            tipology: '='
        };
        public link = (scope: IFieldDirectiveScope, element: JQuery, attrs: IArguments) => {

            this.fieldConfigurationsService.getFieldConfiguration(scope.entityName, scope.tipology.Name).then((data) => {
                var tipology: string = data;
                if (tipology == '') {
                    tipology = scope.tipology.Type;
                }

                if (tipology == 'Edm.String') {
                    element.attr('type', 'text');
                }
                else if (scope.tipology.Type.toLowerCase().indexOf('int') != -1) {
                    element.attr('type', 'number');
                }
            });
        }

        public constructor(fieldConfigurationService: services.FieldConfigurationsService) {
            this.fieldConfigurationsService = fieldConfigurationService;
        }
    }

    AngularTablesDataManager.module.directive('field', ['FieldConfigurationsService', (fieldConfigurationService: services.FieldConfigurationsService) => new Directives.FieldDirective(fieldConfigurationService)]);
}