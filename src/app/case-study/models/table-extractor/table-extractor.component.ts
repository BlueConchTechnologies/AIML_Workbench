import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from '@core/services';
import { CaseStudyService } from '../../services/case-study.service';
import { ToastrCode, SpinnerService } from '@core';
import { DOCUMENT } from '@angular/common';
import { DesignWorkflowService } from '../../services/design-workflow.service';
@Component({
  selector: 'app-table-extractor',
  templateUrl: './table-extractor.component.html',
  styleUrls: ['./table-extractor.component.css']
})
export class TableExtractorComponent implements OnInit {

  constructor(private _caseStudyService: CaseStudyService, private router: Router, private toastService: ToastrService, private spinner: SpinnerService, private formBuilder: FormBuilder, private designWorkflowService: DesignWorkflowService) { }

  workflowForm: FormGroup;
  result: any
  spinnerActive = false;
  fileToUpload: File = null;
  display_result = false
  firstTab = 0;
  termFileString: any;
  termFileLabel = 'choose file....'
  errorMessage: string;
  termExtractorData: any = [];
  isResultAvailable = false;
  isErrorAvailable = false;
  errMessage = '';
  Output_result: any
  doubleModel_isSuccess: any;
  trainTrackerIdLength: any;
  selectedIndex: number = null;
  fileExtensionMessage: any;

  ngOnInit(): void {

    this.workflowForm = this.formBuilder.group({
      file: '',
    })
    this.termFileLabel = 'Path To Directory';
    // get train trackerId length
    this.trainTrackerIdLength = localStorage.getItem('trainTrackerIdLength')
  }

  // upload file 
  uploadFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.termFileLabel = this.fileToUpload.name
    console.log(this.fileToUpload)
  }

  runYourWorkflow() {
    const formData = new FormData();
    var firstTrainTrackerId = localStorage.getItem('FirstModelTrainTrackerId')
    formData.append('trainingTracker_id', firstTrainTrackerId);
    formData.append('file', this.fileToUpload);

    this.spinnerActive = this.spinner.start();
    this._caseStudyService.runWorkflow(formData)
      .subscribe(
        (response) => {
          if (this.trainTrackerIdLength <= 1) {

            if (response) {
              this.result = response.response;

              this.termFileString = undefined;
              this.termFileLabel = 'Path To Directory';
              this.isResultAvailable = true;
              this.isErrorAvailable = false;


            } else {
              this.isResultAvailable = false;
              this.errMessage = 'Server Error, Please contact system administrator';
              this.isErrorAvailable = true;
            }
          } else {
            console.log(this.Output_result);
            console.log(response.response.error);
            this.fileExtensionMessage = response.response.error;
            this.spinnerActive = this.spinner.stop()
            this.secondFlow(response.response)
          }
          this.spinnerActive = this.spinner.stop();

        },
        (errorResponse) => {
          this.errMessage = 'Server Error, Please contact system administrator';
          this.isResultAvailable = false;
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
