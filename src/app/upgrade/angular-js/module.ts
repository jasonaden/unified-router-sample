import 'angular';
import 'angular-route';
import * as angular from 'angular';
import * as ngRoute from 'angular-route';
import { DowngradedLocation, DowngradedPlatformLocation } from './downgrade';
import { UpgradeLocationProvider } from './location';

export const ROUTER_UPGRADE_MODULE = 'RouterUpgradeModule';
export const upgradeModule = angular.module(ROUTER_UPGRADE_MODULE, [ngRoute])
  .factory('DowngradedLocation', DowngradedLocation)
  .factory('DowngradedPlatformLocation', DowngradedPlatformLocation)
  .provider('$location', UpgradeLocationProvider);
