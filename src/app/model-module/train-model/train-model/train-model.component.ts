import { Component, OnInit, HostListener, ViewChild, ElementRef, } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { ModelDataService } from '../../../shared-module/services/model-data.service'
import { ToastrService, SpinnerService, ToastrCode } from '@core'
import { MatStepperModule } from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { environment } from '@env';
import { flatMap } from 'rxjs/operators';
import { MatHorizontalStepper } from '@angular/material/stepper';
@Component({
  selector: 'app-train-model',
  templateUrl: './train-model.component.html',
  styleUrls: ['./train-model.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class TrainModelComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  modalHeader: string;
  modelData: any;
  modalContent: string;
  termFileString: any;
  termFileLabel: string;
  errMessage: string;
  isShowModel: boolean = false;
  isErrorAvailable: boolean;
  objformData: string;
  isOptional = false;
  spinnerActive = false;
  public active = false;
  modelToBeTrain:any;
  display_thirdFormGroup = false;
  fileObj: any;
  inputFile: string | ArrayBuffer;

  @ViewChild(MatHorizontalStepper) stepper: MatHorizontalStepper;

  constructor(
    private dialogRef: MatDialogRef<TrainModelComponent>,
    public modalService: MatDialog,
    private fb: FormBuilder,
    private modelDataService: ModelDataService,
    private toastrService: ToastrService,
    private spinner: SpinnerService) { }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }
  @ViewChild('fileId', { static: false }) fileId: ElementRef;

  ngOnInit(): void {
    this.firstFormGroup = this.fb.group({
      experiment_name: [this.modelData.modelName, Validators.required],
      upload: ['', Validators.required],
      experiment_description: [this.modelData.modelDiscription, Validators.required]
    });

    this.secondFormGroup = this.fb.group({
      TrainingParamValues: new FormArray([])
      //learnRate: [''],
      //BatchSize: [''],
      //epochs: [''],
      //DropOut: ['']
    });
    
    this.getModelToBeTrainData ()
    this.addTrainingParamCheckboxes();
    if (this.modelData.modelHistory && this.modelData.modelHistory.length > 0) {
      this.firstFormGroup.controls.upload.setValue(this.modelData.modelHistory[0]._id);
    }
  }

  // display third form for product categorization model
  getModelToBeTrainData () {
    this.modelToBeTrain = JSON.parse(localStorage.getItem('modelToBeTrain'))
    console.log("originalModelName",this.modelToBeTrain.original_model_name)

    if (this.modelToBeTrain.original_model_name == 'ProductCategorization'){
         this.display_thirdFormGroup = true;
    }
    this.thirdFormGroup = this.fb.group({
     col_name: [''],
    });
  }
  private addTrainingParamCheckboxes() {
    this.modelData.modelTrainingParamValues.forEach((tParam) => {
      const control = new FormControl(false); // if first item set to true, else false
      (this.secondFormGroup.controls.TrainingParamValues as FormArray).push(control);
    });
  }
  get trainingParamValues(): FormArray {
    return this.secondFormGroup.get("TrainingParamValues") as FormArray
  }
  popupclose() {
    this.modalService.closeAll();
  }
  openDialog() {
    this.fileId.nativeElement.click();
  }
  closeMatDialog(event: any) {
    this.dialogRef.close('close');
  }
  showModel() {
    this.isShowModel = this.isShowModel ? false : true;
  }
  handleUpload(e, files) {
    this.termFileLabel = e.target.files[0].name;
    this.fileObj = e.target.files[0];
    let modal = {
      "_id": "Test123",
      "user_id": "banu",
      // "user_id": "xpanxion",
      "model_name": this.modelData.modelName,
      "file_name": this.fileObj.name,
      "created_date_time": this.fileObj.lastModifiedDate
    }

    let modalDataType1 = this.modelData.modelHistory.find(x => x._id == "Test123");
    if (!modalDataType1) {
      this.modelData.modelHistory.push(modal);
    }
    else {
      let itemIndex = this.modelData.modelHistory.findIndex(x => x._id == "Test123");
      this.modelData.modelHistory[itemIndex] = modal;
    }

    if (this.firstFormGroup.controls.upload.value != "Test123") {
      this.firstFormGroup.controls.upload.setValue("Test123");
    }

    const reader = new FileReader();
    if (e.target.value) {
      reader.readAsDataURL(files[0]);
      if (this.fileObj) {
        reader.onload = (event) => {
          // Backend :- base 64 string
          this.inputFile = reader.result;
        };
      }
    }
    e.target.value = null;
  }

  //Upload Model Details
  uploadData() {
    if (!this.firstFormGroup.controls.upload.value) {
      this.toastrService.showError(ToastrCode.UploadFile)
    }
    else if (!this.firstFormGroup.valid) {
      this.toastrService.showError(ToastrCode.RequiredFeilds)
    }
    else if (this.firstFormGroup.controls.upload.value != "Test123") {
      this.stepper.next();
    }
    else {
      
      this.spinnerActive = this.spinner.start();
      const formData = new FormData();
      formData.append('file', this.fileObj);
      formData.append('trainTracker_id', this.modelData.trainTrackerId);
      this.modelDataService.uploadData(formData).subscribe(
        (response: any) => {
          if (response.status === 'Success') {
            this.toastrService.showSuccess(ToastrCode.Success)
            this.onStepComplete();
          }
          else {
            this.toastrService.showError(ToastrCode.ApiError);
            
          }
          this.spinnerActive = this.spinner.stop()
        },
        (error) => {
          console.log(error);
          this.toastrService.showError(ToastrCode.ApiError);
        }
      )
    }
  }
  reset() {
    this.firstFormGroup.reset();
    this.termFileLabel = '';
  }
  //Add Model Hyper-Parameters
  addModelParam() {
    this.secondFormGroup.controls.TrainingParamValues.setValidators(minSelectedCheckboxes(1));;
    this.secondFormGroup.controls.TrainingParamValues.updateValueAndValidity();
      this.spinnerActive = this.spinner.start();

      const selectedOrderIds = this.secondFormGroup.value.TrainingParamValues
        .map((v, i) => v ? this.modelData.modelTrainingParamValues[i] : null)
        .filter(v => v !== null)
        .join(",");


      let modelData: any = {
        _id: this.modelData.trainTrackerId,
      }
      if (this.modelData.modelTrainingParam == "algoname") {
        modelData.algoname = selectedOrderIds;
      }
      else {
        modelData.algorithmname = selectedOrderIds;
      }

      if (this.firstFormGroup.controls.upload.value && this.firstFormGroup.controls.upload.value != "Test123") {
        modelData.dataTracker_id = this.firstFormGroup.controls.upload.value;
      }
      modelData.experiment_name = this.firstFormGroup.controls.experiment_name.value;
      modelData.experiment_description = this.firstFormGroup.controls.experiment_description.value;
      console.log("*******************************************************************add algorithm :**************************************")
      console.log(modelData)
      this.modelDataService.trainModel(modelData).subscribe(
        (response: any) => {
          if (response.status === 'Success') {
            this.toastrService.showSuccess(ToastrCode.Success)
          }
          this.onClose();
          window.location.reload();
          this.spinnerActive = this.spinner.stop();
          console.log("workflow running success")

        },
        (error) => {
          this.spinnerActive = this.spinner.stop();
          console.log(error);
          this.toastrService.showError(ToastrCode.ApiError);
          console.log("workflow faild")
        }
      );
      this.toastrService.showSuccess(ToastrCode.Training);
    
  }

  onStepComplete() {
    this.stepper.selected.completed = true;
    this.stepper.selected.editable = false;
    this.stepper.next();
  }

  onClose() {
    this.dialogRef.close('close');
  }
}
function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      // get a list of checkbox values (boolean)
      .map(control => control.value)
      // total up the number of checked checkboxes
      .reduce((prev, next) => next ? prev + next : prev, 0);

    // if the total is not greater than the minimum, return the error message
    return totalSelected >= min ? null : { required: true };
  };

  return validator;
}
