import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormComponent } from './form-and-validation';
import { ReactiveFormService } from './form-and-validation/reactive-form.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginService } from 'app/user-module/login';
import { SpinnerDemoComponent } from './spinner-demo/spinner-demo.component';
import { SharedModule } from '@shared/shared.module';
import { SpinnerService } from '@core';
import { ToastrDemoComponent } from './toastr-demo/toastr-demo.component';
import { SenderComponent } from '../demo-module/state-management/sender.component';
import { ReceiverComponent } from '../demo-module/state-management/receiver.component';
import { routing } from './demo-ui.routing';



@NgModule({
  declarations: [ReactiveFormComponent, SpinnerDemoComponent, ToastrDemoComponent, SenderComponent, ReceiverComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    routing
  ],
  exports: [
    ReactiveFormComponent,
    SpinnerDemoComponent
  ],
  providers: [ReactiveFormService, LoginService, SpinnerService]
})
export class DemoUIModule { }
