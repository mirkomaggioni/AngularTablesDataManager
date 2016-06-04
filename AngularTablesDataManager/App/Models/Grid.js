var AngularTablesDataManagerApp;
(function (AngularTablesDataManagerApp) {
    var Models;
    (function (Models) {
        var Grid = (function () {
            function Grid() {
            }
            return Grid;
        }());
        Models.Grid = Grid;
        var Row = (function () {
            function Row(entity, name, datas) {
                this.Entity = entity;
                this.Name = name;
                this.Properties = datas;
            }
            return Row;
        }());
        Models.Row = Row;
        var MetadataProperty = (function () {
            function MetadataProperty() {
            }
            return MetadataProperty;
        }());
        Models.MetadataProperty = MetadataProperty;
        var RowProperty = (function () {
            function RowProperty(name, value, nullable) {
                this.Name = name;
                this.Value = value;
                this.Nullable = nullable;
            }
            return RowProperty;
        }());
        Models.RowProperty = RowProperty;
    })(Models = AngularTablesDataManagerApp.Models || (AngularTablesDataManagerApp.Models = {}));
})(AngularTablesDataManagerApp || (AngularTablesDataManagerApp = {}));

//# sourceMappingURL=Grid.js.map
