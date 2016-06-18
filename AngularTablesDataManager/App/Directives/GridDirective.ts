/// <reference path="../models/grid.ts" />
/// <reference path="../commons.ts" />

module AngularTablesDataManagerApp.Directives {
    import commons = AngularTablesDataManagerApp.Commons;
    import models = AngularTablesDataManagerApp.Models;

    interface IGridItem {
        item: models.Row;
    }

    interface IGridDirectiveScope extends ng.IScope {
        entityName: string;
        list: models.Grid;
        item: models.Row;
        rowModel: models.Row;
        newItem: boolean;

        New(): void;
        Save(item: IGridItem): void;
        Delete(item: IGridItem): void;
        Close(): void;
        GetEntityName(): string;
    }

    class GridController {
        $scope: IGridDirectiveScope;

        constructor($scope: IGridDirectiveScope) {
            this.$scope = $scope;
        }

        public Edit(item: models.Row) {
            this.$scope.item = item;
            this.$scope.newItem = false;
        }

        public New() {
            this.$scope.item = new models.Row(angular.copy(this.$scope.rowModel.Entity), this.$scope.rowModel.Name, angular.copy(this.$scope.rowModel.Properties));
            this.$scope.newItem = true;
        }

        public Save(item: models.Row) {
            var obj: IGridItem = { item: item };

            this.$scope.Save(obj);
        }

        public Delete(item: models.Row) {
            this.$scope.item = null;
            var obj: IGridItem = { item: item };

            this.$scope.Delete(obj);
        }

        public Close() {
            if (!this.$scope.newItem) {
                for (var i = 0; i < this.$scope.item.Properties.length; i++) {
                    this.$scope.item.Properties[i].Value = (<any>this.$scope.item.Entity)[this.$scope.item.Properties[i].Name];
                }
            }

            this.$scope.item = null;
        }

        public GetEntityName() {
            return this.$scope.entityName;
        }
    }

    export class GridDirective implements ng.IDirective {
        public restrict = 'E';
        public templateUrl = 'app/directives/grid.html';
        public scope = {
            entityName: '=',
            list: '=',
            rowModel: '=',
            order: '@order',
            New: '&new',
            Save: '&save',
            Delete: '&delete'
        };
        public controller = GridController;
    }

    interface IGridListDirectiveScope extends ng.IScope {
        gridItem: models.Row;
        New(): void;
    }

    export class GridListDirective implements ng.IDirective {
        public require = '^grid';
        public restrict = 'E';
        public templateUrl = 'app/directives/gridList.html';
        public scope = {
            list: '=',
            order: '='
        };
        public link = (scope: IGridListDirectiveScope, element: ng.IAugmentedJQuery, attrs: IArguments, gridCtrl: GridController) => {
            scope.New = () => {
                gridCtrl.New();
            }
        }
    }

    export class GridColumnDirective implements ng.IDirective {
        public restrict = 'A';
        public templateUrl = 'app/directives/gridColumn.html';
        public scope = {
            gridColumn: '='
        };
    }

    interface IGridRowDirectiveScope extends ng.IScope {
        gridRow: models.Row;
        Edit(): void;
    }

    export class GridRowDirective implements ng.IDirective {
        public require = '^grid';
        public restrict = 'A';
        public templateUrl = 'app/directives/gridRow.html';
        public scope = {
            gridRow: '='
        };
        public link = (scope: IGridRowDirectiveScope, element: ng.IAugmentedJQuery, attrs: IArguments, gridCtrl: GridController) => {
            scope.Edit = () => {
                gridCtrl.Edit(scope.gridRow);
            }
        }
    }

    export class GridCellDirective implements ng.IDirective {
        public restrict = 'A';
        public templateUrl = 'app/directives/gridCell.html';
        public scope = {
            gridCell: '='
        };
    }

    interface IGridItemDirectiveScope extends ng.IScope {
        item: models.Row;
        metadata: Array<models.MetadataProperty>;
        isNew: boolean;

        GetMetadataProperty(Name: string): models.MetadataProperty;
        GetEntityName(): string;
        Save(): void;
        Delete(): void;
        Close(): void;
    }

    export class GridItemDirective implements ng.IDirective {
        $filter: ng.IFilterService;
        public require = '^grid';
        public restrict = 'E';
        public templateUrl = 'app/directives/gridItem.html';
        public scope = {
            item: '=',
            metadata: '=',
            isNew: '='
        };
        public link = (scope: IGridItemDirectiveScope, element: ng.IAugmentedJQuery, attrs: IArguments, gridCtrl: GridController) => {
            scope.Save = () => {
                gridCtrl.Save(scope.item);
            }

            scope.Delete = () => {
                gridCtrl.Delete(scope.item);
            }

            scope.Close = () => {
                gridCtrl.Close();
            }

            scope.GetMetadataProperty = (Name: string) => {
                return this.$filter('filter')(scope.metadata, { 'Name': Name })[0];
            }

            scope.GetEntityName = () => {
                return gridCtrl.GetEntityName();
            }
        }

        public constructor($filter: ng.IFilterService) {
            this.$filter = $filter;
        }
    }

    AngularTablesDataManager.module.directive('grid', () => new Directives.GridDirective);
    AngularTablesDataManager.module.directive('gridList', () => new Directives.GridListDirective());
    AngularTablesDataManager.module.directive('gridColumn', () => new Directives.GridColumnDirective);
    AngularTablesDataManager.module.directive('gridRow', () => new Directives.GridRowDirective);
    AngularTablesDataManager.module.directive('gridCell', () => new Directives.GridCellDirective);
    AngularTablesDataManager.module.directive('gridItem', ($filter: ng.IFilterService) => new Directives.GridItemDirective($filter));
}
