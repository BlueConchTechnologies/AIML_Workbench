import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from '@core/services';
import { CaseStudyService } from '../../services/case-study.service';
import { ToastrCode, SpinnerService } from '@core';
import { DOCUMENT } from '@angular/common';
import { DesignWorkflowService } from '../../services/design-workflow.service';
@Component({
  selector: 'app-speaker-diarization',
  templateUrl: './speaker-diarization.component.html',
  styleUrls: ['./speaker-diarization.component.css']
})
export class SpeakerDiarizationComponent implements OnInit {
  constructor(private _caseStudyService: CaseStudyService, private router: Router, private toastService: ToastrService, private spinner: SpinnerService, private formBuilder: FormBuilder,private designWorkflowService: DesignWorkflowService) { }
  
  workflowForm: FormGroup;
  Output_result:any
  spinnerActive = false;
  fileToUpload: File = null;
  termFileLabel= 'choose file....'
  public isSuccess = false;
  public isErrorAvailable = false;
  public spinneractive = false;
  public result = [];
  public times = [];
  public speakers = [];
  public levels = [];
  public speaker = [];
  public status = null;
  public fileLabel: string;
  public errMessage: any;
  termFileString: any;
  errorMessage: string;

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
        if (res.status === 'Success' && res.response.status !== 'fail') {
          this.result = res.response.result;
          for (let res of this.result) {
            Object.keys(res).forEach(key => {
              this.times.push(key);
            });
            Object.values(res).forEach(value => {
              this.speakers.push(value);
            });
          }
          for (let sp of this.speakers) {
            if (sp) {
              this.speaker.push(sp.split(' ', 1));
              this.levels.push(sp.replace(/[\(\)']+/g, '').split(' ').slice(-1).join(' '));
            } 
          }
          for (var i = 0; i < this.speaker.length && this.levels.length ; i++) {
            if (this.speaker[i] == "Unknown/No"){
              this.speaker[i] =  "No speaker"
            
            }
            if (this.levels[i] == "speaker"){
              this.levels[i] =  "Unknown"
            
            }
          }
          this.status = res.status;
          this.isSuccess = true;
          this.spinnerActive = this.spinner.stop();
        } else {
          this.result = [];
          this.status = res.response.status;
          this.isErrorAvailable = true;
          this.errMessage = res.response.Message;
          this.isSuccess = false;
          this.spinnerActive = this.spinner.stop();
        }
      },
        error => {
          this.isSuccess = false;
          this.isErrorAvailable = true;
          this.errMessage = error;
          this.spinnerActive = this.spinner.stop();

        });
   
}
}
