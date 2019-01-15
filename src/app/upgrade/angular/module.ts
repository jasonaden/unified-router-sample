import { NgModule } from '@angular/core';
import { PatchedLocation } from './patched-location';
import { LocationStrategy } from '@angular/common';
import { UpgradeModule } from '@angular/upgrade/static';
import { RenderAngularJsRoute } from './angular-js-route.component';

@NgModule({
  providers: [
    {provide: Location, useClass: PatchedLocation, deps: [LocationStrategy, UpgradeModule]}
  ]
})
export class LocationUpgradeModule {}

@NgModule({
  imports: [LocationUpgradeModule],
  declarations: [RenderAngularJsRoute],
  exports: [RenderAngularJsRoute],
  entryComponents: [RenderAngularJsRoute]
})
export class RouterUpgradeModule {}