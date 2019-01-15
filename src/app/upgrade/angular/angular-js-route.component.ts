import { Component, Input, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { map, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UpgradeModule } from '@angular/upgrade/static';

@Component({
  selector: 'render-angular-js-route',
  template: ''
})
export class RenderAngularJsRoute implements OnDestroy {
  destroy$ = new Subject<boolean>();
  
  constructor(private snapshot: ActivatedRoute, private ngUpgrade: UpgradeModule) {
    
  }

  ngOnInit() {
    const $route = this.ngUpgrade.$injector.get('$route');
    this.snapshot.data.pipe(
      takeUntil(this.destroy$)
    ).subscribe(d => {
      console.log('$route', $route);
      console.log('data: ', d);
      const preparedRoute = $route.prepareRoute(d);
      $route.commitRoute(preparedRoute);
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}