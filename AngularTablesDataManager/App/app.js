/// <reference path="../scripts/typings/angular-ui/angular-ui-router.d.ts" />
var AngularTablesDataManagerApp;
(function (AngularTablesDataManagerApp) {
    var AngularTablesDataManager = (function () {
        function AngularTablesDataManager() {
        }
        AngularTablesDataManager.module = angular.module('angularTablesDataManager', ['ngResource', 'ui.bootstrap', 'ui.router', 'toaster', 'angular-loading-bar']);
        return AngularTablesDataManager;
    }());
    AngularTablesDataManagerApp.AngularTablesDataManager = AngularTablesDataManager;
    AngularTablesDataManager.module.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/cities");
        $stateProvider
            .state('Cities', {
            url: '/cities',
            templateUrl: '/app/views/cities.html',
            controller: 'CitiesController as vm'
        })
            .state('Zips', {
            url: '/zips',
            templateUrl: '/app/views/zips.html',
            controller: 'ZipsController as vm'
        });
    });
})(AngularTablesDataManagerApp || (AngularTablesDataManagerApp = {}));

//# sourceMappingURL=App.js.map
