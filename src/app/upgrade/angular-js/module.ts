import 'angular';
import 'angular-route';
import * as angular from 'angular';
import * as ngRoute from 'angular-route';
import { DowngradedLocation, DowngradedPlatformLocation, DowngradedRouter } from './downgrade';
import { UpgradeLocationProvider } from './location';
import { RouteProvider } from './route';
import { $RouteProvider, ngRouteUpgradeModule } from './route2';

export const ROUTER_UPGRADE_MODULE = 'RouterUpgradeModule';
export const upgradeModule = angular.module(ROUTER_UPGRADE_MODULE, [ngRoute, ngRouteUpgradeModule.name])
  .factory('DowngradedLocation', DowngradedLocation)
  .factory('DowngradedPlatformLocation', DowngradedPlatformLocation)
  .factory('DowngradedRouter', DowngradedRouter)
  .provider('$location', UpgradeLocationProvider)
  // .provider('$route', RouteProvider);
