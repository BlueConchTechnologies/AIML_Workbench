import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule,  } from '@angular/common';
import { ModelListComponent } from "./model-list/model-list/model-list.component";
import { routing } from './model.routing';
import { SharedModule } from '../shared-module/shared.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ModelHistoryComponent } from './model-history/model-history.component';



@NgModule({
  declarations: [ModelListComponent, ModelHistoryComponent],
  imports: [
    CommonModule,
    SharedModule,
    routing,
    TableModule,
    ButtonModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],

})
export class ModelModule { }
