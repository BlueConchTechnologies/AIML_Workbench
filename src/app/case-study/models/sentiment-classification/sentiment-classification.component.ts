import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from '@core/services';
import { CaseStudyService } from '../../services/case-study.service';
import { ToastrCode, SpinnerService } from '@core';
import { DOCUMENT } from '@angular/common';
import { DesignWorkflowService } from '../../services/design-workflow.service';
@Component({
  selector: 'app-sentiment-classification',
  templateUrl: './sentiment-classification.component.html',
  styleUrls: ['./sentiment-classification.component.css']
})
export class SentimentClassificationComponent implements OnInit {

  constructor(private _caseStudyService: CaseStudyService, private router: Router, private toastService: ToastrService, private spinner: SpinnerService, private formBuilder: FormBuilder, private designWorkflowService: DesignWorkflowService) { }
  workflowForm: FormGroup;
  Output_result: any
  spinnerActive = false;
  inputText;
  isSuccess;
  prediction;
  message;
  status;
  formData = new FormData();
  displayStatus = false;
  errMessage: string;
  isErrorAvailable: boolean;
  doubleModel_isSuccess: any;
  trainTrackerIdLength: any;
  selectedIndex: number = null;
  fileExtensionMessage: any;

  ngOnInit(): void {

    this.workflowForm = this.formBuilder.group({
      input_text: '',
    })
  }

  runYourWorkflow() {
    const formData = new FormData();
    var firstTrainTrackerId = localStorage.getItem('FirstModelTrainTrackerId')
    formData.append('trainingTracker_id', firstTrainTrackerId);
    formData.append('input_text', this.workflowForm.value.input_text);

    this.spinnerActive = this.spinner.start();
    this._caseStudyService.runWorkflow(formData)
      .subscribe(
        (data) => {
          if (this.trainTrackerIdLength <= 1) {

            if (data) {
              this.spinnerActive = this.spinner.stop();
              if (data.response.Prediction) {
                this.inputText = data.response.InputText;
                this.prediction = data.response.Prediction;
                this.displayStatus = true;
                this.isErrorAvailable = false;
              } else {
                this.inputText = data.message;
                this.prediction = data.status;
                this.displayStatus = true;
                this.isErrorAvailable = false;
              }
            }
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
          this.displayStatus = false;
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
