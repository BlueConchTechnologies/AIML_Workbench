import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from '@core/services';
import { CaseStudyService } from '../../services/case-study.service';
import { ToastrCode, SpinnerService } from '@core';
import { DOCUMENT } from '@angular/common';
import { DesignWorkflowService } from '../../services/design-workflow.service';
@Component({
  selector: 'app-text-summarization',
  templateUrl: './text-summarization.component.html',
  styleUrls: ['./text-summarization.component.css']
})
export class TextSummarizationComponent implements OnInit {

  constructor(private _caseStudyService: CaseStudyService, private router: Router, private toastService: ToastrService, private spinner: SpinnerService, private formBuilder: FormBuilder, private designWorkflowService: DesignWorkflowService) { }
  workflowForm: FormGroup;
  Output_result: any
  spinnerActive = false;
  resultShow = false;
  resultSummary: any;
  isResultAvailable = false;
  isErrorAvailable = false;
  errMessage = '';
  doubleModel_isSuccess: any;
  fileExtension: any;
  fileExtensionError: boolean = false;
  fileExtensionMessage: any;
  trainTrackerIdLength:any;

  ngOnInit(): void {

    this.workflowForm = this.formBuilder.group({
      text: '',
      ratio: '',
      type_of_summary: ''
    })

  }

  runYourWorkflow() {
    const formData = new FormData();
    var firstTrainTrackerId = localStorage.getItem('FirstModelTrainTrackerId')
    formData.append('trainingTracker_id', firstTrainTrackerId);
    formData.append('text', this.workflowForm.value.text);
    formData.append('ratio', this.workflowForm.value.ratio);
    formData.append('type_of_summary', this.workflowForm.value.type_of_summary);

    this.spinnerActive = this.spinner.start();
    this._caseStudyService.runWorkflow(formData)
      .subscribe(
        (data: any) => {

          console.log("successResponse********************", data)
          if (this.trainTrackerIdLength <= 1) {
            console.log('successResponse', data)
            console.log(data.response.status);

            if (data.response.summary) {
              this.spinnerActive = this.spinner.stop();
              this.resultShow = true;
              this.resultSummary = data.response.summary;
              this.isResultAvailable = true;
              this.isErrorAvailable = false;
            } else {
              this.spinnerActive = this.spinner.stop();
              this.resultShow = true;
              this.resultSummary = data.response.message;
            }
            console.log("result", data)

          } else {
            console.log(this.Output_result);
            console.log(data.response.error);
            this.fileExtensionMessage = data.response.error;
            this.spinnerActive = this.spinner.stop()
            this.secondFlow(data.response)
          }
        },
         (errorResponse) => {
          this.errMessage = 'Server Error, Please contact system administrator';
          this.isErrorAvailable = true;
          this.isResultAvailable = false;
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
