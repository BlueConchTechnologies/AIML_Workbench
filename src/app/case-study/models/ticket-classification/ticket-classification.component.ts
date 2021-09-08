/*import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from '@core/services';
import { CaseStudyService } from '../../services/case-study.service';
import { ToastrCode, SpinnerService } from '@core';
import { DOCUMENT } from '@angular/common';
import { DesignWorkflowService } from '../../services/design-workflow.service';

@Component({
  selector: 'app-ticket-classification',
  templateUrl: './ticket-classification.component.html',
  styleUrls: ['./ticket-classification.component.css']
})
export class TicketClassificationComponent implements OnInit {

  constructor(private _caseStudyService: CaseStudyService, private router: Router, private toastService: ToastrService, private spinner: SpinnerService, private formBuilder: FormBuilder, private designWorkflowService: DesignWorkflowService) { }

  workflowForm: FormGroup;
  Output_result: any
  spinnerActive = false;
  isSuccess: any;
  isErrorAvailable: any;
  errMessage:any

  ngOnInit(): void {
    this.workflowForm = this.formBuilder.group({
      question: '',
      org: 'AIRTEL',
      top_n: '2'
    })
  }

  runYourWorkflow() {
    const formData = new FormData();
    var firstTrainTrackerId = localStorage.getItem('FirstModelTrainTrackerId')
    formData.append('trainingTracker_id', firstTrainTrackerId);
    formData.append('question', this.workflowForm.value.question);
    formData.append('org', this.workflowForm.value.org);
    formData.append('top_n', this.workflowForm.value.top_n);

    console.log("flow 8 works")
    formData.forEach((value, key) => {
      console.log("formdata_new", key + " " + value)
    });

    this.spinnerActive = this.spinner.start();
    this._caseStudyService.runWorkflow(formData)
      .subscribe(
        (successResponse) => {
          this.spinnerActive = this.spinner.stop()
          console.log('successResponse', successResponse)
          this.Output_result = successResponse.response
          this.isSuccess = true
          this.isErrorAvailable = false;  


        },
        (errorResponse) => {
          console.log('ERROR', errorResponse);
          this.errMessage = 'Server Error, Please contact system administrator';
          this.isErrorAvailable = true;     
          this.isSuccess = false    
          this.spinnerActive = this.spinner.stop()

        });

  }
}
*/
//-----------------------------------------------------------------------------------------

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from '@core/services';
import { CaseStudyService } from '../../services/case-study.service';
import { ToastrCode, SpinnerService } from '@core';
import { DOCUMENT } from '@angular/common';
import { DesignWorkflowService } from '../../services/design-workflow.service';

@Component({
  selector: 'app-ticket-classification',
  templateUrl: './ticket-classification.component.html',
  styleUrls: ['./ticket-classification.component.css']
})
export class TicketClassificationComponent implements OnInit {

  constructor(private _caseStudyService: CaseStudyService, private router: Router, private toastService: ToastrService, private spinner: SpinnerService, private formBuilder: FormBuilder, private designWorkflowService: DesignWorkflowService) { }

  workflowForm: FormGroup;
  Output_result: any
  spinnerActive = false;
  isSuccess: any;
  isErrorAvailable: any;
  errMessage:any;
  doubleModel_isSuccess: any;

  ngOnInit(): void {
    this.workflowForm = this.formBuilder.group({
      question: ['', Validators.required],
      org: ['AIRTEL', Validators.required],
      top_n: ['3', Validators.required]
    })
  }

  runYourWorkflow() {
    const formData = new FormData();
    var firstTrainTrackerId = localStorage.getItem('FirstModelTrainTrackerId')
    formData.append('trainingTracker_id', firstTrainTrackerId);
    formData.append('question', this.workflowForm.value.question);
    formData.append('org', this.workflowForm.value.org);
    formData.append('top_n', this.workflowForm.value.top_n);

    console.log("flow 8 works")
    formData.forEach((value, key) => {
      console.log("formdata_new", key + " " + value)
    });

    this.spinnerActive = this.spinner.start();
    this._caseStudyService.runWorkflow(formData)
      .subscribe(
        (successResponse) => {
          this.spinnerActive = this.spinner.stop()
          console.log('successResponse', successResponse)
          this.Output_result = successResponse.response
          this.isSuccess = true
          this.isErrorAvailable = false;  


        },
        (errorResponse) => {
          console.log('ERROR', errorResponse);
          this.errMessage = 'Server Error, Please contact system administrator';
          this.isErrorAvailable = true;     
          this.isSuccess = false    
          this.spinnerActive = this.spinner.stop()

        });

  }

   //  second flow 
 
 secondFlow(firstflowResponse) {
  const formData_new = new FormData();
  var secondTrainTrackerId = localStorage.getItem('SecondModelTrainTrackerId')
   formData_new.append('trainingTracker_id', secondTrainTrackerId);
   formData_new.append('text', firstflowResponse);

    formData_new.forEach((value,key) => {
   console.log("formdata_second model",key+" "+value)
   });


  this._caseStudyService.runWorkflow(formData_new)
 .subscribe(
   (successResponse) => {
     console.log('successResponse',successResponse)
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


