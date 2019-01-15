import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Location, LocationStrategy } from '@angular/common';
import { PatchedLocation } from './upgrade/angular/patched-location';
import { UpgradeModule } from '@angular/upgrade/static';
import { RouterUpgradeModule } from './upgrade/angular/module';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: '**', loadChildren: './angular-js/angular-js.module#AngularJSModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true}), UpgradeModule, RouterUpgradeModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
