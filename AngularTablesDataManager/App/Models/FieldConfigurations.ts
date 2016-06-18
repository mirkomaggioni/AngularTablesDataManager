
module AngularTablesDataManagerApp.Models {
    export interface IFieldConfiguration extends Models.IEntity {
        Entity: string;
        Field: string;
        Tipology: string;
        Values: string;
    }
}
