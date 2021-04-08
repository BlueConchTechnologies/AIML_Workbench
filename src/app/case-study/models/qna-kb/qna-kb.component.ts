import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from '@core/services';
import { CaseStudyService } from '../../services/case-study.service';
import { ToastrCode, SpinnerService } from '@core';
import { DOCUMENT } from '@angular/common';
import { DesignWorkflowService } from '../../services/design-workflow.service';

@Component({
  selector: 'app-qna-kb',
  templateUrl: './qna-kb.component.html',
  styleUrls: ['./qna-kb.component.css']
})
export class QNAKBComponent implements OnInit {

  constructor(private _caseStudyService: CaseStudyService, private router: Router, private toastService: ToastrService, private spinner: SpinnerService, private formBuilder: FormBuilder, private designWorkflowService: DesignWorkflowService) { }

  workflowForm: FormGroup;
  Output_result: any
  spinnerActive = false;
  resultStatus: string;
  result: any;
  resultSummary: any;
  inputQuestion: any;
  isResultAvailable: boolean;
  formdata = new FormData();
  summaryForm: FormGroup;
  spinneractive = false;
  errMessage: string;
  isErrorAvailable: boolean;


  ngOnInit(): void {
    this.workflowForm = this.formBuilder.group({
      question: '',
      kb_id: 'A1',
      top_n: '2'
    })
  }

  runYourWorkflow() {
    const formData = new FormData();
    var firstTrainTrackerId = localStorage.getItem('FirstModelTrainTrackerId')
    formData.append('trainingTracker_id', firstTrainTrackerId);
    formData.append('question', this.workflowForm.value.question);
    formData.append('kb_id', this.workflowForm.value.kb_id);
    formData.append('top_n', this.workflowForm.value.top_n);


    console.log("flow 7 works")
    formData.forEach((value, key) => {
      console.log("formdata_new", key + " " + value)
    });

    this.spinnerActive = this.spinner.start();
    this._caseStudyService.runWorkflow(formData)
      .subscribe(
        (response) => {
          this.result = response.response;
          this.isResultAvailable = true;
          this.spinnerActive = this.spinner.stop();

        },
        (error) => {
          console.log(error)
          this.isResultAvailable = false;
          this.isErrorAvailable = true;
          this.errMessage = error.message;
          this.spinnerActive = this.spinner.stop();

        });
  }

}
