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
  modelUploadHistory: any;
  urlParameter:any[];
  historyArray:any;
  modelHistory:any;
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
      modelHistory: Object.assign([], this.modelUploadHistory ? (this.modelUploadHistory.message ? null : this.modelUploadHistory.sort(this.comp)): null)
    };
    console.log('modalDialog.componentInstance.modelData',modalDialog.componentInstance.modelData)
  }
  comp(a, b) {
    return new Date(b.created_date_time).getTime() - new Date(a.created_date_time).getTime();
  }
  getModelDetailsAndTrainModel(modelData: any) {
    console.log("modelData",modelData)
    console.log("modelData._id",modelData._id)
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
        console.log("All model",this.result)
        var trainedModel = []
        for (var i = 0; i < this.result.length; i++){
            if (this.result[i].original_model_name == 'TimeSeries'){ this.result[i].model_route = "time-series"; }
            else if (this.result[i].original_model_name == 'AnamolyDetection'){this.result[i].model_route = "anamoly-detection"; } 
        }
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
          this.modelHistory = response
          console.log("model.history",model.history)

          this.historyArray = model.history.length
        }
      );
      this.spinnerActive = this.spinner.stop()
    }
  }

  getModelHistoryDetail(History){
    // console.log('history',History);
    this.passHistoryData = History;
    this.viewHistory = true;
    
                        
  }

  open_trained_model_new_page(History,modelRoute_url){
    console.log('history',History);
    this.passHistoryData = History;
    this.viewHistory = true;
    
    var model_array = [];
        for (var i = 0; i < this.passHistoryData.minio_trained_model.length; i++){
              var split_model_array = this.passHistoryData.minio_trained_model[i].split(".");
              var n =split_model_array[0].split("/");
              model_array.push(n[n.length - 1]);             
            }
        this.urlParameter = model_array
        window.open("http://localhost:4201/" + modelRoute_url  +'?'+ this.urlParameter, "_blank");
  }
  receiveModelHistoryEvent($event){
    console.log($event);
    this.viewHistory = $event;
  }
  closeHistory(){
    this.viewHistory = false;
  }

}
