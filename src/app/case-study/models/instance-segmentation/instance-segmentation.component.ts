import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from '@core/services';
import { CaseStudyService } from '../../services/case-study.service';
import { ToastrCode, SpinnerService } from '@core';
import { DOCUMENT } from '@angular/common';
import { DesignWorkflowService } from '../../services/design-workflow.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-instance-segmentation',
  templateUrl: './instance-segmentation.component.html',
  styleUrls: ['./instance-segmentation.component.css']
})
export class InstanceSegmentationComponent implements OnInit {
  constructor(private _caseStudyService: CaseStudyService, private router: Router, private toastService: ToastrService, private spinner: SpinnerService, private formBuilder: FormBuilder,private designWorkflowService: DesignWorkflowService,private domSanitizer: DomSanitizer) { }
  
  workflowForm: FormGroup;
  Output_result:any
  spinnerActive = false;
  fileToUpload: File = null;
  termFileLabel= 'choose file....'
  singleModel_isSuccess= false;
  doubleModel_isSuccess = false
  trainTrackerIdLength:any

   // ----------------------------------------------------------------------------------------------
  // Private Variables
  // ----------------------------------------------------------------------------------------------
  private fileObj: any;

  // ----------------------------------------------------------------------------------------------
  // Public Variables
  // ----------------------------------------------------------------------------------------------
  public errMessage: any;
  public isErrorAvailable = false;
  public spinneractive = false;
  public result = {};
  public status = null;
 

  ngOnInit(): void {
    this.workflowForm = this.formBuilder.group({
      file: '',
      
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
  
   this.spinnerActive = this.spinner.start();
   this._caseStudyService.runWorkflow(formData)
     .subscribe(
      (res: any) => {
        if (this.trainTrackerIdLength <= 1) {
            if (res.status === 'Success' && res.response.status !== 'fail') {
              this.result = res.response;
              this.status = res.status;
              this.singleModel_isSuccess = true;
              console.log(this.result)
              this.spinneractive = this.spinner.stop();
            } else {
              this.result = {};
              this.status = res.response.status;
              this.isErrorAvailable = true;
              this.errMessage = 'Server Error, Please contact system administrator';
              this.singleModel_isSuccess = false;
              this.spinneractive = this.spinner.stop();
            }
          } else {
            this.secondFlow(res.response)
          }
       
        

      },
        error => {
          this.singleModel_isSuccess = false;
          console.log(error)
          this.status = 'Fail';
          this.isErrorAvailable = true;
          this.errMessage = 'Server Error, Please contact system administrator';
          this.spinneractive = this.spinner.stop();
        });
   
}

// Get the values from the object
getReceiptUrls(resultObj) {
  return Object.values(resultObj);
}

getUrlForPreviewImage(url: string) {
 // Create url for displaying the image preview.
 // Add hardcoded part 'data:image/png;base64,' to tell 'img' tag, that it is the url of base64 image type.
 const newUrl = 'data:image/png;base64,' + url.substring(0, url.length - 1).replace('b\'', '') ;
 return this.domSanitizer.bypassSecurityTrustUrl(newUrl);
}

private initializeState() {
 this.result = {};
 this.status = null;
 this.isErrorAvailable = false;
 this.errMessage =  null;
 this.singleModel_isSuccess = false;
}


//*********************************** */ for two traintrackerId*****************
  // *************************************************************************************//*
 //  second flow 
 secondFlow(firstflowResponse) {
  const formData_new = new FormData();
  var secondTrainTrackerId = localStorage.getItem('SecondModelTrainTrackerId')
  formData_new.append('trainingTracker_id', secondTrainTrackerId);
  formData_new.append('file', '');
  formData_new.append('input', firstflowResponse);

    formData_new.forEach((value,key) => {
   console.log("formdata_second model",key+" "+value)
   });


  this._caseStudyService.runWorkflow(formData_new)
 .subscribe(
   (successResponse) => {
     console.log('successResponse',successResponse)
     this.doubleModel_isSuccess = true
     this.result = successResponse.response.result
     console.log('this.result',this.result)
     this.toastService.showSuccess(ToastrCode.FlowRunSuccess);
     this.spinnerActive = this.spinner.stop()
   },
   (errorResponse) => {
    //  this.toastService.showError('Something went wrong');
     console.log('ERROR', errorResponse);
     this.isErrorAvailable = true;
      this.errMessage = 'Server Error, Please contact system administrator';
     this.spinnerActive = this.spinner.stop()

   });
}




}
