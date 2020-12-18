import { Component, OnInit } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from '@core/services';
import { CaseStudyService } from '../services/case-study.service';
import { Constants } from '@shared';

@Component({
  selector: 'app-create-design',
  templateUrl: './create-design.component.html',
  styleUrls: ['./create-design.component.css']
})
export class CreateDesignComponent implements OnInit {

  public modelName: string = '';
  public modelDescription: string = '';
  public usecaseform: any[] = [{
    id: 1,
    "textFieldKey" : '',
    "textFieldValue": ''
  }];

  constructor(private _caseStudyService: CaseStudyService, private router: Router,private toastService: ToastrService) { }

  ngOnInit(): void {
  }

  addTextField() {
    this.usecaseform.push({
      id: this.usecaseform.length + 1,
      "textFieldKey" : '',
      "textFieldValue": ''
    });
  }

  removeTextField(i: number) {
    this.usecaseform.splice(i, 1);
  }

  finalDesign() {
    this.usecaseform = [{
      "model_name": this.modelName,
      "model_description": this.modelDescription,
      "dynamic_fields": this.usecaseform }];
      this.router.navigateByUrl(Constants.uiRoutes.designWorkflow, { state: this.usecaseform });
  }

  logValue() {
    console.log(this.usecaseform);
  }

}
