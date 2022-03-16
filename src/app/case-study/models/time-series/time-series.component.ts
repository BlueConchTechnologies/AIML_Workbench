import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from '@core/services';
import { CaseStudyService } from '../../services/case-study.service';
import { ToastrCode, SpinnerService } from '@core';
import { DOCUMENT } from '@angular/common';
import { DesignWorkflowService } from '../../services/design-workflow.service';
@Component({
  selector: 'app-time-series',
  templateUrl: './time-series.component.html',
  styleUrls: ['./time-series.component.css']
})
export class TimeSeriesComponent implements OnInit {

  constructor(private _caseStudyService: CaseStudyService, private router: Router, private toastService: ToastrService, private spinner: SpinnerService, private formBuilder: FormBuilder, private designWorkflowService: DesignWorkflowService) { }
  // workflowForm: FormGroup;
  // Output_result:any
  // spinnerActive = false;

  timeSeriesForm: FormGroup;
  algorithmList: any = [];
  spinnerActive = false;
  isErrorAvailable = false;
  isResultAvailable = false;
  timeSeriesData = [];
  errMessage = '';
  algoNameResult = [];
  firstTab = 0;
  selectedItem = 0;
  formErrorMessage;
  doubleModel_isSuccess: any;
  Output_result: any
  trainTrackerIdLength:any;

  ngOnInit(): void {
    this.timeSeriesForm = this.formBuilder.group({
      noOfPredictions: ['2', Validators.required]
    });
    // get train trackerId length
    this.trainTrackerIdLength = localStorage.getItem('trainTrackerIdLength')
    this.filterAlgorithumName();
  }

  filterAlgorithumName() {

    this.algorithmList = [
      { name: 'Auto Arima Model', value: 'auto_arima_model', checked: false, isDisabled: true },
      { name: 'Arima Model', value: 'arima_model', checked: false, isDisabled: true },
      { name: 'Ar Model', value: 'ar_model', checked: false, isDisabled: true },
      { name: 'Sarimax Model', value: 'sarimax_model', checked: false, isDisabled: true },
      // { name: 'Var Model', value: 'var_model', checked: false, isDisabled: true  },
      { name: 'Lstm', value: 'lstm', checked: false, isDisabled: true },
    ];

    var algorithum_name = localStorage.getItem('firstModel_algorithm_names')
    console.log(algorithum_name)
    var algorithum_array = algorithum_name.split(",");
    console.log(algorithum_array)

    for (let i = 0; i < algorithum_array.length; i++) {
      if (algorithum_array[i] === 'auto_arima_model') {
        this.algorithmList[0] = { name: 'Auto Arima Model', value: 'auto_arima_model', checked: true, isDisabled: false };
      }
      if (algorithum_array[i] === 'arima_model') {
        this.algorithmList[1] = { name: 'Arima Model', value: 'arima_model', checked: true, isDisabled: false };
      }
      if (algorithum_array[i] === 'ar_model') {
        this.algorithmList[2] = { name: 'Ar Model', value: 'ar_model', checked: true, isDisabled: false };
      }
      if (algorithum_array[i] === 'sarimax_model') {
        this.algorithmList[3] = { name: 'Sarimax Model', value: 'sarimax_model', checked: true, isDisabled: false };
      }
      // if (algorithum_array[i] === 'var_model') {
      //   this.algorithmList[4] = { name: 'Var Model', value: 'var_model', checked: true, isDisabled: false };
      // }
      if (algorithum_array[i] === 'lstm') {
        this.algorithmList[5] = { name: 'Lstm', value: 'lstm', checked: true, isDisabled: false };
      }
    }


  }


  submit() {
    if ((this.timeSeriesForm.controls.noOfPredictions.value >= 1) && (this.timeSeriesForm.controls.noOfPredictions.value <= 25)) {
      const formData = new FormData();
      const selectedAlgoList = [];
      this.algorithmList.forEach(algo => {
        if (algo.checked) {
          selectedAlgoList.push(algo.value);
        }
      });
      if (selectedAlgoList.length && this.timeSeriesForm.invalid) {
        this.formErrorMessage = 'Please Enter No Of Predictions And Select Filters';
      } else {
        this.formErrorMessage = undefined;
        var firstTrainTrackerId = localStorage.getItem('FirstModelTrainTrackerId')
        formData.append('trainingTracker_id', firstTrainTrackerId);
        formData.append('algorithmname', selectedAlgoList.toString());
        formData.append('number_of_indexes', Math.ceil(this.timeSeriesForm.controls.noOfPredictions.value).toString());
        this.isErrorAvailable = false;
        this.spinnerActive = this.spinner.start();
        this.timeSeriesData = [];
        this._caseStudyService.runWorkflow(formData).subscribe(
          (response: any) => {

            if (this.trainTrackerIdLength <= 1) {

              if (response.response.result === 'success') {
                this.isResultAvailable = true;
                this.isErrorAvailable = false;
                const tempData = this.timeSeriesData;
                // tslint:disable-next-line
                Object.keys(response.response).map(function (key) {
                  if (key !== 'result') {
                    tempData.push({ algoName: key, prediction: response.response[key] });
                  }
                  return tempData;
                });
                this.timeSeriesData = tempData;
                this.timeSeriesData.forEach(element => {
                  if ((typeof element.prediction) !== 'object') {
                    element.prediction = {};
                    element.prediction.keys = [];
                    element.prediction.values = [];
                  }
                  // tslint:disable-next-line
                  element.prediction.keys = eval(element.prediction.keys);
                  // tslint:disable-next-line
                  element.prediction.values = eval(element.prediction.values);
                });
              } else {
                this.isResultAvailable = false;
                this.errMessage = 'Server Error, Please contact system administrator';
                this.isErrorAvailable = true;
              }
            } else {
              this.errMessage = response.response.error;
              this.spinnerActive = this.spinner.stop()
              this.secondFlow(response.response)
            }
            this.spinnerActive = this.spinner.stop();
          },
          (error) => {
            this.isResultAvailable = false;
            this.errMessage = 'Server Error, Please contact system administrator';
            this.isErrorAvailable = true;
            this.spinnerActive = this.spinner.stop();
          });
      }
    } else {
      alert('Please select No. of Predictions in between 1 to 25.');
    }
  }



  secondFlow(firstflowResponse) {
    const formData_new = new FormData();
    var secondTrainTrackerId = localStorage.getItem('SecondModelTrainTrackerId')
    formData_new.append('trainingTracker_id', secondTrainTrackerId);
    formData_new.append('text', firstflowResponse);

    formData_new.forEach((value, key) => {
      console.log("formdata_second model", key + " " + value)
    });


    this._caseStudyService.runWorkflow(formData_new)
      .subscribe(
        (successResponse) => {
          console.log('successResponse', successResponse)
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

  getAlgoName(algoValue: string) {
    // tslint:disable-next-line
    const algoRes = this.algorithmList.filter(function (item) { return item.value === algoValue; });
    return algoRes[0].name;
  }
  setIndex(index) {
    this.selectedItem = index;
  }

}
