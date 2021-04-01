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
  workFlow:any;
  user_id:any;
  usecase_name:any;
  usecase_description:any;
  flow:any;
  usecaseId = null
  useCaseUserId:any

  constructor(private designWorkflowService: DesignWorkflowService, private toastService: ToastrService,
    private router: Router, private dataRoute: ActivatedRoute, public sanitizer: DomSanitizer,private modelDataService: ModelDataService,
    private spinner: SpinnerService) { }

  ngOnInit(): void {
    this.getTableData()
    // this.createNode();
    const data = history.state;
    this.useCaseData = data[0];

    // check if usecaseId present or not
    this.usecaseId = localStorage.getItem('usecaseId')
   
    }

  // generate new flow
  finalizedDesign() {
    this.spinnerActive = this.spinner.start();
    this.designWorkflowService.checkDesign().subscribe(
      (successResponse) => {
        this.spinnerActive = this.spinner.stop();
        this.workFlow = successResponse[0]
        var sJson = JSON.stringify(successResponse);
        var flowName = successResponse[0].label
        // set workflow to localstorage
        localStorage.setItem("workflow_to_nodered",JSON.stringify (successResponse) );
        
        //get workflow values
        this.usecase_name = successResponse[0].label;
        this.usecase_description = successResponse[0].info;
        this.flow = successResponse

        //getting login user and usecase user
        this.user_id = localStorage.getItem('logedInUsername');
        this.useCaseUserId = localStorage.getItem('usecaseUserId');
         console.log('usecaseUserId********************************************',this.useCaseUserId)

       
        if (this.usecaseId == 'null' || this.useCaseUserId == 'xpanxion' ) {
          this.saveWorkflowToDB ();
        } 
        else {
          this.updateWorkflowToDb() ;
        }
      },
      (errorResponse) => {
      });
        
  }

  

  // ***********save work flow***********************//
  saveWorkflowToDB () {
    this.spinnerActive = this.spinner.start();
    this.designWorkflowService.saveWorkflow(this.user_id, this.usecase_name,this.usecase_description,this.flow).subscribe(
      data => { 
        this.spinnerActive = this.spinner.stop();
        console.log("save workflow response***************************************",data)
        // this.router.navigate(['/runworkflow']);
        this.router.navigate(['/displayWorkflow']);
      },
      (error) => {  
        this.spinnerActive = this.spinner.stop();
        console.log('save workflow error',error) 
      }
    )
  
  }

  // ***********update work flow***********************//
  updateWorkflowToDb() {
    this.spinnerActive = this.spinner.start();
    this.designWorkflowService.updateWorkflow(this.usecaseId,this.useCaseUserId, this.usecase_name,this.usecase_description,this.flow).subscribe(
      data => { 
        this.spinnerActive = this.spinner.stop();
        console.log("update workflow response***************************************",data)
        this.router.navigate(['/casestudy']);
      },
      (error) => {  
        this.spinnerActive = this.spinner.stop();
        console.log('save workflow error',error) 
      }
    )
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
        console.log("all data trainModel",this.result)
        // get trained and non-trainable model
        var trainedModel = []
        var trainModelData = []
        for (var i = 0; i < this.result.length; i++){
            if(this.result[i].status == 'Trained' || this.result[i].trainable == false){
              trainedModel[i] = this.result[i].original_model_name
              trainModelData[i] = this.result[i]
            } 
        }
        trainedModel = trainedModel.filter(item => item);
        trainModelData = trainModelData.filter(item => item);

        // extract id , original_modelName , model_name
        let trainModel = trainModelData.map(({_id,original_model_name,model_name,prediction_params,training_params,...rest}) =>({_id,original_model_name,model_name,prediction_params,training_params}))
        console.log("trainModel",trainModel)


        // set trained and non trainable model to node-red-Component
        var strJSON = encodeURIComponent(JSON.stringify(trainModel));
        this.url = environment.nodeRedUrl+'?'+  strJSON
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
       

      }
    )
    this.spinnerActive = this.spinner.stop()
  }




}
