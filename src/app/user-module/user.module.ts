import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotAndChangePasswordComponent } from './forgot-and-change-password';
import { SendEmailComponent } from './send-email/send-email.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AuthGuardService } from '@global';
import { QuestionComponent } from './security-question/question/question.component';
import { ChangePasswordComponent } from './change-password/change-password/change-password.component';


@NgModule({
  declarations: [ForgotAndChangePasswordComponent, SendEmailComponent, QuestionComponent, ChangePasswordComponent],
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
