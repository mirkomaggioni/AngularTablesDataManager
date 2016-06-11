/// <reference path="../models/grid.ts" />
/// <reference path="metadataservice.ts" />
/// <reference path="../../scripts/typings/angularjs/angular-resource.d.ts" />

module AngularTablesDataManagerApp.Services {
    import models = AngularTablesDataManagerApp.Models;
    import services = AngularTablesDataManagerApp.Services;

    export abstract class GridService {
        public entitySet: string;
        public entityName: string;
        public metadataService: services.MetadataService;

        public constructor(entitySet: string, entityName: string, metadataService: services.MetadataService) {
            this.entitySet = entitySet;
            this.entityName = entityName;
            this.metadataService = metadataService;
        }

        public getMetadata(columns: Array<string>): ng.IPromise<Array<models.MetadataProperty>> {
            return this.metadataService.getMetadata(this.entityName, columns);
        }

        public getData(Columns: Array<models.MetadataProperty>, Datas: Array<models.IEntity>): Array<models.Row> {
            var gridData: Array<models.Row> = new Array<models.Row>();
            var rowData: Array<models.RowProperty>;

            for (var i = 0; i < Datas.length; i++) {
                var entity: models.IEntity = Datas[i];
                rowData = new Array<models.RowProperty>();

                for (var a = 0; a < Columns.length; a++) {
                    rowData.push(new models.RowProperty(Columns[a].Name, (<any>entity)[Columns[a].Name], Columns[a].Nullable));
                }

                gridData.push(new models.Row(entity, this.entityName, rowData));
            }

            return gridData;
        }

        public createData(Columns: Array<models.MetadataProperty>, Entity: models.IEntity) {
            var datas: Array<models.RowProperty> = new Array<models.RowProperty>();
            var item: models.Row = new models.Row(Entity, 'City', datas);

            for (var a = 0; a < Columns.length; a++) {
                datas.push(new models.RowProperty(Columns[a].Name, '', Columns[a].Nullable));
            }

            return item;
        }

        public saveData(item: models.Row): models.IEntity {
            for (var i = 0; i < item.Properties.length; i++) {
                (<any>item.Entity)[item.Properties[i].Name] = item.Properties[i].Value;
            }

            return <models.IEntity>item.Entity;
        }

        public abstract getGridData(Columns: Array<models.MetadataProperty>): ng.IPromise<Array<models.Row>>;
        public abstract createGridData(Columns: Array<models.MetadataProperty>): models.Row;
        public abstract saveGridData(item: models.Row): ng.IPromise<models.Row>;
        public abstract deleteGridData(item: models.Row): ng.IPromise<models.Row>;
    }
}
