
import { Location, PlatformLocation } from '@angular/common';

export class UpgradeLocationService {
  location: Location;
  platformLocation: PlatformLocation;
  constructor(public $rootScope, $browser, $sniffer, $rootElement, $window, Location, PlatformLocation) {
    this.location = Location;
    this.platformLocation = PlatformLocation;
    // Fire location changes one time to start. This must be done on the next tick in order for listeners
    // to be registered before the event fires. Mimicing behavior from $locationWatch:
    // https://github.com/angular/angular.js/blob/master/src/ng/location.js#L983
    setTimeout(() => {
      const path = this.path();
      this.$rootScope.$broadcast('$locationChangeStart', path, path,
          null, null);
      this.$rootScope.$broadcast('$locationChangeSuccess', path, path,
        null, null);
    }, 0);
  }

  $onInit() {
    debugger;
  }
  path(path?: string) {
    if (!path) {
      return this.location.path(true);
    } else {
      const currPath = this.path();
      
      if (!this.$rootScope.$broadcast('$locationChangeStart', path, currPath,
        null, null).defaultPrevented) {
        this.location.go(path);
        this.$rootScope.$broadcast('$locationChangeSuccess', path, currPath,
          null, null); 
      }
      return this;
    }
  }

  hash(hash?: string) {
    if (!hash) {
      return this.platformLocation.hash;
    } else {
      throw new Error('NOT IMPLEMENTED');
    }
  }

  search() {
    return {};
  }
}

export class UpgradeLocationProvider {
  $get = ['$rootScope', '$browser', '$sniffer', '$rootElement', '$window', 'DowngradedLocation', 'DowngradedPlatformLocation',
    function ($rootScope, $browser, $sniffer, $rootElement, $window, Location: Location, PlatformLocation: PlatformLocation) {
      return new UpgradeLocationService($rootScope, $browser, $sniffer, $rootElement, $window, Location, PlatformLocation);
    }
  ];

  html5Mode(enabled: boolean = false) {
    return this;
  }
}
