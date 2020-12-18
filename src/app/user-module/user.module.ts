import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotAndChangePasswordComponent } from './forgot-and-change-password';
import { SendEmailComponent } from './send-email/send-email.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AuthGuardService } from '@global';


@NgModule({
  declarations: [ForgotAndChangePasswordComponent, SendEmailComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  exports: [ForgotAndChangePasswordComponent, SendEmailComponent],
  providers: [AuthGuardService]
})
export class UserModule { }
