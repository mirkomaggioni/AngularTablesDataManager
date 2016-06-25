var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
        var Column = (function () {
            function Column(name, showedInGrid, ShowedInDetail) {
                this.Name = name;
                this.ShowedInGrid = showedInGrid;
                this.ShowedInDetail = ShowedInDetail;
            }
            return Column;
        }());
        Models.Column = Column;
        var Row = (function () {
            function Row(entity, name, datas) {
                this.Entity = entity;
                this.Name = name;
                this.Properties = datas;
            }
            return Row;
        }());
        Models.Row = Row;
        var MetadataProperty = (function (_super) {
            __extends(MetadataProperty, _super);
            function MetadataProperty(name, type, nullable, showedInGrid, ShowedInDetail) {
                _super.call(this, name, showedInGrid, ShowedInDetail);
                this.Type = type;
                this.Nullable = nullable;
            }
            return MetadataProperty;
        }(Column));
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
