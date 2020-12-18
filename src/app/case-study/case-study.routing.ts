import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { AuthGuardService } from '@global';
import { Constants, Role } from '@shared';
import { AllUseCaseComponent } from './all-use-case/all-use-case.component';
import { CreateDesignComponent } from './create-design/create-design.component';
import { CreateUseCaseComponent } from './create-use-case/create-use-case.component';
import { DesignWorkflowComponent } from './design-workflow/design-workflow.component';

const appRoutes: Routes = [

  {
    path: Constants.uiRoutes.casestudy,
    component: AllUseCaseComponent
  },
  {
    path: Constants.uiRoutes.createdesign,
    component: CreateDesignComponent
  },
  {
    path: Constants.uiRoutes.createusecase,
    component: CreateUseCaseComponent
  },
  {
    path: Constants.uiRoutes.designWorkflow,
    component: DesignWorkflowComponent
  }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(appRoutes);
