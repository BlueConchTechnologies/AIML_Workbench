import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from '@core/services';
import { CaseStudyService } from '../../services/case-study.service';
import { ToastrCode, SpinnerService } from '@core';
import { DOCUMENT } from '@angular/common';
import { DesignWorkflowService } from '../../services/design-workflow.service';

@Component({
  selector: 'app-face-recognotion',
  templateUrl: './face-recognotion.component.html',
  styleUrls: ['./face-recognotion.component.css']
})
export class FaceRecognotionComponent implements OnInit {
  constructor(private _caseStudyService: CaseStudyService, private router: Router, private toastService: ToastrService, private spinner: SpinnerService, private formBuilder: FormBuilder,private designWorkflowService: DesignWorkflowService) { }
  workflowForm: FormGroup;
  Output_result:any
  spinnerActive = false;
  fileToUpload: File = null;
  imageUrl:any;
  videoUrl:any;
  domSanitizer:any;

  public errMessage: any;
  public isSuccess = false;
  public isErrorAvailable = false;
  termFileLabel= 'choose file....'

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
   formData.forEach((value,key) => {
    console.log("formdata_new",key+" "+value)
     }); 
   this.spinnerActive = this.spinner.start();
   this._caseStudyService.runWorkflow_imageFormatOutput(formData)
     .subscribe(
       (res:any) => {
         this.spinnerActive = this.spinner.stop();
         console.log("get response******************************")
         if (res && ['image/jpg', 'image/png', 'image/jpeg', 'image/mp4'].includes(res.type)) {
           console.log("if******************************")
           const reader = new FileReader();
           reader.readAsDataURL(res);
           reader.onload = () => {
             // base 64 string
             this.imageUrl = reader.result;
             console.log('this.imageUrl',this.imageUrl)
             this.Output_result = this.imageUrl 
             if (res.type === 'image/mp4') {
               const newUrl = 'data:video' + this.imageUrl.split('data:image')[1];
               this.videoUrl = this.domSanitizer.bypassSecurityTrustUrl(newUrl);
               console.log('this.videoUrl',this.videoUrl)
               this.Output_result = this.videoUrl
             }
 
           }
           this.isSuccess = true;
         }
          else {
            this.isErrorAvailable = true;
          this.errMessage = 'Error occurred while processing File...!';
         }
       
       },
       (errorResponse) => {
         this.toastService.showError('Something went wrong');
         console.log('ERROR', errorResponse);
         this.spinnerActive = this.spinner.stop()

       });
  
   
}

}

