/// <reference path="../scripts/typings/angular-ui/angular-ui-router.d.ts" />

module AngularTablesDataManagerApp {
    export class AngularTablesDataManager {
        static module = angular.module('angularTablesDataManager', ['ngResource', 'ui.bootstrap', 'ui.router', 'toaster', 'angular-loading-bar']);
    }

    AngularTablesDataManager.module.config(($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
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
}
