
import { Location, PlatformLocation } from '@angular/common';
import { Router, Route as Config } from '@angular/router';
import { RenderAngularJsRoute } from '../angular/angular-js-route.component';

export class Route {
  constructor(public $rootScope, private location: Location, 
    private platformLocation: PlatformLocation, private router: Router, private routes: [string, ng.route.IRoute][]) {

    // Set up listeners for $locationChangeStart/Success. This might not be necessary though if
    // routing comes through the Angular router completely.

    // Determine where to add AngularJS routes. Will include them after the Angular routes,
    // but before any Angular wildcard routes.
    const startIdx = router.config.findIndex((c, i, a) => isWildcard(c) || i === a.length - 1);
    router.config.splice(startIdx, 0, ...routes.map(r => {
      return {path: cleanUrl(r[0]), component: RenderAngularJsRoute, data: r[1]};
    }));
  }
}

function cleanUrl(url: string) {
  return url.charAt(0) === '/' ? url.slice(1) : url;
}

function isWildcard(c: Config) {
  return (c.pathMatch !== 'full' && c.path === '') || c.path === '**';
}

export class RouteProvider implements ng.route.IRouteProvider {

  private routes: [string, ng.route.IRoute][] = [];
  
  caseInsensitiveMatch = false;
  
  /**
   * Needs to support the same API as $routeProvider.when. However, I don't think there's a good
   * way to get a hold of the router at the time this method is called since this method is
   * called during the config phase in AngularJS. Therefore the calls to .when here will be cached
   * and read from when the $get method is called to add them to Angular Router.
   */
  when(path: string, route: ng.route.IRoute): ng.route.IRouteProvider {
    this.routes.push([path, route]);
    return this;
  }

  otherwise(params: ng.route.IRoute | string): ng.route.IRouteProvider {
    if (typeof params === 'string') {
      this.routes.push(['**', {redirectTo: params}]);
    } else {
      this.routes.push(['**', params]);
    }
    return this;
  }

  $get = ['$rootScope', 'DowngradedLocation', 'DowngradedPlatformLocation', 'DowngradedRouter',
    ($rootScope, Location: Location, PlatformLocation: PlatformLocation, Router: Router) => {
      return new Route($rootScope, Location, PlatformLocation, Router, this.routes);
    }
  ];

}
