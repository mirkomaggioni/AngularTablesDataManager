/// <reference path="grid.ts" />
/// <reference path="../../scripts/typings/angularjs/angular-resource.d.ts" />

module AngularTablesDataManagerApp.Models {
    import models = AngularTablesDataManagerApp.Models;
    import ngr = ng.resource;

    export interface IEntity {
        Id: string;
    }

    export interface IService {
        getMetadata(columns: Array<string>): ng.IPromise<Array<models.MetadataProperty>>;
        getGridData(Columns: Array<models.MetadataProperty>): ng.IPromise<Array<models.Row>>;
        saveGridData(item: models.Row): ng.IPromise<models.Row>;
    } 
}



