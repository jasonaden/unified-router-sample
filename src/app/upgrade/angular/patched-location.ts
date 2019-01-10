import { Location, LocationStrategy } from '@angular/common';
import { Injectable } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';

@Injectable()
export class PatchedLocation extends Location {

  private rootScope: any;

  constructor(platformStrategy: LocationStrategy, private ngUpgrade: UpgradeModule) {
    super(platformStrategy);
  }

  private broadcast(event: string, newUrl: string, oldUrl: string, newState: any, oldState: any) {
    // Look at adding a promise to UpgradeModule to let us handle logic once it's been bootstrapped
    if (!this.rootScope) {
      if (this.ngUpgrade.$injector) {
        this.rootScope = this.ngUpgrade.$injector.get('$rootScope');
      } else {
        return;
      }
    }
    this.rootScope.$broadcast(event, newUrl, oldUrl, newState, oldState);
  }

  /**
   * Changes the browsers URL to the normalized version of the given URL, and pushes a
   * new item onto the platform's history.
   */
  go(path: string, query: string = '', state: any = null): void {
    const fromPath = this.path();
    const fromState = window.history.state;
    this.broadcast('$locationChangeStart', path, fromPath,
      fromState, state);
    super.go(path, query, state);
    this.broadcast('$locationChangeSuccess', path, fromPath,
      fromState, state);
  }
}
