import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from '@core/services';
import { CaseStudyService } from '../../services/case-study.service';
import { ToastrCode, SpinnerService } from '@core';
import { DOCUMENT } from '@angular/common';
import { DesignWorkflowService } from '../../services/design-workflow.service';

@Component({
  selector: 'app-ner',
  templateUrl: './ner.component.html',
  styleUrls: ['./ner.component.css']
})
export class NERComponent implements OnInit {
  constructor(private _caseStudyService: CaseStudyService, private router: Router, private toastService: ToastrService, private spinner: SpinnerService, private formBuilder: FormBuilder, private designWorkflowService: DesignWorkflowService) { }
  workflowForm: FormGroup;
  Output_result: any
  spinnerActive = false;
  result;
  status;
  isSuccess = false;
  isErrorAvailable = false;
  errMessage: any
  doubleModel_isSuccess: any;
  trainTrackerIdLength: any;

  ngOnInit(): void {

    this.workflowForm = this.formBuilder.group({
      query: '',
    })
    // get train trackerId length
    this.trainTrackerIdLength = localStorage.getItem('trainTrackerIdLength')
  }


  runYourWorkflow() {
    const formData = new FormData();
    var firstTrainTrackerId = localStorage.getItem('FirstModelTrainTrackerId')
    formData.append('trainingTracker_id', firstTrainTrackerId);
    formData.append('query', this.workflowForm.value.query);

    this.spinnerActive = this.spinner.start();
    this._caseStudyService.runWorkflow(formData)
      .subscribe(
        (data) => {

          if (this.trainTrackerIdLength <= 1) {
            this.spinnerActive = this.spinner.stop();
            if (data.status) {
              this.result = data.response;
              this.status = true;
              this.isSuccess = true;
            } else {
              this.result = data.message;
              this.status = true;
              this.isSuccess = false;
              this.errMessage = 'Server Error, Please contact system administrator';
              this.isErrorAvailable = true;
            }
          } else {
            this.errMessage = data.response.error;
            this.spinnerActive = this.spinner.stop()
            this.secondFlow(data.response)
          }
        },
        (errorResponse) => {
          this.errMessage = 'Server Error, Please contact system administrator';
          this.isErrorAvailable = true;
          console.log('ERROR', errorResponse);
          this.spinnerActive = this.spinner.stop()

        });

  }
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