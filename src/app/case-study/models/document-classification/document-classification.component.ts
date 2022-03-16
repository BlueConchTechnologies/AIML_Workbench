import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from '@core/services';
import { CaseStudyService } from '../../services/case-study.service';
import { ToastrCode, SpinnerService } from '@core';
import { DOCUMENT } from '@angular/common';
import { DesignWorkflowService } from '../../services/design-workflow.service';

@Component({
  selector: 'app-document-classification',
  templateUrl: './document-classification.component.html',
  styleUrls: ['./document-classification.component.css']
})
export class DocumentClassificationComponent implements OnInit {
  constructor(private _caseStudyService: CaseStudyService, private router: Router, private toastService: ToastrService, private spinner: SpinnerService, private formBuilder: FormBuilder, private designWorkflowService: DesignWorkflowService) { }
  workflowForm: FormGroup;
  Output_result: any
  spinnerActive = false;
  result;
  status;
  isSuccess: boolean;
  isErrorAvailable = false
  errMessage: any
  doubleModel_isSuccess: any;

  ngOnInit(): void {

    this.workflowForm = this.formBuilder.group({
      text: '',
    })
  }


  runYourWorkflow() {
    const formData = new FormData();
    var firstTrainTrackerId = localStorage.getItem('FirstModelTrainTrackerId')
    formData.append('trainingTracker_id', firstTrainTrackerId);
    formData.append('text', this.workflowForm.value.text);

    this.spinnerActive = this.spinner.start();
    this._caseStudyService.runWorkflow(formData)
      .subscribe(
        (data) => {
          this.spinnerActive = this.spinner.stop();
          if (data.status) {
            this.result = data.response.Result;
            this.status = true;
            this.isSuccess = true;
          } else {
            this.result = data.message;
            this.status = true;
            this.isSuccess = false;
            this.isErrorAvailable = true
            this.errMessage = 'Server Error, Please contact system administrator';
          }

        },
        (errorResponse) => {
          this.isSuccess = false;
          this.isErrorAvailable = true
          console.log('ERROR', errorResponse);
          this.spinnerActive = this.spinner.stop()
          this.errMessage = 'Server Error, Please contact system administrator';

        });

  }

  //  second flow 

  secondFlow(firstflowResponse) {
    const formData_new = new FormData();
    var secondTrainTrackerId = localStorage.getItem('SecondModelTrainTrackerId')
    formData_new.append('trainingTracker_id', secondTrainTrackerId);
    formData_new.append('text', firstflowResponse);

    formData_new.forEach((value, key) => {
      console.log("formdata_second model", key + " " + value)
    });


    this._caseStudyService.runWorkflow(formData_new)
      .subscribe(
        (successResponse) => {
          console.log('successResponse', successResponse)
          this.doubleModel_isSuccess = true
          this.isErrorAvailable = false;
          this.Output_result = successResponse.response.Result
          this.toastService.showSuccess(ToastrCode.FlowRunSuccess);
          this.spinnerActive = this.spinner.stop()
        },
        (errorResponse) => {
          this.toastService.showError(errorResponse.error.response);
          console.log('ERROR', errorResponse);
          this.doubleModel_isSuccess = false
          this.isErrorAvailable = true;
          //  this.errMessage = 'Server Error, Please contact system administrator';
          this.errMessage = errorResponse.error.response
          this.spinnerActive = this.spinner.stop()

        });
  }
}
