import { Location, PlatformLocation } from '@angular/common';
import { downgradeInjectable } from '@angular/upgrade/static';
import { Router } from '@angular/router';

export const DowngradedLocation = downgradeInjectable(Location);
export const DowngradedPlatformLocation = downgradeInjectable(PlatformLocation);
export const DowngradedRouter = downgradeInjectable(Router);