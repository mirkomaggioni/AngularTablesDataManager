
module AngularTablesDataManagerApp.Models {
    import models = AngularTablesDataManagerApp.Models;

    export class Grid {
        Title: string;
        Columns: Array<MetadataProperty>;
        Rows: Array<Row>;
    }

    export class Row {
        Entity: models.IEntity;
        Name: string;
        Properties: Array<RowProperty>;

        constructor(entity: models.IEntity, name: string, datas: Array<RowProperty>) {
            this.Entity = entity;
            this.Name = name;
            this.Properties = datas;
        }
    }

    export class MetadataProperty {
        Name: string;
        Type: string;
        Nullable: boolean;
    }

    export class RowProperty {
        Name: string;
        Value: string;
        Nullable: boolean;

        constructor(name: string, value: string, nullable: boolean) {
            this.Name = name;
            this.Value = value;
            this.Nullable = nullable;
        }
    }
}
