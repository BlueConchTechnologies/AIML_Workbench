import { ModuleWithProviders } from '@angular/core';

import {
    Routes,
    RouterModule
} from '@angular/router';

import { PageNotFoundComponent } from '@core';
import { AuthGuardService } from 'app/global-module/services/auth-guard.service';
import { Constants, Role } from '@shared';

import { ForgotAndChangePasswordComponent } from './user-module/forgot-and-change-password/forgot-and-change-password.component';
import { LoginComponent } from './user-module/login/login.component';
import { SignupComponent } from './user-module/signup/signup.component';
import { QuestionComponent } from './user-module/security-question/question/question.component';
import { ChangePasswordComponent } from './user-module/change-password/change-password/change-password.component';
import { MarketPlaceComponent } from './model-market-place/market-place/market-place.component';

import { SendEmailComponent } from './user-module/send-email/send-email.component';
import { AdminHomeComponent } from './admin-module/admin-home/admin-home.component';
import { UnauthorizeComponent } from '@core/unauthorize/unauthorize.component';
import { HomeComponent } from './home/home.component';
import {AccountComponent} from './account-info/account/account/account.component';
import { ProfileComponent } from './userProfile/profile/profile.component';


const appRoutes: Routes = [
    {
        path: Constants.uiRoutes.empty,
        component: LoginComponent
    },
    {
        path: Constants.uiRoutes.signup,
        component:SignupComponent
    },
    {
        path: Constants.uiRoutes.adminhome,
        component: AdminHomeComponent,
        canActivate: [AuthGuardService],
        data: { roles: [Role.Admin] }
    },
    {
        path: Constants.uiRoutes.home,
        component: HomeComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: Constants.uiRoutes.marketplace,
        component: MarketPlaceComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: Constants.uiRoutes.unauthorize,
        component: UnauthorizeComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: Constants.uiRoutes.sendemail,
        component: SendEmailComponent
    },
    {
        path: Constants.uiRoutes.forgotpassword,
        component: ForgotAndChangePasswordComponent
    },
    {
        path: Constants.uiRoutes.account,
        component: AccountComponent
    },
    {
        path: Constants.uiRoutes.profile,
        component: ProfileComponent
    },
    {
        path: Constants.uiRoutes.security_question,
        component: QuestionComponent
    },
    {
        path: Constants.uiRoutes.forgot_password,
        component: ChangePasswordComponent
    },
    
    {
        path: '**',
        component: PageNotFoundComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: Constants.uiRoutes.security_question,
        component: QuestionComponent
    },
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);
