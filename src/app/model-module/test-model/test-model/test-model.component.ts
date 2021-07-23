import { Component, OnInit, HostListener, ViewChild, ElementRef, } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModelDataService } from '../../../shared-module/services/model-data.service'
import { ToastrService, SpinnerService, ToastrCode } from '@core'
import { MatStepperModule } from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { environment } from '@env';
@Component({
  selector: 'app-test-model',
  templateUrl: './test-model.component.html',
  styleUrls: ['./test-model.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class TestModelComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  modalHeader: string;
  modalContent: string;
  termFileString: any;
  termFileLabel: string;
  errMessage: string;
  isShowModel: boolean = false;
  isErrorAvailable: boolean;
  objformData: string;
  isOptional = false;
  isCompleted: boolean;
  spinnerActive = false;
  public active = false;
  fileObj: any;
  inputFile: string | ArrayBuffer;
  loggedUser:any
  constructor(
    private dialogRef: MatDialogRef<TestModelComponent>,
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
    this.loggedUser = localStorage.getItem('logedInUsername')
    this.firstFormGroup = this.fb.group({
      upload: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
    });
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
  }

  //Upload Model Details
  uploadData() {
    if (!this.firstFormGroup.controls.upload.value) {
      this.toastrService.showError(ToastrCode.UploadFile)
      this.isCompleted = false;
    }
    else if (!this.firstFormGroup.valid) {
      this.isCompleted = false;
      this.toastrService.showError(ToastrCode.RequiredFeilds)
    }
    else {
      this.isCompleted = true;
      this.spinnerActive = this.spinner.start();
      const formData = new FormData();
      formData.append('file', this.fileObj);
      formData.append('user_id', this.loggedUser);
      formData.append('model_name', this.firstFormGroup.get('modelName').value);
      formData.append('model_description', this.firstFormGroup.get('modelDescription').value);
      this.modelDataService.uploadData(formData).subscribe(
        (response: any) => {
          if (response.status === 'Success') {
            this.toastrService.showSuccess(ToastrCode.Success)
            this.isCompleted = true;
          }
          else {
            this.toastrService.showError(ToastrCode.ApiError);
            this.isCompleted = false;
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
    console.log("-------1--------------");
    var paramData = {
      "_id": "5ee9ce3781b551127a6aee32",
      "learnRate": this.secondFormGroup.controls.learnRate.value,
      "BatchSize": this.secondFormGroup.controls.BatchSize.value,
      "DropOut": this.secondFormGroup.controls.DropOut.value,
      "epochs": this.secondFormGroup.controls.epochs.value
    }
    this.spinnerActive = this.spinner.start();
    this.modelDataService.addModelParam(paramData).subscribe(
      (response: any) => {
        if (response.status === 'Success') {
          this.toastrService.showSuccess(ToastrCode.Training);
        }
        this.spinnerActive = this.spinner.stop();
      },

      (error) => {
        console.log(error);
        this.toastrService.showError(ToastrCode.ApiError);
      }

    )
    this.closeMatDialog('close');
  }
}
