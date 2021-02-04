import { Component, OnInit } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from '@core/services';
import { CaseStudyService } from '../services/case-study.service';
import { ToastrCode } from '@core';

@Component({
  selector: 'app-create-use-case',
  templateUrl: './create-use-case.component.html',
  styleUrls: ['./create-use-case.component.css']
})
export class CreateUseCaseComponent implements OnInit {
  private usecaseDetails: any;
  private findedData: any;
  public modelName: string;
  public modelDesc: string;
  public dynamicFieldKey: string;
  public dynamicFieldValue: string;
  public dynamicFieldData: any;
  workflowData: any = '';
  constructor(private _caseStudyService: CaseStudyService, private router: Router, private toastService: ToastrService) { }

  ngOnInit(): void {
    let usecaseID = window.localStorage.getItem("usecaseID");
    this._caseStudyService.getAllUseCases().subscribe(resp => {
      this.usecaseDetails = resp.records;
      console.log("resp.records",resp.records)
      this.findedData = this.usecaseDetails.find(i => i._id === usecaseID);
      this.modelName = this.findedData.model_name;
      this.modelDesc = this.findedData.model_description;
      this.dynamicFieldData = this.findedData.dynamic_fields;
      if (typeof this.findedData === 'undefined') {
        return null;
      }
      return this.findedData;
    });
  }

  runYourWorkflow() {
    this.dynamicFieldData = this.findedData.dynamic_fields;

    //Converting array of Obj to Required Input
    var dataObj: any;
    for (var i = 0; i < this.dynamicFieldData.length; i++) {
      dataObj = {
        "textFieldKey": this.dynamicFieldData[i].textFieldKey,
        "textFieldValue": this.dynamicFieldData[i].textFieldValue
      };
    }
    console.log(this.dynamicFieldData);
    const reqObj = {
      'text'  : dataObj.textFieldValue
    };
    this._caseStudyService.createRunWorkflow(reqObj)
      .subscribe(
        (successResponse) => {
          const respData = successResponse;
          this.workflowData =  JSON.stringify(respData);
          this.toastService.showSuccess(ToastrCode.FlowRunSuccess);
        },
        (errorResponse) => {
          console.log('ERROR', errorResponse);
        });
  }

}
