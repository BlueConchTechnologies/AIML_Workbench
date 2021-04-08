import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from '@core/services';
import { CaseStudyService } from '../../services/case-study.service';
import { ToastrCode, SpinnerService } from '@core';
import { DOCUMENT } from '@angular/common';
import { DesignWorkflowService } from '../../services/design-workflow.service';
@Component({
  selector: 'app-video-analytics',
  templateUrl: './video-analytics.component.html',
  styleUrls: ['./video-analytics.component.css']
})
export class VideoAnalyticsComponent implements OnInit {
  constructor(private videoAnalyticsService: CaseStudyService,
    private spinner: SpinnerService,
    private domSanitizer: DomSanitizer) { }
  // ----------------------------------------------------------------------------------------------
  // Private Variables
  // ----------------------------------------------------------------------------------------------
  private file: any;
  private fileObj: any;
  private formdata = new FormData();

  // ----------------------------------------------------------------------------------------------
  // Public Variables
  // ----------------------------------------------------------------------------------------------
  public fileName: string;
  public errMessage: any;
  public isSuccess = false;
  public isErrorAvailable = false;
  public spinnerActive = false;
  public result: any;
  public status = null;
  public url: any;
  public ext: string;
  termFileLabel= 'choose file....'

  ngOnInit(): void {
   
  }


onFileUpload(file) {
  this.initializeState();
  
   var firstTrainTrackerId = localStorage.getItem('FirstModelTrainTrackerId')
   this.formdata.append('trainingTracker_id', firstTrainTrackerId);
  this.formdata.append('file', file[0]);
  this.ext =  file[0].name.split('.').pop();
  this.termFileLabel = file[0].name
  
}

onClickProcessBtn() {
  this.spinnerActive = this.spinner.start();
  this.videoAnalyticsService.runWorkflow_imageFormatOutput(this.formdata).subscribe((res: any) => {
    this.spinnerActive = this.spinner.stop();
    if (res && ['jpg', 'jpeg', 'png', 'mp4','gif'].includes(this.ext.toLowerCase())) {
      const reader = new FileReader();
      reader.readAsDataURL(res);
      reader.onload = () => {
        // base 64 string
        this.result = reader.result;
        const newUrl = 'data:video' + this.result.split('data:image')[1];
        this.url = this.domSanitizer.bypassSecurityTrustUrl(newUrl);
      };
      this.isSuccess = true;
      this.status = 'Success';
    } else {
      this.isErrorAvailable = true;
      this.status = 'Fail';
      this.errMessage = res.message;
    }
  },
    error => {
      this.status = 'Fail';
      this.isSuccess = false;
      console.log(error)
      this.isErrorAvailable = true;
      this.errMessage = error;
      this.spinnerActive = this.spinner.stop();
    });
}

private initializeState() {
  this.result = {};
  this.status = null;
  this.isErrorAvailable = false;
  this.errMessage = null;
  this.isSuccess = false;
}

}
