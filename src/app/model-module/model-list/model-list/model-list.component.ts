
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
  viewHistory: boolean = false;
  passHistoryData;
  trainingParam: string;
  trainingParamValues: any[];
  modelUploadHistory: any;
  urlParameter: any[];
  historyArray: any;
  modelHistory: any;
  loggedUser:any
  constructor(private modalService: MatDialog, private modelDataService: ModelDataService,
    private toastrService: ToastrService, private spinner: SpinnerService) { }

  ngOnInit(): void {
    this.loggedUser = localStorage.getItem('logedInUsername')
    this.cols = [
      { field: 'model_name', header: 'Model Name', isShowInHistory: true,width:'15%' },
      { field: 'model_description', header: 'Model Details', isShowInHistory: false,width:'32%' },
      { field: 'status', header: 'Status', isShowInHistory: true,width:'10%' },
      { field: 'accuracy', header: 'Accuracy', isShowInHistory: true,width:'10%' },
      { field: 'training_end_time', header: 'Last Trained Date', isShowInHistory: true,width:'20%' },
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
      modelHistory: Object.assign([], this.modelUploadHistory ? (this.modelUploadHistory.message ? null : this.modelUploadHistory.sort(this.comp)) : null)
    };
    console.log('modalDialog.componentInstance.modelData', modalDialog.componentInstance.modelData)
  }
  comp(a, b) {
    return new Date(b.created_date_time).getTime() - new Date(a.created_date_time).getTime();
  }
  getModelDetailsAndTrainModel(modelData: any) {
    console.log("modelData", modelData)
    console.log("modelData._id", modelData._id)
    localStorage.setItem("modelToBeTrain", JSON.stringify(modelData))
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
    this.modelDataService.getModelList(this.loggedUser).subscribe(
      (response: any) => {
        this.result = response.records;
        console.log("All model", this.result)
        var trainedModel = []
        for (var i = 0; i < this.result.length; i++) {
          if (this.result[i].original_model_name == 'TimeSeries') { this.result[i].model_route = "time-series"; }
          else if (this.result[i].original_model_name == 'AnamolyDetection'){this.result[i].model_route = "anomaly-detection"; }
          else if (this.result[i].original_model_name == 'NER'){this.result[i].model_route = "named-entity-recognition"; } 
          else if (this.result[i].original_model_name == 'VideoAnalytics'){this.result[i].model_route = "video-analytics"; } 
          else if (this.result[i].original_model_name == 'TableExtractor'){this.result[i].model_route = "table-extractor"; } 
          else if (this.result[i].original_model_name == 'DocumentClassification'){this.result[i].model_route = "document-classification"; } 
          else if (this.result[i].original_model_name == 'TextSummarization'){this.result[i].model_route = "text-summarization"; }
          else if (this.result[i].original_model_name == 'TicketClassification'){this.result[i].model_route = "ticket-classification"; }
          else if (this.result[i].original_model_name == 'SentimentClassification'){this.result[i].model_route = "sentiment-analysis"; }
          else if (this.result[i].original_model_name == 'QNA-KB'){this.result[i].model_route = "question-answer"; }
          else if (this.result[i].original_model_name == 'Classification'){this.result[i].model_route = "ml-classification"; }
          else if (this.result[i].original_model_name == 'InstanceSegmentation'){this.result[i].model_route = "instance-segmentation"; } 
          else if (this.result[i].original_model_name == 'InvoiceExtraction'){this.result[i].model_route = "invoice-extraction"; } 
          else if (this.result[i].original_model_name == 'VideoAnalytics'){this.result[i].model_route = "video-analytics"; } 
          else if (this.result[i].original_model_name == 'ObjectDetection'){this.result[i].model_route = "object-detection"; }
          else if (this.result[i].original_model_name == 'TermsExtraction'){this.result[i].model_route = "term-extractor"; } 
          else if (this.result[i].original_model_name == 'TextExtraction'){this.result[i].model_route = "image-to-text"; } 
          else if (this.result[i].original_model_name == 'DuplicatePrediction'){this.result[i].model_route = "duplicates-prediction"; } 
          else if (this.result[i].original_model_name == 'FaceRecognition'){this.result[i].model_route = "face-recognition"; } 
          else if (this.result[i].original_model_name == 'ProductCategorization'){this.result[i].model_route = "products-categorization"; }

           // format training start time
            var split_model_array = this.result[i].training_end_time.split(".");
            this.result[i].training_end_time = split_model_array[0]
            
      
        }
        this.result.map(obj => ({
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
          this.spinnerActive = this.spinner.stop()
          model.history = response;
          this.modelHistory = response
          
          // format training start time
          for (var i = 0; i < this.modelHistory.length; i++) {
            var split_model_array = this.modelHistory[i].training_start_time.split(".");
            this.modelHistory[i].training_start_time = split_model_array[0]
            
          }
          console.log("model.history", this.modelHistory)
          this.historyArray = model.history.length
        },
        (error) => {
          console.log(error);
          this.spinnerActive = this.spinner.stop()
        }
      );

    }
  }

  getModelHistoryDetail(History) {
    // console.log('history',History);
    this.passHistoryData = History;
    this.viewHistory = true;


  }

  open_model_new_page(model_route) {
    console.log(model_route)
    window.open(environment.dahUrl + model_route, "_blank");
  }

  open_trained_model_new_page(History, modelRoute_url) {
    console.log('history', History);
    this.passHistoryData = History;
    this.viewHistory = true;

    // get algorithum name from minio_train_model array
    var model_array = [];
    for (var i = 0; i < this.passHistoryData.minio_trained_model.length; i++) {
      var split_model_array = this.passHistoryData.minio_trained_model[i].split(".");
      var n = split_model_array[0].split("/");
      model_array.push(n[n.length - 1]);
    }
    this.urlParameter = model_array
    console.log('this.urlParameter', this.urlParameter)

    // set parameter to url
    window.open(environment.dahUrl + modelRoute_url + '?' + this.urlParameter, "_blank");
  }
  receiveModelHistoryEvent($event) {
    console.log($event);
    this.viewHistory = $event;
  }
  closeHistory() {
    this.viewHistory = false;
  }

  

}
