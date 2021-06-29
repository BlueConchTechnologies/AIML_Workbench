import { ModuleWithProviders } from '@angular/core';
import {  Routes, RouterModule} from "@angular/router";
import { AuthGuardService } from '@global';
import { Constants, Role } from '@shared';
import { ModelListComponent } from "./model-list/model-list/model-list.component";

const appRoutes: Routes = [

    {
        path: Constants.uiRoutes.modellist,
        component: ModelListComponent,
        canActivate: [AuthGuardService]
    },
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(appRoutes);