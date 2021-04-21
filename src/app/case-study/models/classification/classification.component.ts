import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from '@core/services';
import { CaseStudyService } from '../../services/case-study.service';
import { ToastrCode, SpinnerService } from '@core';
import { DOCUMENT } from '@angular/common';
import { DesignWorkflowService } from '../../services/design-workflow.service';

@Component({
  selector: 'app-classification',
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.css']
})
export class ClassificationComponent implements OnInit {
  constructor(private _caseStudyService: CaseStudyService, private router: Router, private toastService: ToastrService, private spinner: SpinnerService, private formBuilder: FormBuilder,private designWorkflowService: DesignWorkflowService) { }
  // workflowForm: FormGroup;
  // Output_result:any
  // spinnerActive = false;
  // fileToUpload: File = null;
  headers = [];
  fileObj;
  inputFile;
  fileUploadBody;
  url;
  firstTab = 0;
  result = [];
  status;
  message;
  isSuccess: boolean;
  passageBody;
  spinneractive = false;
  errorMessage = '';
  errMessage = '';
  isResultAvailable = false;
  isErrorAvailable = false;
  classificationForm = this.formBuilder.group({
    colFormLabelSm: [''],
    upload: [''],
    passageId: [''],
  });
  formDataKeyArray = [];
  checkboxData:any

  // checkboxData: Array<any> = [
  //   { name: 'Decision Tree', value: 'DecisionTree', checked: true },
  //   { name: 'Logistic Regression', value: 'LogisticRegression', checked: true },
  //   { name: 'Neural Network', value: 'Neural_Network', checked: true },
  //   { name: 'Naive Bayes', value: 'Naive_Bayes', checked: true },
  //   { name: 'Bagging', value: 'bagging', checked: true },
  //   { name: 'Ada Boost', value: 'AdaBoostClassifier', checked: true },
  //   { name: 'Random Forest', value: 'Random_Forest', checked: true },
  //   { name: 'Stochastic Gradient Descent', value: 'Stochastic_Gradient_Descent', checked: true },
  //   { name: 'Support Vector Machine', value: 'Support_Vector_Machine', checked: true },
  // ];

  @ViewChild('fileId', { static: false }) fileId: ElementRef;


//   ngOnInit(): void {

//     this.workflowForm = this.formBuilder.group({
//       algorithmname: '',
//       file: ''
//     })
//   }

//   // upload file 
//   uploadFileInput(files: FileList) {
//     this.fileToUpload = files.item(0);
//     console.log(this.fileToUpload )
// }

//   runYourWorkflow() {
//     const formData = new FormData();
//     var firstTrainTrackerId = localStorage.getItem('FirstModelTrainTrackerId')
//      formData.append('trainingTracker_id', firstTrainTrackerId);
//      formData.append('algorithmname', this.workflowForm.value.algorithmname);
//     formData.append('file', this.fileToUpload);
    
//      this.spinnerActive = this.spinner.start();
//      this._caseStudyService.runWorkflow(formData)
//        .subscribe(
//          (successResponse) => {
//            console.log('successResponse', successResponse)
//            this.Output_result = successResponse
  
         
//          },
//          (errorResponse) => {
//            this.toastService.showError('Something went wrong');
//            console.log('ERROR', errorResponse);
//            this.spinnerActive = this.spinner.stop()
  
//          });
     
//   }
ngOnInit() {
  this.filterAlgorithumName ()
 }

filterAlgorithumName () {
  // this.checkboxData = [
  //   { name: 'Isolation Forest', value: 'Isolationforest', checked:false, isDisabled: true },
  // { name: 'Local Outlier Detection', value: 'Localoutlier', checked: false, isDisabled: true },
  // { name: 'Elliptic Envelope', value: 'EllipticEnvelope', checked: false, isDisabled: true},
  // { name: 'One Class SVM', value: 'OneclassSVM', checked: false, isDisabled: true},
  // { name: 'DBCSAN', value: 'DBSCAN', checked: false, isDisabled: true},
  // { name: 'KNN', value: 'Knn', checked: false, isDisabled: true }, 
  // { name: 'Auto Encoder', value: 'Autoencoder', checked: false, isDisabled: true},
  // ];
  
  this.checkboxData  = [
    { name: 'Decision Tree', value: 'DecisionTree', checked:false, isDisabled: true },
    { name: 'Logistic Regression', value: 'LogisticRegression', checked:false, isDisabled: true},
    { name: 'Neural Network', value: 'Neural_Network', checked:false, isDisabled: true },
    { name: 'Naive Bayes', value: 'Naive_Bayes',checked:false, isDisabled: true },
    { name: 'Bagging', value: 'bagging', checked:false, isDisabled: true },
    { name: 'Ada Boost', value: 'AdaBoostClassifier', checked:false, isDisabled: true},
    { name: 'Random Forest', value: 'Random_Forest', checked:false, isDisabled: true },
    { name: 'Stochastic Gradient Descent', value: 'Stochastic_Gradient_Descent', checked:false, isDisabled: true },
    { name: 'Support Vector Machine', value: 'Support_Vector_Machine', checked:false, isDisabled: true },
  ];

//   var algorithum_array = []
//  algorithum_array.push(localStorage.getItem('firstModel_algorithm_names'))
//  console.log(algorithum_array)
var algorithum_name = localStorage.getItem('firstModel_algorithm_names')
 console.log(algorithum_name)
 var algorithum_array = algorithum_name.split(",");
 console.log(algorithum_array)

 for (let i = 0; i < algorithum_array.length; i++) {
  console.log(algorithum_array[i])
  if (algorithum_array[i] === 'DecisionTree' ) {
    this.checkboxData[0] = { name: 'Decision Tree', value: 'DecisionTree', checked:true, isDisabled: false };
  }
  if (algorithum_array[i] === 'LogisticRegression' ) {
    this.checkboxData[1] = { name: 'Logistic Regression', value: 'LogisticRegression', checked:true, isDisabled: false};
  }
  if (algorithum_array[i] === 'Neural_Network' ) {
    this.checkboxData[2] =  { name: 'Neural Network', value: 'Neural_Network', checked:true, isDisabled: false};
  }
  if (algorithum_array[i] === 'Naive_Bayes') {
    this.checkboxData[3] = { name: 'Naive Bayes', value: 'Naive_Bayes',checked:true, isDisabled: false };
  }
  if (algorithum_array[i] === 'bagging' ) {
    this.checkboxData[4] = { name: 'Bagging', value: 'bagging', checked:true, isDisabled: false };
  }
  if (algorithum_array[i] === 'AdaBoostClassifier' ) {
    this.checkboxData[5] = { name: 'Ada Boost', value: 'AdaBoostClassifier', checked:true, isDisabled: false};
  }
  if (algorithum_array[i] === 'Random_Forest' ) {
    this.checkboxData[6] = { name: 'Random Forest', value: 'Random_Forest', checked:true, isDisabled: false };
  }
  if (algorithum_array[i] === 'Stochastic_Gradient_Descent' ) {
    this.checkboxData[7] = { name: 'Stochastic Gradient Descent', value: 'Stochastic_Gradient_Descent', checked:true, isDisabled: false };
  }
  if (algorithum_array[i] === 'Support_Vector_Machine' ) {
    this.checkboxData[8] = { name: 'Support Vector Machine', value: 'Support_Vector_Machine', checked:true, isDisabled: false };
  }
}


}
  openDialog() {
    this.fileId.nativeElement.click();
  }

  getAlgoName(name) {
    const obj = this.checkboxData.find((algoElement) => {
      return algoElement.value === name;
    });
    return obj.name;
  }
  resetForm() {
    this.checkboxData.forEach((item) => {
      item.checked = true;
    });
    this.classificationForm.reset();
    this.classificationForm.controls.upload.enable();
    this.classificationForm.controls.passageId.enable();
    this.isResultAvailable = false;
    this.isErrorAvailable = false;
  }

  disableUpload() {
    this.classificationForm.controls.upload.disable();
  }

  handleUpload(e, files) {
    this.classificationForm.controls.passageId.setValue('');
    this.fileObj = e.target.files[0];
    const reader = new FileReader();
    if (e.target.value) {
      reader.readAsDataURL(files[0]);
      if (this.fileObj) {
        reader.onload = (event) => {
          // Backend :- base 64 string
          this.inputFile = reader.result;
        };
        this.classificationForm.controls.passageId.disable();
        this.classificationForm.patchValue({
          colFormLabelSm: e.target.files[0].name,
        });
      }
    } else {
      this.classificationForm.patchValue({
        colFormLabelSm: '',
      });
      this.classificationForm.controls.passageId.enable();
    }
  }

  handlePassage(e) {
    if (e.target.value) {
      this.classificationForm.controls.upload.disable();
    } else {
      this.classificationForm.controls.upload.enable();
    }
  }

  handleErrorMessage() {
    this.errorMessage = '';
  }

  findAnmolies() {
    const selectedCheckboxes = [];
    const formData = new FormData();
    this.checkboxData.forEach((item) => {
      if (item.checked) { selectedCheckboxes.push(item.value); }
    });
    let algo = '';
    selectedCheckboxes.forEach((item, index) => {
      if (index === 0) {
        algo += item;
      } else {
        algo += ',' + item;
      }
    });

    if (selectedCheckboxes && selectedCheckboxes.length === 0) {
      this.errorMessage = 'Select an algorithum';
    } else if (
      !this.fileObj &&
      !this.classificationForm.controls.passageId.value
    ) {
      this.errorMessage = 'Upload a file or give a paasage text for summary';
      this.classificationForm.controls.passageId.enable();
    }

   
      // file upload
        var firstTrainTrackerId = localStorage.getItem('FirstModelTrainTrackerId')
      formData.append('trainingTracker_id', firstTrainTrackerId);
      formData.append('file', this.fileObj);
      formData.append('algorithmname', algo);

      this.isErrorAvailable = false;
      this.spinneractive = this.spinner.start();

      this._caseStudyService.runWorkflow(formData).subscribe(
        (response: any) => {
          if (response.response.status === 'Success') {
            this.isResultAvailable = true;
            this.isErrorAvailable = false;
            this.result = response.response.Result;
            if (response && response.response.Result) {
              this.headers = Object.keys(response.response.Result[0].Data);
            }
          } else {
            this.isResultAvailable = false;
            this.isErrorAvailable = true;
            this.errMessage ='Server Error, Please contact system administrator';
            console.log(response)
          }
          this.spinneractive = this.spinner.stop();
        },
        (error) => {
          console.log(error)
          this.isResultAvailable = false;
          this.isResultAvailable = false;
          this.isErrorAvailable = true;
          this.errMessage = 'Server Error, Please contact system administrator';
          this.spinneractive = this.spinner.stop();
        }
      );
    
  }
}
