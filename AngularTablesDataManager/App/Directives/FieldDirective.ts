/// <reference path="../models/grid.ts" />
/// <reference path="../services/entities/fieldconfigurationsservice.ts" />

module AngularTablesDataManagerApp.Directives {
    import models = AngularTablesDataManagerApp.Models;
    import services = AngularTablesDataManagerApp.Services;

    interface IFieldDirectiveScope extends ng.IScope {
        entityName: string;
        contentUrl: string;
        tipology: models.MetadataProperty;
        property: models.RowProperty;
        values: Array<string>;
    }

    export class FieldDirective implements ng.IDirective {
        fieldConfigurationsService: services.FieldConfigurationsService;
        public restrict = 'E';
        public scope = {
            entityName: '=',
            tipology: '=',
            property: '='
        };
        public template = '<ng-include src="contentUrl" />';
        public link = (scope: IFieldDirectiveScope, element: JQuery, attrs: IArguments) => {
            this.fieldConfigurationsService.getFieldConfigurationTipology(scope.entityName, scope.tipology.Name).then((data: string) => {
                var tipology: string = scope.tipology.Type;
                if (data != "") {
                    tipology = data;
                    this.fieldConfigurationsService.getFieldValues(scope.entityName, scope.tipology.Name).then((data: Array<string>) => {
                        scope.values = data;
                        this.openView(scope, tipology);
                    });
                }
                else {
                    this.openView(scope, tipology);
                }
            });
        }

        public constructor(fieldConfigurationService: services.FieldConfigurationsService) {
            this.fieldConfigurationsService = fieldConfigurationService;
        }

        private openView(scope: IFieldDirectiveScope, tipology: string) {
            if (tipology.toLowerCase().indexOf('int') != -1) {
                scope.contentUrl = 'app/directives/InputNumber.html';
            }
            else if (tipology.toLowerCase().indexOf('radio') != -1) {
                scope.contentUrl = 'app/directives/InputRadio.html'
            }
            else if (tipology.toLowerCase().indexOf('select') != -1) {
                scope.contentUrl = 'app/directives/InputSelect.html';
            }
            else {
                scope.contentUrl = 'app/directives/InputText.html';
            }
        }
    }

    AngularTablesDataManager.module.directive('field', ['FieldConfigurationsService', (fieldConfigurationService: services.FieldConfigurationsService) => new Directives.FieldDirective(fieldConfigurationService)]);
}