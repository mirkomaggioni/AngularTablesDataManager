
module AngularTablesDataManagerApp.Models {
    import models = AngularTablesDataManagerApp.Models;

    export class Grid {
        Title: string;
        Columns: Array<MetadataProperty>;
        Rows: Array<Row>;
    }

    export class Column {
        Name: string;
        ShowedInGrid: boolean;
        ShowedInDetail: boolean;

        constructor(name: string, showedInGrid: boolean, ShowedInDetail: boolean) {
            this.Name = name;
            this.ShowedInGrid = showedInGrid;
            this.ShowedInDetail = ShowedInDetail;
        }
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

    export class MetadataProperty extends Column {
        Type: string;
        Nullable: boolean;

        constructor(name: string, type: string, nullable: boolean, showedInGrid: boolean, ShowedInDetail: boolean) {
            super(name, showedInGrid, ShowedInDetail);
            this.Type = type;
            this.Nullable = nullable;
        }
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
