import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './case-study.routing';
import { SharedModule } from '@shared/shared.module';
import {ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AllUseCaseComponent } from './all-use-case/all-use-case.component';
import { CreateDesignComponent } from './create-design/create-design.component';
import { CreateUseCaseComponent } from './create-use-case/create-use-case.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { DesignWorkflowComponent } from './design-workflow/design-workflow.component';
import { ButtonModule } from 'primeng/button';
import { RunworkflowComponent } from './runworkflow/runworkflow.component';
import { ReloadIframeDirective } from './reload-iframe.directive';




@NgModule({
  declarations: [AllUseCaseComponent, CreateDesignComponent, CreateUseCaseComponent, DesignWorkflowComponent, RunworkflowComponent, ReloadIframeDirective],
  imports: [
    CommonModule,
    routing,
    SharedModule,
    FormsModule,
    NgxPaginationModule,
    NgbDropdownModule,
    ButtonModule,ReactiveFormsModule
  ]
})
export class CaseStudyModule { }
