/// <reference path="../models/grid.ts" />

module AngularTablesDataManagerApp.Directives {
    import models = AngularTablesDataManagerApp.Models;

    interface IFieldDirectiveScope extends ng.IScope {
        tipology: models.MetadataProperty;
    }

    export class FieldDirective implements ng.IDirective {
        public restrict = 'A';
        public scope = {
            tipology: '=',
        };
        public link = (scope: IFieldDirectiveScope, element: JQuery, attrs: IArguments) => {
            if (scope.tipology.Type == 'Edm.String') {
                element.attr('type', 'text');
            }
            else if (scope.tipology.Type.toLowerCase().indexOf('int') != -1) {
                element.attr('type', 'number');
            }
        }
    }

    AngularTablesDataManager.module.directive('field', () => new Directives.FieldDirective);
}