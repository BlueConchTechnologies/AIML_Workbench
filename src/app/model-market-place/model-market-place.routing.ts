import { ModuleWithProviders } from '@angular/core';
import {  Routes, RouterModule} from "@angular/router";
import { AuthGuardService } from '@global';
import { Constants, Role } from '@shared';
import { MarketPlaceComponent } from './market-place/market-place.component';

const appRoutes: Routes = [

    {
        path: Constants.uiRoutes.marketplace,
        component: MarketPlaceComponent,
        canActivate: [AuthGuardService]
    },
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(appRoutes);