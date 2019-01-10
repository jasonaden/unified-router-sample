import * as angular from  'angular';
import 'angular-route';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpgradeModule, setAngularJSGlobal } from '@angular/upgrade/static';
import { AngularJSComponent } from './angular-js.component';

import {appModule} from './app/module';

setAngularJSGlobal(angular);

let initalized = false;

const routes: Routes = [{path: '**', component: AngularJSComponent}];

@NgModule({
  declarations: [AngularJSComponent],
  imports: [
    UpgradeModule,
    RouterModule.forChild(routes)
  ]
})
export class AngularJSModule {
  // The constructor is called only once, so we bootstrap the application
  // only once, when we first navigate to the legacy part of the app.
  constructor(upgrade: UpgradeModule) {
    if (!initalized) {
      upgrade.bootstrap(document.body, [appModule.name]);
      // setUpLocationSync(upgrade);
      initalized = true;
    }
  }
}
