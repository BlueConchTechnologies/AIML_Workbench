import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from '@core/services';
import { CaseStudyService } from '../../services/case-study.service';
import { ToastrCode, SpinnerService } from '@core';
import { DOCUMENT } from '@angular/common';
import { DesignWorkflowService } from '../../services/design-workflow.service';

@Component({
  selector: 'app-terms-extraction',
  templateUrl: './terms-extraction.component.html',
  styleUrls: ['./terms-extraction.component.css']
})
export class TermsExtractionComponent implements OnInit {

  constructor(private _caseStudyService: CaseStudyService, private router: Router, private toastService: ToastrService, private spinner: SpinnerService, private formBuilder: FormBuilder,private designWorkflowService: DesignWorkflowService) { }
  
  termExtractorForm: FormGroup;
  termFileString: any;
  termFileLabel: string;
  errorMessage: string;
  termExtractorData: any = [];
  isResultAvailable = false;
  isErrorAvailable = false;
  spinnerActive = false;
  errMessage = '';
  headerData = [];
  headerValue = [];

  ngOnInit(): void {
    this.termFileLabel = 'Path To Directory';
    this.termExtractorForm = this.formBuilder.group({
      selectedFile: [''],
      termText: ['']
    });
    this.headerValue = [
      {
        key: 'addendum_no',
        value : 'Addendum No.'
      },
      {
        key: 'contract_value',
        value : 'contract Value'
      },
      {
        key: 'effective_date',
        value : 'Effective Date'
      },
      {
        key: 'end_date',
        value : 'End Date'
      },
      {
        key: 'first_party',
        value : 'First Party'
      },
      {
        key: 'msa_date',
        value : 'MSA Date'
      },
      {
        key: 'original_sow_end_date',
        value : 'SOW End Date'
      },
      {
        key: 'purpose',
        value : 'Purpose'
      },
      {
        key: 'revised_sow_end_date',
        value : 'Revised SOW End Date'
      },
      {
        key: 'second_party',
        value : 'Second Party'
      },
      {
        key: 'sow_date',
        value : 'SOW Date'
      },
    ];
  }

  

handleUpload(event) {
  this.termFileString = event.target.files[0];
  this.termFileLabel = event.target.files[0].name;
  this.errorMessage = undefined;
}

submit() {
  if (!this.termFileString) {
    this.errorMessage = 'Please Select File';
  } else {
    this.errorMessage = undefined;
    const formData = new FormData();
    // formData.append('user_id', 'dah');
    // formData.append('model_name', 'TermsExtraction');
    // formData.append('file', this.termFileString);
     var firstTrainTrackerId = localStorage.getItem('FirstModelTrainTrackerId')
    formData.append('trainingTracker_id', firstTrainTrackerId);
    formData.append('file', this.termFileString);
    this.spinnerActive = this.spinner.start();
    this.termExtractorData = [];
    this.headerData = [];
    this._caseStudyService.runWorkflow(formData).subscribe(
       (response: any) => {
        if (response.response.status === 'success') {
          this.termFileString = undefined;
          this.termFileLabel = 'Path To Directory';
          this.isResultAvailable = true;
          this.isErrorAvailable = false;
          const extractData = [];
          Object.keys(response.response).map(key => {
            if (key !== 'status') {
              extractData.push({ heading: key, entity: response.response[key]});
            }
            return extractData;
          });
          extractData.forEach(element => {
            if ( element.entity) {
              this.termExtractorData.push(element.entity);
              // tslint:disable-next-line: forin
              for (const key in element.entity) {
                this.headerData.push(key);
              }
            }
          });
        } else {
          this.isResultAvailable = false;
          this.isErrorAvailable = true;
          this.errMessage = response.response.message;
        }
        this.spinnerActive = this.spinner.stop();
      },
      (error) => {
        this.isResultAvailable = false;
        console.log(error)
        this.isErrorAvailable = true;
        this.errMessage = error;
        this.spinnerActive = this.spinner.stop();
      });
  }
}
getHeaderName(headerKey) {
  const headerValue = this.headerValue.filter(item => item.key === headerKey );
  return headerValue[0].value;
}

getTermValue(termData) {
  if ( termData === null || termData === '') {
    return 'None';
  } else {
    return termData;
  }
}



}
