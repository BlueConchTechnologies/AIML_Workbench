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

  constructor(private _caseStudyService: CaseStudyService, private router: Router, private toastService: ToastrService, private spinner: SpinnerService, private formBuilder: FormBuilder,private designWorkflowService: DesignWorkflowService) { }
  workflowForm: FormGroup;
  Output_result:any
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

  ngOnInit(): void {

    this.workflowForm = this.formBuilder.group({
      input_text: '',
    })
  }

  runYourWorkflow() {
    const formData = new FormData();
    var firstTrainTrackerId = localStorage.getItem('FirstModelTrainTrackerId')
     formData.append('trainingTracker_id', firstTrainTrackerId);
     formData.append('input_text',this.workflowForm.value.input_text);
  
     this.spinnerActive = this.spinner.start();
     this._caseStudyService.runWorkflow(formData)
       .subscribe(
         (data) => {
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
        
         },
         (errorResponse) => {

           this.errMessage = 'Server Error, Please contact system administrator';
          this.isErrorAvailable = true;
          this.displayStatus = false;
           console.log('ERROR', errorResponse);
           this.spinnerActive = this.spinner.stop()
  
         });
     
  }

}
