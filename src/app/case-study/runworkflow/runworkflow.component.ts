import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from '@core/services';
import { CaseStudyService } from '../services/case-study.service';
import { ToastrCode, SpinnerService } from '@core';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-runworkflow',
  templateUrl: './runworkflow.component.html',
  styleUrls: ['./runworkflow.component.css']
})
export class RunworkflowComponent implements OnInit {
  [x: string]: any;
  // workflow_name :any;
  constructor(private _caseStudyService: CaseStudyService, private router: Router, private toastService: ToastrService, private spinner: SpinnerService, private formBuilder: FormBuilder) { }
  workflow_data: any;
  Output_result: any;
  spinnerActive = false;
  element: HTMLElement;
  @ViewChild('textFieldInput', { static: false }) public textFieldInput: ElementRef;
  @ViewChild('textAreaInput', { static: false }) public textAreaInput: ElementRef;
  @ViewChild('fileBrowseInput', { static: false }) public fileBrowseInput: ElementRef;
  public modelName: string = '';
  public modelDescription: string = '';
  public usecaseform: any[] = [{
    id: 1,
    "textFieldKey": '',
    "textFieldValue": ''
  }];
  runWorkflowForm: FormGroup;
  trainedAndNontrainableModel: any
  ngOnInit(): void {
    this.workflow_data = JSON.parse(localStorage.getItem('workflow'));
    this.trainedAndNontrainableModel = JSON.parse(localStorage.getItem('trainedAndNontrainableModel'));
    console.log('workflow_data', this.workflow_data)

    //runWorkflowForm form validation
    this.runWorkflowForm = this.formBuilder.group({
      name: '',
      description: '',
      textField: '',
      textArea: '',
      fileBrowse: '',
    });

  }
  runYourWorkflow() {
    // ******* get traintrakerId
    var model_traintrakerId
    for (var i = 0; i < this.trainedAndNontrainableModel.length; i++) {
      if (this.trainedAndNontrainableModel[i].model_name == 'DocumentClassification') {
        model_traintrakerId = this.trainedAndNontrainableModel[i]._id
      }
    }

    // ***** get form data from runWorkflowForm
    var textField = this.runWorkflowForm.value.textField;
    var textArea = this.runWorkflowForm.value.textArea;
    var fileBrowse = this.runWorkflowForm.value.fileBrowse;
    console.log('this.runWorkflowForm.value',this.runWorkflowForm.value)

    // **** print from data values
    const formData = new FormData();
    if(textArea == '' && fileBrowse == '' ) {
      formData.append('trainingTracker_id', model_traintrakerId);
      formData.append('text', textField);
      this.runworkflowCallApi(formData)
    }
    else if (textField == '' && fileBrowse == '' ){
      formData.append('trainingTracker_id', model_traintrakerId);
      formData.append('text', textArea);
      this.runworkflowCallApi(formData)
    }
    else if (textField == '' && textArea == '' ) {
      formData.append('trainingTracker_id', model_traintrakerId);
      formData.append('file', fileBrowse);
      this.runworkflowCallApi(formData)
    } 
    else{
      this.toastService.showSuccess('Something went wrong');
    }
    
    // print form data value
    // formData.forEach((value,key) => {
    //   console.log("formdata",key+value)
    //    });
      

  
  }

  runworkflowCallApi(formData){
      
    this.spinnerActive = this.spinner.start();
    this._caseStudyService.runWorkflow(formData)
      .subscribe(
        (successResponse) => {
          const respData = successResponse;
          console.log('successResponse', successResponse)
          this.Output_result = successResponse
          this.toastService.showSuccess(ToastrCode.FlowRunSuccess);

          // patch the empty value to from control
          this.runWorkflowForm.patchValue({
            textField: '',
            textArea: '',
            fileBrowse: ''
          });


          this.spinnerActive = this.spinner.stop()
        },
        (errorResponse) => {
          console.log('ERROR', errorResponse);
        });
  }

 

  addTextField(event) {
    var idAttr = event.srcElement.attributes.id.value;
    if (idAttr == "textField") {
      this.textFieldInput.nativeElement.style.display = "inline";
    }
    if (idAttr == "textArea") {
      this.textAreaInput.nativeElement.style.display = "inline";
    }
    if (idAttr == "fileBrowse") {
      this.fileBrowseInput.nativeElement.style.display = "inline";
    }
  }

  removeField(lastName: HTMLInputElement) {
    // var idAttr = event.srcElement.id;

  }


}
