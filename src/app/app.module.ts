import { BrowserModule } from '@angular/platform-browser';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import { ServiceWorkerModule } from '@angular/service-worker';

import { CoreModule } from '@core/core.module';
import { GlobalModule } from '@global/global.module';
import { SharedModule } from '@shared/shared.module';

import { routing } from './app.routing';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { UserModule } from './user-module/user.module';
import { DemoUIModule } from './demo-module/demo-ui.module';
import { ModalDemoComponent } from './demo-module/modal-demo/modal-demo.component';
import { AdminModule } from './admin-module/admin.module';
import { ModelModule } from './model-module/model.module'
import { HomeComponent } from './home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ModelMarketPlaceModule } from './model-market-place/model-market-place.module';
import { CaseStudyModule } from './case-study/case-study.module';
import '@angular/compiler';

//Feature Module
import { MatDialogModule } from '@angular/material/dialog';
// State Management
import { StoreModule } from '@ngrx/store';
import { CartReducer } from '@shared/state-management/store/reducer/cart.reducer';
import { TrainModelComponent } from './model-module/train-model/train-model/train-model.component';
import {AccountComponent} from './account-info/account/account/account.component';
import { SignupComponent } from './user-module/signup/signup.component';
import { ProfileComponent } from './userProfile/profile/profile.component';
import { AuthGuardService } from 'app/global-module/services/auth-guard.service';



@NgModule({
  declarations: [
    AppComponent,
    ModalDemoComponent,
    HomeComponent,
    TrainModelComponent,
    AccountComponent, 
    SignupComponent, ProfileComponent 
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    CoreModule.forRoot(
      { environmentName: environment.environmentName
        , apiTokenUrl: ''
        , appUrl: environment.appUrl
        , domain: environment.domain
      }),
    GlobalModule.forRoot(),
    SharedModule,
    routing,
    AdminModule,
    UserModule,
    StoreModule.forRoot({ reducer: CartReducer }),
    DemoUIModule,
    ModelModule,
    MatStepperModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    ModelMarketPlaceModule,
    CaseStudyModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
