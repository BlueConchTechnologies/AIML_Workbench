import { ModuleWithProviders } from '@angular/core';

import {
    Routes,
    RouterModule
} from '@angular/router';
import { AuthGuardService } from '@global';
import { Constants, Role } from '@shared';
import { ReactiveFormComponent } from './form-and-validation';
import { ModalDemoComponent } from './modal-demo/modal-demo.component';
import { SpinnerDemoComponent } from './spinner-demo/spinner-demo.component';
import { ToastrDemoComponent } from './toastr-demo/toastr-demo.component';
import { SenderComponent } from './state-management/sender.component';
import { ReceiverComponent } from './state-management/receiver.component';

const appRoutes: Routes = [

    {
        path: Constants.uiRoutes.reactiveForm,
        component: ReactiveFormComponent,
        canActivate: [AuthGuardService],
        data: { roles: [Role.User] }
    },
    {
        path: Constants.uiRoutes.modal,
        component: ModalDemoComponent,
        canActivate: [AuthGuardService],
        data: { roles: [Role.User] }
    },
    {
        path: Constants.uiRoutes.spinnerdemo,
        component: SpinnerDemoComponent,
        canActivate: [AuthGuardService],
        data: { roles: [Role.User] }
    },
    {
        path: Constants.uiRoutes.toastrdemo,
        component: ToastrDemoComponent,
        canActivate: [AuthGuardService],
        data: { roles: [Role.User] }
    },
    {
        path: Constants.uiRoutes.statemanagement,
        component: SenderComponent,
        canActivate: [AuthGuardService],
        data: { roles: [Role.User] },
        children: [
            {
                path: Constants.uiRoutes.empty,
                component: ReceiverComponent,
                canActivate: [AuthGuardService],
                data: { roles: [Role.User] },
            },
        ]
    }

];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(appRoutes);
