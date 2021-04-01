import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from '@core/services';
import { CaseStudyService } from '../../services/case-study.service';
import { ToastrCode, SpinnerService } from '@core';
import { DOCUMENT } from '@angular/common';
import { DesignWorkflowService } from '../../services/design-workflow.service';

@Component({
  selector: 'app-invoice-extraction',
  templateUrl: './invoice-extraction.component.html',
  styleUrls: ['./invoice-extraction.component.css']
})
export class InvoiceExtractionComponent implements OnInit {
  constructor(private _caseStudyService: CaseStudyService, private router: Router, private toastService: ToastrService, private spinner: SpinnerService, private formBuilder: FormBuilder,private designWorkflowService: DesignWorkflowService) { }
  
  workflowForm: FormGroup;
  Output_result:any
  spinnerActive = false;
  fileToUpload: File = null;

  ngOnInit(): void {
    this.workflowForm = this.formBuilder.group({
      file: '',
      input : ''
    })
  }

   // upload file 
   uploadFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload )
}

runYourWorkflow() {
  const formData = new FormData();
  var firstTrainTrackerId = localStorage.getItem('FirstModelTrainTrackerId')
   formData.append('trainingTracker_id', firstTrainTrackerId);
   formData.append('file', this.fileToUpload);
   formData.append('input', '');

   this.spinnerActive = this.spinner.start();
   this._caseStudyService.runWorkflow(formData)
     .subscribe(
       (successResponse) => {
         console.log('successResponse', successResponse)
         this.Output_result = successResponse.response.result

       
       },
       (errorResponse) => {
         this.toastService.showError('Something went wrong');
         console.log('ERROR', errorResponse);
         this.spinnerActive = this.spinner.stop()

       });
   
}


}
