import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [AdminHomeComponent],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [AdminHomeComponent]
})
export class AdminModule { }
