/// <reference path="../models/grid.ts" />
/// <reference path="metadataservice.ts" />
/// <reference path="../../scripts/typings/angularjs/angular-resource.d.ts" />
var AngularTablesDataManagerApp;
(function (AngularTablesDataManagerApp) {
    var Services;
    (function (Services) {
        var models = AngularTablesDataManagerApp.Models;
        var GridService = (function () {
            function GridService(entitySet, entityName, metadataService) {
                this.entitySet = entitySet;
                this.entityName = entityName;
                this.metadataService = metadataService;
            }
            GridService.prototype.getMetadata = function (columns) {
                return this.metadataService.getMetadata(this.entityName, columns);
            };
            GridService.prototype.getData = function (Columns, Datas) {
                var gridData = new Array();
                var rowData;
                for (var i = 0; i < Datas.length; i++) {
                    var entity = Datas[i];
                    rowData = new Array();
                    for (var a = 0; a < Columns.length; a++) {
                        rowData.push(new models.RowProperty(Columns[a].Name, entity[Columns[a].Name], Columns[a].Nullable));
                    }
                    gridData.push(new models.Row(entity, this.entityName, rowData));
                }
                return gridData;
            };
            GridService.prototype.createData = function (Columns, Entity) {
                var datas = new Array();
                var item = new models.Row(Entity, 'City', datas);
                for (var a = 0; a < Columns.length; a++) {
                    datas.push(new models.RowProperty(Columns[a].Name, '', Columns[a].Nullable));
                }
                return item;
            };
            GridService.prototype.saveData = function (item) {
                for (var i = 0; i < item.Properties.length; i++) {
                    item.Entity[item.Properties[i].Name] = item.Properties[i].Value;
                }
                return item.Entity;
            };
            return GridService;
        }());
        Services.GridService = GridService;
    })(Services = AngularTablesDataManagerApp.Services || (AngularTablesDataManagerApp.Services = {}));
})(AngularTablesDataManagerApp || (AngularTablesDataManagerApp = {}));

//# sourceMappingURL=GridService.js.map
