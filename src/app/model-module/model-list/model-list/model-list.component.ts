import { Component, OnInit } from '@angular/core';
import { TrainModelComponent } from '../../train-model/train-model/train-model.component';
import { TestModelComponent } from '../../test-model/test-model/test-model.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModelDataService } from '@shared/services/model-data.service';
import { ToastrService, SpinnerService } from '@core'
import { environment } from '@env';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.css'],
})
export class ModelListComponent implements OnInit {
  user_id = 'Anjali';
  modelData: [];
  cols: any[];
  myPaginationString: string;
  result: any;
  records: [];
  spinnerActive = false;
  viewHistory:boolean = false;
  passHistoryData;
  trainingParam: string;
  trainingParamValues: any[];
  modelUploadHistory: any[];

  constructor(private modalService: MatDialog, private modelDataService: ModelDataService,
    private toastrService: ToastrService, private spinner: SpinnerService) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'model_name', header: 'Model Name', isShowInHistory: true },
      { field: 'model_description', header: 'Model Details', isShowInHistory: false },
      { field: 'status', header: 'Status', isShowInHistory: true },
      { field: 'accuracy', header: 'Accuracy', isShowInHistory: true },
      { field: 'last_trained_date', header: 'Last Trained Date', isShowInHistory: true },
    ];
    this.getTableData();
  }
  setMyPagination(event) {
    let startRow = event.first + 1;
    let endRow = startRow + event.rows;
    let totalRows = this.modelData.length;
    this.myPaginationString = "showing " + startRow + " to " + endRow + " of " + totalRows + " entries"
  }


  openTrainModal(modelData: any) {
    const modalDialog = this.modalService.open(TrainModelComponent, {
      width: '750px',
      autoFocus: false,
    });
    modalDialog.componentInstance.modalHeader = 'Model 2';
    modalDialog.componentInstance.modelData = {
      trainTrackerId: modelData._id,
      modelName: modelData.model_name,
      modelDiscription: modelData.model_description,
      modelTrainingParam: this.trainingParam,
      modelTrainingParamValues: this.trainingParamValues,
      modelHistory: Object.assign([], this.modelUploadHistory?.sort(this.comp))
    };
  }
  comp(a, b) {
    return new Date(b.created_date_time).getTime() - new Date(a.created_date_time).getTime();
  }
  getModelDetailsAndTrainModel(modelData: any) {
    const originalModelName = modelData.original_model_name ? modelData.original_model_name : modelData.Ori_modelname;
    let getModelUploadHistory = this.modelDataService.getModelUploadHistory(modelData._id);
    let getModelDetails = this.modelDataService.getModelDetails(originalModelName);

    forkJoin([getModelUploadHistory, getModelDetails]).subscribe(results => {
      this.modelUploadHistory = results[0];
      const modelDetails = results[1];

      if (modelDetails.status === 'Success') {
        if (modelDetails.records && modelDetails.records.length > 0) {
          const record = modelDetails.records[0];
          this.trainingParam = record.training_params[0];
          this.trainingParamValues = record.algorithm_names;

          //Train the model
          this.openTrainModal(modelData);
          //this.toastrService.showSuccess(ToastrCode.Training);
        }
      }
    });
  }
  openTestModal(url) {
    <any>window.open(url, 'test', `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
    width=0,height=0,left=-1000,top=-1000`);
  }
  getTableData() {
    this.spinnerActive = this.spinner.start() 
    this.modelDataService.getModelList(environment.testUserId).subscribe(
      (response: any) => {
        this.result = response.records;
        this.result.map(obj=> ({ 
          ...obj, 
          isExpanded: false
        }));
        
      }
    )
    this.spinnerActive = this.spinner.stop()
  }

  getModelHistory(model: any) {
    model.isExpanded = !model.isExpanded;
    if (model.isExpanded) {
      this.spinnerActive = this.spinner.start() 
      this.modelDataService.getModelHistory(model._id).subscribe(
      //this.modelDataService.getModelHistory('5f3bb5c881b5511339a74749').subscribe(
        (response: any) => {
          model.history = response;
        }
      );
      this.spinnerActive = this.spinner.stop()
    }
  }

  getModelHistoryDetail(History){
    console.log(History);
    this.passHistoryData = History;
    this.viewHistory = true;
  }
  receiveModelHistoryEvent($event){
    console.log($event);
    this.viewHistory = $event;
  }
  closeHistory(){
    this.viewHistory = false;
  }

}
