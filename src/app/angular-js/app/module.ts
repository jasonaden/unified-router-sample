
import * as angular from 'angular';
import { ROUTER_UPGRADE_MODULE } from 'src/app/upgrade/angular-js/module';

export const appModule = angular.module('app', [ROUTER_UPGRADE_MODULE]);
appModule.config(function($routeProvider: ng.route.IRouteProvider, $locationProvider) { 
  $locationProvider.html5Mode(true);

  $routeProvider.when('/dashboard', {
    template: '<p>/dashboard in AngularJS config</p>'
  })
  
  .when('/otherUrl', {
    template: `<p>/otherUrl in AngularJS configuration with data bindings {{ctrl.nowish | date : 'h:mm:ss'}}`,
    controllerAs: 'ctrl',
    controller: function ($interval) {
      const that = this;
      $interval(updateDate, 1000);
      updateDate();
      function updateDate() {
        that.nowish = Date.now();
      }
    }
  })
  .otherwise({
    template: 'blank'
  });
});
