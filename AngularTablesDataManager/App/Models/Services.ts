/// <reference path="metadataproperties.ts" />

module AngularTablesDataManagerApp.Models {
    import models = AngularTablesDataManagerApp.Models;

    export interface IService {
        getMetadata(): ng.IPromise<Array<models.MetadataProperty>>;
    }
}
