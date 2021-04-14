import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from '@core/services';
import { CaseStudyService } from '../../services/case-study.service';
import { ToastrCode, SpinnerService } from '@core';
import { DOCUMENT } from '@angular/common';
import { DesignWorkflowService } from '../../services/design-workflow.service';

@Component({
  selector: 'app-ner',
  templateUrl: './ner.component.html',
  styleUrls: ['./ner.component.css']
})
export class NERComponent implements OnInit {
  constructor(private _caseStudyService: CaseStudyService, private router: Router, private toastService: ToastrService, private spinner: SpinnerService, private formBuilder: FormBuilder,private designWorkflowService: DesignWorkflowService) { }
  workflowForm: FormGroup;
  Output_result:any
  spinnerActive = false;
  result;
  status;
  isSuccess: boolean;

  ngOnInit(): void {

    this.workflowForm = this.formBuilder.group({
      query: '',
    })
  }


  runYourWorkflow() {
    const formData = new FormData();
    var firstTrainTrackerId = localStorage.getItem('FirstModelTrainTrackerId')
     formData.append('trainingTracker_id', firstTrainTrackerId);
     formData.append('query',this.workflowForm.value.query);
    
     this.spinnerActive = this.spinner.start();
     this._caseStudyService.runWorkflow(formData)
       .subscribe(
         (data) => {
          this.spinnerActive = this.spinner.stop();
          if (data.status) {
            this.result = data.response;
            this.status = true;
            this.isSuccess = true;
          } else {
            this.result = data.message;
            this.status = true;
            this.isSuccess = false;
          }
         
         },
         (errorResponse) => {
           this.toastService.showError('Something went wrong');
           console.log('ERROR', errorResponse);
           this.spinnerActive = this.spinner.stop()
  
         });
     
  }
}