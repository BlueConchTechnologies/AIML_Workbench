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

   // ----------------------------------------------------------------------------------------------
  // Private Variables
  // ----------------------------------------------------------------------------------------------
  private fileObj: any;

  // ----------------------------------------------------------------------------------------------
  // Public Variables
  // ----------------------------------------------------------------------------------------------
  public errMessage: any;
  public isSuccess = false;
  public isErrorAvailable = false;
  public spinneractive = false;
  public result = {};
  public status = null;

  ngOnInit(): void {
    this.workflowForm = this.formBuilder.group({
      file: '',
      
    })
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
        this.spinneractive = this.spinner.stop();
        if (res.status === 'Success' && res.response.status !== 'fail') {
          this.result = res.response;
          this.status = res.status;
          this.isSuccess = true;
        } else {
          this.result = {};
          this.status = res.response.status;
          this.isErrorAvailable = true;
          this.errMessage = res.response.Message;
          this.isSuccess = false;
        }
      },
        error => {
          this.isSuccess = false;
          console.log(error)
          this.status = 'Fail';
          this.isErrorAvailable = true;
          this.errMessage = error;
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
 this.isSuccess = false;
}


}
