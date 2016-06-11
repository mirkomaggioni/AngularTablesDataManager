/// <reference path="../models/grid.ts" />
/// <reference path="../commons.ts" />
var AngularTablesDataManagerApp;
(function (AngularTablesDataManagerApp) {
    var Directives;
    (function (Directives) {
        var models = AngularTablesDataManagerApp.Models;
        var GridController = (function () {
            function GridController($scope) {
                this.$scope = $scope;
            }
            GridController.prototype.Edit = function (item) {
                this.$scope.item = item;
                this.$scope.newItem = false;
            };
            GridController.prototype.New = function () {
                this.$scope.item = new models.Row(angular.copy(this.$scope.rowModel.Entity), this.$scope.rowModel.Name, angular.copy(this.$scope.rowModel.Properties));
                this.$scope.newItem = true;
            };
            GridController.prototype.Save = function (item) {
                var obj = { item: item };
                this.$scope.Save(obj);
            };
            GridController.prototype.Delete = function (item) {
                this.$scope.item = null;
                var obj = { item: item };
                this.$scope.Delete(obj);
            };
            GridController.prototype.Close = function () {
                if (!this.$scope.newItem) {
                    for (var i = 0; i < this.$scope.item.Properties.length; i++) {
                        this.$scope.item.Properties[i].Value = this.$scope.item.Entity[this.$scope.item.Properties[i].Name];
                    }
                }
                this.$scope.item = null;
            };
            return GridController;
        }());
        var GridDirective = (function () {
            function GridDirective() {
                this.restrict = 'E';
                this.templateUrl = 'app/directives/grid.html';
                this.scope = {
                    list: '=',
                    rowModel: '=',
                    order: '@order',
                    New: '&new',
                    Save: '&save',
                    Delete: '&delete'
                };
                this.controller = GridController;
            }
            return GridDirective;
        }());
        Directives.GridDirective = GridDirective;
        var GridListDirective = (function () {
            function GridListDirective() {
                this.require = '^grid';
                this.restrict = 'E';
                this.templateUrl = 'app/directives/gridList.html';
                this.scope = {
                    list: '=',
                    order: '='
                };
                this.link = function (scope, element, attrs, gridCtrl) {
                    scope.New = function () {
                        gridCtrl.New();
                    };
                };
            }
            return GridListDirective;
        }());
        Directives.GridListDirective = GridListDirective;
        var GridColumnDirective = (function () {
            function GridColumnDirective() {
                this.restrict = 'A';
                this.templateUrl = 'app/directives/gridColumn.html';
                this.scope = {
                    gridColumn: '='
                };
            }
            return GridColumnDirective;
        }());
        Directives.GridColumnDirective = GridColumnDirective;
        var GridRowDirective = (function () {
            function GridRowDirective() {
                this.require = '^grid';
                this.restrict = 'A';
                this.templateUrl = 'app/directives/gridRow.html';
                this.scope = {
                    gridRow: '='
                };
                this.link = function (scope, element, attrs, gridCtrl) {
                    scope.Edit = function () {
                        gridCtrl.Edit(scope.gridRow);
                    };
                };
            }
            return GridRowDirective;
        }());
        Directives.GridRowDirective = GridRowDirective;
        var GridCellDirective = (function () {
            function GridCellDirective() {
                this.restrict = 'A';
                this.templateUrl = 'app/directives/gridCell.html';
                this.scope = {
                    gridCell: '='
                };
            }
            return GridCellDirective;
        }());
        Directives.GridCellDirective = GridCellDirective;
        var GridItemDirective = (function () {
            function GridItemDirective($filter) {
                var _this = this;
                this.require = '^grid';
                this.restrict = 'E';
                this.templateUrl = 'app/directives/gridItem.html';
                this.scope = {
                    item: '=',
                    metadata: '=',
                    isNew: '='
                };
                this.link = function (scope, element, attrs, gridCtrl) {
                    scope.Save = function () {
                        gridCtrl.Save(scope.item);
                    };
                    scope.Delete = function () {
                        gridCtrl.Delete(scope.item);
                    };
                    scope.Close = function () {
                        gridCtrl.Close();
                    };
                    scope.GetMetadataProperty = function (Name) {
                        return _this.$filter('filter')(scope.metadata, { 'Name': Name })[0];
                    };
                };
                this.$filter = $filter;
            }
            return GridItemDirective;
        }());
        Directives.GridItemDirective = GridItemDirective;
        AngularTablesDataManagerApp.AngularTablesDataManager.module.directive('grid', function () { return new Directives.GridDirective; });
        AngularTablesDataManagerApp.AngularTablesDataManager.module.directive('gridList', function () { return new Directives.GridListDirective(); });
        AngularTablesDataManagerApp.AngularTablesDataManager.module.directive('gridColumn', function () { return new Directives.GridColumnDirective; });
        AngularTablesDataManagerApp.AngularTablesDataManager.module.directive('gridRow', function () { return new Directives.GridRowDirective; });
        AngularTablesDataManagerApp.AngularTablesDataManager.module.directive('gridCell', function () { return new Directives.GridCellDirective; });
        AngularTablesDataManagerApp.AngularTablesDataManager.module.directive('gridItem', function ($filter) { return new Directives.GridItemDirective($filter); });
    })(Directives = AngularTablesDataManagerApp.Directives || (AngularTablesDataManagerApp.Directives = {}));
})(AngularTablesDataManagerApp || (AngularTablesDataManagerApp = {}));

//# sourceMappingURL=GridDirective.js.map
