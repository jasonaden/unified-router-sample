import { Route } from '@angular/router';

export const ANGULARJS_ROUTE_CONFIG = Symbol('ANGULARJS_ROUTE_CONFIG')

export function jsToAngularRoute(path: string, route: ng.route.IRoute): Route {
  return {
    path,
    data: {
      ANGULARJS_ROUTE_CONFIG: route
    }
  };
}


