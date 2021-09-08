import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from '@core/services';
import { CaseStudyService } from '../../services/case-study.service';
import { ToastrCode, SpinnerService } from '@core';
import { DOCUMENT } from '@angular/common';
import { DesignWorkflowService } from '../../services/design-workflow.service';

@Component({
  selector: 'app-product-categorization',
  templateUrl: './product-categorization.component.html',
  styleUrls: ['./product-categorization.component.css']
})
export class ProductCategorizationComponent implements OnInit {
  constructor(private _caseStudyService: CaseStudyService, private router: Router, private toastService: ToastrService, private spinner: SpinnerService, private formBuilder: FormBuilder,private designWorkflowService: DesignWorkflowService) { }
  
  workflowForm: FormGroup;
  Output_result:any
  spinnerActive = false;
  fileToUpload: File = null;
  termFileLabel= 'choose file....'
  isSuccess: any;
  isErrorAvailable: any;
  errMessage: any;
  doubleModel_isSuccess:any;
  trainTrackerIdLength: any;


  ngOnInit(): void {
    this.workflowForm = this.formBuilder.group({
      file: '',
      col_name : '',
      desc : ''
    })
    // get train trackerId length
    this.trainTrackerIdLength = localStorage.getItem('trainTrackerIdLength')
  }

   // upload file 
   uploadFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload )
    this.termFileLabel = this.fileToUpload.name
}

runYourWorkflow() {
  const formData = new FormData();
  var firstTrainTrackerId = localStorage.getItem('FirstModelTrainTrackerId')
   formData.append('trainingTracker_id', firstTrainTrackerId);
   formData.append('file', this.fileToUpload);
   formData.append('col_name',this.workflowForm.value.col_name);
   formData.append('desc',this.workflowForm.value.desc);

   this.spinnerActive = this.spinner.start();
   this._caseStudyService.runWorkflow(formData)
     .subscribe(
       (successResponse) => {

        if (this.trainTrackerIdLength <= 1) {
         console.log('successResponse', successResponse)
          if(successResponse.response.status == 'Success'){
              this.Output_result = successResponse.response.result;
              this.isSuccess = true;
          }
          else{
              this.Output_result = successResponse.response.message;
              this.isSuccess = false;
          }
         
         this.isErrorAvailable = false;
         this.spinnerActive = this.spinner.stop()
        }else{
          this.errMessage = successResponse.response.error;
          this.spinnerActive = this.spinner.stop()
          this.secondFlow(successResponse.response)
        }
       },
       (errorResponse) => {
         this.toastService.showError('Something went wrong');
         console.log('ERROR', errorResponse);
         this.errMessage = 'Server Error, Please contact system administrator';
         this.isErrorAvailable = true;
         this.isSuccess = false;
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
