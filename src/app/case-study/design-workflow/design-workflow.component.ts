import { Component, OnInit } from '@angular/core';
import { NodeRedConstants } from '../../../core-module/infrastructure/node-red-contant';
import { ToastrService } from '@core/services';
import { ToastrCode } from '@core';
import { DesignWorkflowService } from '../services/design-workflow.service';
import { environment } from '@env';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ModelDataService } from '@shared/services/model-data.service';
import { SpinnerService } from '@core'

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
  trainedAndNonTrainableModel: any
  workFlow: any;
  user_id: any;
  usecase_name: any;
  usecase_description: any;
  flow: any;
  usecaseId = null
  useCaseUserId: any
  trainableModelData: any;
  nonTrainableModelData: any;
  loggedUser:any;
  constructor(private designWorkflowService: DesignWorkflowService, private toastService: ToastrService,
    private router: Router, private dataRoute: ActivatedRoute, public sanitizer: DomSanitizer, private modelDataService: ModelDataService,
    private spinner: SpinnerService) { }

  ngOnInit(): void {
    this.loggedUser = localStorage.getItem('logedInUsername')
    this.getTranableAndNonTranableModelData()
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
        localStorage.setItem("workflow_to_nodered", JSON.stringify(successResponse));

        //get workflow values
        this.usecase_name = successResponse[0].label;
        this.usecase_description = successResponse[0].info;
        this.flow = successResponse

        //getting login user and usecase user
        this.user_id = localStorage.getItem('logedInUsername');
        this.useCaseUserId = localStorage.getItem('usecaseUserId');
        console.log('usecaseUserId********************************************', this.useCaseUserId)


        if (this.usecaseId == 'null' || this.useCaseUserId == 'aimlworkbenchblueconchtechcom') {
          this.saveWorkflowToDB();
        }
        else {
          this.updateWorkflowToDb();
        }
      },
      (errorResponse) => {
      });

  }



  // ***********save work flow***********************//
  saveWorkflowToDB() {
    this.spinnerActive = this.spinner.start();
    this.designWorkflowService.saveWorkflow(this.user_id, this.usecase_name, this.usecase_description, this.flow).subscribe(
      data => {
        this.spinnerActive = this.spinner.stop();
        console.log("save workflow response***************************************", data)
        // this.router.navigate(['/runworkflow']);
        this.router.navigate(['/displayWorkflow']);
      },
      (error) => {
        this.spinnerActive = this.spinner.stop();
        console.log('save workflow error', error)
      }
    )

  }

  // ***********update work flow***********************//
  updateWorkflowToDb() {
    this.spinnerActive = this.spinner.start();
    this.designWorkflowService.updateWorkflow(this.usecaseId, this.useCaseUserId, this.usecase_name, this.usecase_description, this.flow).subscribe(
      data => {
        this.spinnerActive = this.spinner.stop();
        console.log("update workflow response***************************************", data)
        this.router.navigate(['/casestudy']);
      },
      (error) => {
        this.spinnerActive = this.spinner.stop();
        console.log('save workflow error', error)
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


  // get trainable and non trainable model data
  getTranableAndNonTranableModelData() {

    // get  non trainable model data
    this.spinnerActive = this.spinner.start()
    this.modelDataService.getModelList(this.loggedUser).subscribe(
      (response: any) => {
        this.result = response.records;
        // get trained and non-trainable model
        var trainedModel = []
        var trainModelData = []
        for (var i = 0; i < this.result.length; i++) {
          if (this.result[i].trainable == false) {
            trainedModel[i] = this.result[i].original_model_name
            trainModelData[i] = this.result[i]
            trainModelData[i].algorithm_names = ''
          }
        }
        trainedModel = trainedModel.filter(item => item);
        this.nonTrainableModelData = trainModelData.filter(item => item);

        

                 console.log(this.loggedUser)
                  this.modelDataService.getAllmodeltrainhistory(this.loggedUser).subscribe(
                    (response: any) => {
                      this.trainableModelData = response
                      console.log(response.length)
                    // if non-trainable model not empty
                    if (response.length == undefined) {
                              console.log('nontrainable model empty')
                            // extract id , original_modelName , model_name
                            let allModelData = this.nonTrainableModelData.map(({_id,original_model_name,model_name,prediction_params,training_params,algorithm_names,...rest}) =>({_id,original_model_name,model_name,prediction_params,training_params,algorithm_names}))
                                
                            //sort json alphabetically
                            allModelData.sort( function( a, b ) {
                              return a.model_name < b.model_name ? -1 : a.model_name > b.model_name ? 1 : 0;
                            });
                         

                            // set trained and non trainable model to node-red-Component
                            var strJSON = encodeURIComponent(JSON.stringify(allModelData));
                            this.url = environment.nodeRedUrl+'?'+  strJSON
                            this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
                    } else {
                        // remove duplicate items
                        this.trainableModelData = response.filter((obj, pos, arr) => { return arr.map(mapObj =>mapObj.original_model_name).indexOf(obj.original_model_name) == pos;});
                        console.log(this.trainableModelData)
                        
                          // add property modelname
                          for (var i = 0; i < this.trainableModelData.length; i++) {
                            this.trainableModelData[i].model_name = this.trainableModelData[i].experiment_name
                            this.trainableModelData[i].prediction_params = '';
                            this.trainableModelData[i].training_params = '';
                            this.trainableModelData[i]._id = this.trainableModelData[i].trainTracker_id;

                            
                                // get algorithum name from minio_train_model array
                                var model_array = [];
                                for (var j = 0; j < this.trainableModelData[i].minio_trained_model.length; j++) {
                                  var split_model_array = this.trainableModelData[i].minio_trained_model[j].split(".");
                                  var n = split_model_array[0].split("/");
                                  model_array.push(n[n.length - 1]);
                                }          
                            this.trainableModelData[i].algorithm_names =  model_array;

                          }
                          console.log("this.trainableModelData", this.trainableModelData)
                          console.log("this.nonTrainableModelData", this.nonTrainableModelData)

                          // concat nontranable and trained history
                          var trainedAndNonTrainableModel =[]
                          trainedAndNonTrainableModel = this.nonTrainableModelData.concat(this.trainableModelData)

                          // extract id , original_modelName , model_name
                          let allModelData = trainedAndNonTrainableModel.map(({_id,original_model_name,model_name,prediction_params,training_params,algorithm_names,...rest}) =>({_id,original_model_name,model_name,prediction_params,training_params,algorithm_names}))
                        
                          //sort json alphabetically
                          allModelData.sort( function( a, b ) {
                            return a.model_name < b.model_name ? -1 : a.model_name > b.model_name ? 1 : 0;
                          });
                        console.log("this.trainableModelData + this.nonTrainableModelData",allModelData)


                          // set trained and non trainable model to node-red-Component
                          var strJSON = encodeURIComponent(JSON.stringify(allModelData));
                          this.url = environment.nodeRedUrl+'?'+  strJSON
                          this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
                    }
                   
                      
                    },
                    (error) => {
                      this.spinnerActive = this.spinner.stop();
                      console.log(error)
                    })

 //********************************Get Trainable model data end ************************
        //******************************************************************************************/       
        this.spinnerActive = this.spinner.stop()
        
      },
      (error) => {
        this.spinnerActive = this.spinner.stop();
        console.log(error)
      }

    )

    

      
       

      


  }







}