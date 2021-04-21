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

  constructor(private _caseStudyService: CaseStudyService, private router: Router, private toastService: ToastrService, private spinner: SpinnerService, private formBuilder: FormBuilder,private designWorkflowService: DesignWorkflowService) { }
  workflowForm: FormGroup;
  Output_result:any
  spinnerActive = false;
  resultShow = false;
  resultSummary: any;
  isResultAvailable = false;
  isErrorAvailable = false;
  errMessage = '';

  ngOnInit(): void {

    this.workflowForm = this.formBuilder.group({
      text: '',
      ratio:'',
      type_of_summary:''
    })

  }

  runYourWorkflow() {
    const formData = new FormData();
    var firstTrainTrackerId = localStorage.getItem('FirstModelTrainTrackerId')
    formData.append('trainingTracker_id', firstTrainTrackerId);
   formData.append('text',this.workflowForm.value.text);
   formData.append('ratio',this.workflowForm.value.ratio);
   formData.append('type_of_summary',this.workflowForm.value.type_of_summary);
  
     this.spinnerActive = this.spinner.start();
     this._caseStudyService.runWorkflow(formData)
       .subscribe(
         (data: any) => {
          if (data.response.summary) {
            this.spinnerActive = this.spinner.stop();
            this.resultShow = true;
            this.resultSummary = data.response.summary;
            this.isResultAvailable = true;
            this.isErrorAvailable = false;
            

          } else {
            this.spinnerActive = this.spinner.stop();
            this.resultShow = true;
            this.resultSummary = data.message;
          }
          console.log("result",data)
         
         },
         (errorResponse) => {
          this.errMessage = 'Server Error, Please contact system administrator';
          this.isErrorAvailable = true;   
          this.isResultAvailable = false;       
           console.log('ERROR', errorResponse);
           this.spinnerActive = this.spinner.stop()
  
         });
     
  }

}
