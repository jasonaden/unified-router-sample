import { Location, PlatformLocation } from '@angular/common';
import { downgradeInjectable } from '@angular/upgrade/static';

export const DowngradedLocation = downgradeInjectable(Location);
export const DowngradedPlatformLocation = downgradeInjectable(PlatformLocation);
