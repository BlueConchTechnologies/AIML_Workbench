import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from '@core/services';
import { CaseStudyService } from '../../services/case-study.service';
import { ToastrCode, SpinnerService } from '@core';
import { DOCUMENT } from '@angular/common';
import { DesignWorkflowService } from '../../services/design-workflow.service';
@Component({
  selector: 'app-table-extractor',
  templateUrl: './table-extractor.component.html',
  styleUrls: ['./table-extractor.component.css']
})
export class TableExtractorComponent implements OnInit {

  constructor(private _caseStudyService: CaseStudyService, private router: Router, private toastService: ToastrService, private spinner: SpinnerService, private formBuilder: FormBuilder,private designWorkflowService: DesignWorkflowService) { }
  
  workflowForm: FormGroup;
  result:any
  spinnerActive = false;
  fileToUpload: File = null;
  display_result = false
  firstTab = 0;
  termFileString: any;
  termFileLabel= 'choose file....'
  errorMessage: string;
  termExtractorData: any = [];
  isResultAvailable = false;
  isErrorAvailable = false;
  errMessage = '';

  selectedIndex: number = null;
  ngOnInit(): void {
    
    this.workflowForm = this.formBuilder.group({
      file: '',
    })
    this.termFileLabel = 'Path To Directory';
  }

   // upload file 
   uploadFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.termFileLabel = this.fileToUpload.name
    console.log(this.fileToUpload )
}

runYourWorkflow() {
  const formData = new FormData();
  var firstTrainTrackerId = localStorage.getItem('FirstModelTrainTrackerId')
   formData.append('trainingTracker_id', firstTrainTrackerId);
   formData.append('file', this.fileToUpload);

   this.spinnerActive = this.spinner.start();
   this._caseStudyService.runWorkflow(formData)
     .subscribe(
       (response) => {
        if (response) {
          this.result = response.response;

          this.termFileString = undefined;
          this.termFileLabel = 'Path To Directory';
          this.isResultAvailable = true;
          this.isErrorAvailable = false;


        } else {
          this.isResultAvailable = false;
          this.isErrorAvailable = true;
          this.errMessage = response.response.message;
        }
        this.spinnerActive = this.spinner.stop();
       
       },
       (errorResponse) => {
         this.toastService.showError('Something went wrong');
         console.log('ERROR', errorResponse);
         this.spinnerActive = this.spinner.stop()

       });
   
}

}
