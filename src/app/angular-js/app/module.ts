
import * as angular from 'angular';
import { ROUTER_UPGRADE_MODULE } from 'src/app/upgrade/angular-js/module';

export const appModule = angular.module('app', [ROUTER_UPGRADE_MODULE]);

appModule.config(function($routeProvider: ng.route.IRouteProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider.when('/dashboard', {
    template: '<h1>Route rendered by AngularJS</h1>'
  })
  .otherwise({
    template: 'blank'
  });
});
