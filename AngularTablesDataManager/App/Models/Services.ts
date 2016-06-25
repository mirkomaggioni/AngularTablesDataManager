/// <reference path="grid.ts" />
/// <reference path="../../scripts/typings/angularjs/angular-resource.d.ts" />

module AngularTablesDataManagerApp.Models {
    import models = AngularTablesDataManagerApp.Models;
    import ngr = ng.resource;

    export interface IEntity {
        Id: string;
    }

    export class FieldItems {
        FieldName: string;
        FieldItems: Array<FieldItem>;

        constructor(fieldName: string) {
            this.FieldName = fieldName;
            this.FieldItems = new Array<FieldItem>();
        }
    }

    export class FieldItem {
        Id: string;
        Value: string;

        constructor(Id: string, Value: string) {
            this.Id = Id;
            this.Value = Value;
        }
    }
}



