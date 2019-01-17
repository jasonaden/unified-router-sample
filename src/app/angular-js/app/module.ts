
import * as angular from 'angular';
import { ROUTER_UPGRADE_MODULE } from 'src/app/upgrade/angular-js/module';
import { ROUTES } from './routes';

export const appModule = angular.module('app', [ROUTER_UPGRADE_MODULE]);
appModule.config(function($routeProvider: ng.route.IRouteProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  Object.keys(ROUTES).forEach(path => {
    $routeProvider.when(path, ROUTES[path]);
  });

});
