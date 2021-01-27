import { Component, OnInit } from '@angular/core';
import { NodeRedConstants } from '../../../core-module/infrastructure/node-red-contant';
import { ToastrService } from '@core/services';
import { ToastrCode } from '@core';
import { DesignWorkflowService } from '../services/design-workflow.service';
import { environment } from '@env';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ModelDataService } from '@shared/services/model-data.service';
import {  SpinnerService } from '@core'
@Component({
  selector: 'app-design-workflow',
  templateUrl: './design-workflow.component.html',
  styleUrls: ['./design-workflow.component.css']
})
export class DesignWorkflowComponent implements OnInit {

  nodeRedConstant = NodeRedConstants;
  nodeRedUrl = environment.nodeRedUrl;
  useCaseData: any = {};
  url: string;
  urlSafe: SafeResourceUrl;
  spinnerActive = false;
  result: any;
  trainedAndNonTrainableModel:any

  constructor(private designWorkflowService: DesignWorkflowService, private toastService: ToastrService,
    private router: Router, private dataRoute: ActivatedRoute, public sanitizer: DomSanitizer,private modelDataService: ModelDataService,
    private spinner: SpinnerService) { }

  ngOnInit(): void {
    this.getTableData()
    this.createNode();
    const data = history.state;
    this.useCaseData = data[0];
   
    }

  createNode() {
    this.designWorkflowService.createFlow(this.nodeRedConstant.allSubflow).subscribe(data => {
    });
  }

  startFlow() {
    this.designWorkflowService.startFlow().subscribe(data => {
    });
  }

  finalizedDesign() {
    this.designWorkflowService.checkDesign().subscribe(
      (successResponse) => {
        console.log(successResponse);
        var sJson = JSON.stringify(successResponse);
        var element = document.createElement('a');
        element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(sJson));
        element.setAttribute('download', "download_subflow.json");
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click(); // simulate click
        document.body.removeChild(element);
      },
      (errorResponse) => {
      });

    this.useCaseData.url = this.nodeRedConstant.flowURL.DocumentClassification;
    const useCaseDataList = [];
    useCaseDataList.push(this.useCaseData);
    this.designWorkflowService.finalizedFlow(useCaseDataList).subscribe(
      (successResponse) => {
        this.toastService.showSuccess(ToastrCode.DesignedFinalized);
        this.router.navigate(['/casestudy']);
      },
      (errorResponse) => {
        this.toastService.showError(ToastrCode.Fatal);
      });
  }
  getTrainModel() {
    this.designWorkflowService.getTrainModel().subscribe(
      (successResponse) => {
      },
      (errorResponse) => {
        this.toastService.showError(ToastrCode.Fatal);
      });
  }
   

  // get trained and non trainable model
  getTableData() {
    this.spinnerActive = this.spinner.start() 
    this.modelDataService.getModelList(environment.testUserId).subscribe(
      (response: any) => {
        this.result = response.records;
        var trainedModel = []
        for (var i = 0; i < this.result.length; i++){
            // get trained and non-trainable model
            if(this.result[i].status == 'Trained' || this.result[i].trainable == false){
              trainedModel[i] = this.result[i].original_model_name
            } 
        }
        trainedModel = trainedModel.filter(item => item);
        this.trainedAndNonTrainableModel = trainedModel
        this.url = environment.nodeRedUrl+'?'+  this.trainedAndNonTrainableModel
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
        // console.log(this.url)
        // console.log("trained model",this.trainedAndNonTrainableModel)
        // console.log("display modeldata",this.result)
      }
    )
    this.spinnerActive = this.spinner.stop()
  }




}
