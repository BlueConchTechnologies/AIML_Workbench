import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from '@core/services';
import { CaseStudyService } from '../../services/case-study.service';
import { ToastrCode, SpinnerService } from '@core';
import { DOCUMENT } from '@angular/common';
import { DesignWorkflowService } from '../../services/design-workflow.service';

@Component({
  selector: 'app-duplicate-prediction',
  templateUrl: './duplicate-prediction.component.html',
  styleUrls: ['./duplicate-prediction.component.css']
})
export class DuplicatePredictionComponent implements OnInit {

  constructor(private _caseStudyService: CaseStudyService, private router: Router, private toastService: ToastrService, private spinner: SpinnerService, private formBuilder: FormBuilder,private designWorkflowService: DesignWorkflowService) { }
  workflowForm: FormGroup;
  Output_result:any
  spinnerActive = false;
  isSuccess= false;
  isErrorAvailable = false;
  errMessage :any

  ngOnInit(): void {

    this.workflowForm = this.formBuilder.group({
      query:'',
      org: 'xpanxion',
      threshold : '70'
    })

  }

  runYourWorkflow() {
    const formData = new FormData();
    var firstTrainTrackerId = localStorage.getItem('FirstModelTrainTrackerId')
     formData.append('trainingTracker_id', firstTrainTrackerId);
     formData.append('query', this.workflowForm.value.query);
   formData.append('org', this.workflowForm.value.org);
   formData.append('threshold', this.workflowForm.value.threshold);
    
     this.spinnerActive = this.spinner.start();
     this._caseStudyService.runWorkflow(formData)
       .subscribe(
         (successResponse) => {
           console.log('successResponse', successResponse)
           this.Output_result = successResponse.response
           this.isSuccess = true
           this.isErrorAvailable = false
           this.spinnerActive = this.spinner.stop()
         
         },
         (errorResponse) => {
          this.isSuccess = false
           console.log('ERROR', errorResponse);
           this.isErrorAvailable = true
           this.errMessage = 'Server Error, Please contact system administrator';
           this.spinnerActive = this.spinner.stop()
  
         });
     
  }
}
