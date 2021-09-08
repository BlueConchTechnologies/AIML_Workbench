import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from '@core/services';
import { CaseStudyService } from '../../services/case-study.service';
import { ToastrCode, SpinnerService } from '@core';
import { DOCUMENT } from '@angular/common';
import { DesignWorkflowService } from '../../services/design-workflow.service';

@Component({
  selector: 'app-anamoly-detection',
  templateUrl: './anamoly-detection.component.html',
  styleUrls: ['./anamoly-detection.component.css']
})
export class AnamolyDetectionComponent implements OnInit {
  constructor(private _caseStudyService: CaseStudyService, private router: Router, private toastService: ToastrService, private spinner: SpinnerService, private formBuilder: FormBuilder, private designWorkflowService: DesignWorkflowService) { }
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
  checkboxData: any[];
  trainTrackerIdLength: any;
  headers = [];
  doubleModel_isSuccess: any;

  @ViewChild('fileId', { static: false }) fileId: ElementRef;

  ngOnInit(): void {
    this.filterAlgorithumName();
    // get train trackerId length
    this.trainTrackerIdLength = localStorage.getItem('trainTrackerIdLength')
  }

  filterAlgorithumName() {
    this.checkboxData = [
      { name: 'Isolation Forest', value: 'Isolationforest', checked: false, isDisabled: true },
      { name: 'Local Outlier Detection', value: 'Localoutlier', checked: false, isDisabled: true },
      { name: 'Elliptic Envelope', value: 'EllipticEnvelope', checked: false, isDisabled: true },
      { name: 'One Class SVM', value: 'OneclassSVM', checked: false, isDisabled: true },
      { name: 'DBCSAN', value: 'DBSCAN', checked: false, isDisabled: true },
      { name: 'KNN', value: 'Knn', checked: false, isDisabled: true },
      { name: 'Auto Encoder', value: 'Autoencoder', checked: false, isDisabled: true },
    ];

    //   var algorithum_array = []
    //  algorithum_array.push(localStorage.getItem('firstModel_algorithm_names'))
    //  console.log(algorithum_array)
    var algorithum_name = localStorage.getItem('firstModel_algorithm_names')
    console.log(algorithum_name)
    var algorithum_array = algorithum_name.split(",");
    console.log(algorithum_array)

    for (let i = 0; i < algorithum_array.length; i++) {
      if (algorithum_array[i] === 'Isolationforest') {
        this.checkboxData[0] = { name: 'Isolation Forest', value: 'Isolationforest', checked: true, isDisabled: false };
      }
      if (algorithum_array[i] === 'Localoutlier') {
        this.checkboxData[1] = { name: 'Local Outlier Detection', value: 'Localoutlier', checked: true, isDisabled: false };
      }
      if (algorithum_array[i] === 'EllipticEnvelope') {
        this.checkboxData[2] = { name: 'Elliptic Envelope', value: 'EllipticEnvelope', checked: true, isDisabled: false };
      }
      if (algorithum_array[i] === 'OneclassSVM') {
        this.checkboxData[3] = { name: 'One Class SVM', value: 'OneclassSVM', checked: true, isDisabled: false };
      }
      if (algorithum_array[i] === 'DBSCAN') {
        this.checkboxData[4] = { name: 'DBCSAN', value: 'DBSCAN', checked: true, isDisabled: false };
      }
      if (algorithum_array[i] === 'Autoencoder') {
        this.checkboxData[5] = { name: 'Auto Encoder', value: 'Autoencoder', checked: true, isDisabled: false };
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
    this.fileObj = null;
    this.handleErrorMessage();
  }

  disableUpload() {
    this.classificationForm.controls.upload.disable();
  }

  handleUpload(e, files) {
    if (files && files.length) {
      this.isResultAvailable = false;
      this.isErrorAvailable = false;
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
        // this.classificationForm.patchValue({
        //   colFormLabelSm: '',
        // });
        this.classificationForm.controls.passageId.enable();
      }
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
      this.errorMessage = 'Select an algorithm';
    } else if (
      !this.fileObj &&
      !this.classificationForm.controls.passageId.value
    ) {
      // Because of Passage section is comment out
      // this.errorMessage = 'Upload a file or give a paasage text for summary';
      this.errorMessage = 'Upload a file';
      this.classificationForm.controls.passageId.enable();
    }

    if (!!this.classificationForm.controls.passageId.value && selectedCheckboxes.length) {
      // paragraph api call
      // formData.append('user_id', 'dah');
      // formData.append('model_name', 'AnamolyDetection');
      var firstTrainTrackerId = localStorage.getItem('FirstModelTrainTrackerId')
      formData.append('trainingTracker_id', firstTrainTrackerId);
      formData.append('paragraph', this.classificationForm.controls.passageId.value);
      formData.append('algorithmname', algo);
      this.spinneractive = this.spinner.start();
      this._caseStudyService.runWorkflow(formData).subscribe(
        (response: any) => {
          console.log('response1', response)
          if (response.status === 'Success') {
            this.isResultAvailable = true;
            this.isErrorAvailable = false;
            this.result = response.Result;
            if (response && response.Result) {
              this.headers = Object.keys(response.Result[0].Data);
            }
          } else {
            this.isResultAvailable = false;
            this.isErrorAvailable = true;
            this.errMessage = 'Server Error, Please contact system administrator';
            console.log(this.errMessage)
          }
          this.fileObj = {};
          this.spinneractive = this.spinner.stop();
        },
        (error) => {
          this.isResultAvailable = false;
          this.isErrorAvailable = true;
          this.fileObj = {};
          this.errMessage = 'Server Error, Please contact system administrator';;
          console.log(error)
          this.spinneractive = this.spinner.stop();
        }
      );
    } else if (this.fileObj && this.fileObj.name && selectedCheckboxes.length) {
      // file upload
      // formData.append('user_id', 'dah');
      // formData.append('model_name', 'AnamolyDetection');
      var firstTrainTrackerId = localStorage.getItem('FirstModelTrainTrackerId')
      formData.append('trainingTracker_id', firstTrainTrackerId);
      formData.append('file', this.fileObj);
      formData.append('algorithmname', algo);

      this.isErrorAvailable = false;
      this.spinneractive = this.spinner.start();

      this._caseStudyService.runWorkflow(formData).subscribe(
        (response: any) => {
          console.log('response2', response)
          if (this.trainTrackerIdLength <= 1) {
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
              //this.errMessage = 'Server Error, Please contact system administrator!!!!';;
              this.errMessage = response.response.message;
            }
            this.spinneractive = this.spinner.stop();
          } else {
            this.errMessage = response.response.error;
            this.spinneractive = this.spinner.stop()
            this.secondFlow(response.response)
          }
        },
        (error) => {
          this.isResultAvailable = false;
          this.isErrorAvailable = true;
          this.errMessage = 'Server Error, Please contact system administrator';;
          this.spinneractive = this.spinner.stop();
        }
      );
    }
  }
  //  second flow 
  secondFlow(firstflowResponse) {
    const formData_new = new FormData();
    var secondTrainTrackerId = localStorage.getItem('SecondModelTrainTrackerId')
    formData_new.append('trainingTracker_id', secondTrainTrackerId);
    formData_new.append('file', '');
    formData_new.append('input', firstflowResponse);

    formData_new.forEach((value, key) => {
      console.log("formdata_second model", key + " " + value)
    });


    this._caseStudyService.runWorkflow(formData_new)
      .subscribe(
        (successResponse) => {
          console.log('successResponse', successResponse)
          this.doubleModel_isSuccess = true
          this.result = successResponse.response.result
          console.log('this.result', this.result)
          this.toastService.showSuccess(ToastrCode.FlowRunSuccess);
          this.spinneractive = this.spinner.stop()
        },
        (errorResponse) => {
          //  this.toastService.showError('Something went wrong');
          console.log('ERROR', errorResponse);
          this.isErrorAvailable = true;
          this.errMessage = 'Server Error, Please contact system administrator';
          this.spinneractive = this.spinner.stop()

        });
  }

}