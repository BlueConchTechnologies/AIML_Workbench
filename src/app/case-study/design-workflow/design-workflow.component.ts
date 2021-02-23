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

  constructor(private designWorkflowService: DesignWorkflowService, private toastService: ToastrService,
    private router: Router, private dataRoute: ActivatedRoute, public sanitizer: DomSanitizer,private modelDataService: ModelDataService,
    private spinner: SpinnerService) { }

  ngOnInit(): void {
    this.getTableData()
    // this.createNode();
    const data = history.state;
    this.useCaseData = data[0];
   
    }

  // add previously created flow
  // createNode() {
  //     var allSubflow = [{"id":"5750b22f.6cdecc","type":"tab","label":"Flow 1","disabled":false,"info":""},{"id":"6d00b61d.6cd948","type":"subflow","name":"Document Classification","info":"","category":"","in":[],"out":[],"env":[],"color":"#DDAA99"},{"id":"bbcc4858.3393b8","type":"subflow","name":"File Upload","info":"","category":"","in":[],"out":[{"x":740,"y":120,"wires":[{"id":"eb60e72.20a4f18","port":0}]}],"env":[],"color":"#DDAA99"},{"id":"d62a90e7.d95cc","type":"http request","z":"6d00b61d.6cd948","name":"","method":"POST","ret":"obj","paytoqs":false,"url":"http://121.244.33.115:8080/api/DocumentClassification/predict_class","tls":"","persist":false,"proxy":"","authType":"","x":370,"y":60,"wires":[["a589ccbe.b103f"]]},{"id":"441ae066.0c097","type":"function","z":"6d00b61d.6cd948","name":"Set Text","func":"msg.headers = {\n    \"Content-Type\": \"multipart/form-data; boundary=------------------------d74496d66958873e\"\n}\n\nmsg.payload = '--------------------------d74496d66958873e\\r\\n'+\n'Content-Disposition: form-data; name=\"select\"\\r\\n'+\n'\\r\\n'+\n'true\\r\\n'+\n'--------------------------d74496d66958873e\\r\\n'+\n'Content-Disposition: form-data; name=\"print\"\\r\\n'+\n'\\r\\n'+\n'true\\r\\n'+\n'--------------------------d74496d66958873e\\r\\n'+\n'Content-Disposition: form-data; name=\"text\"\\r\\n'+\n'Content-Type: text/html\\r\\n'+\n'\\r\\n'+\nmsg.payload+'\\r\\n'+\n'--------------------------d74496d66958873e--\\r\\n';\nreturn msg;","outputs":1,"noerr":0,"x":180,"y":60,"wires":[["d62a90e7.d95cc"]]},{"id":"bd3429fd.abca38","type":"http in","z":"6d00b61d.6cd948","name":"","url":"/documentClassification","method":"post","upload":false,"swaggerDoc":"","x":210,"y":240,"wires":[["b3ade76.6a2aa18"]]},{"id":"b3ade76.6a2aa18","type":"function","z":"6d00b61d.6cd948","name":"","func":"var text = msg.payload.text\nmsg.payload  = text;\nreturn msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","x":450,"y":200,"wires":[["441ae066.0c097"]]},{"id":"a589ccbe.b103f","type":"http response","z":"6d00b61d.6cd948","name":"","statusCode":"","headers":{},"x":570,"y":60,"wires":[]},{"id":"aa8b20cd.41667","type":"http in","z":"bbcc4858.3393b8","name":"UPLOAD","url":"/upload","method":"post","upload":true,"swaggerDoc":"","x":200,"y":120,"wires":[["9caa980b.5449c8","fa38873b.8a7b48"]]},{"id":"9caa980b.5449c8","type":"function","z":"bbcc4858.3393b8","name":"Set file name","func":"var extn = msg.req.files[0].originalname.split('.').pop()\nmsg.filename = \"test.\"+extn;\nmsg.extn= extn;\nmsg.payload = msg.req.files[0].buffer;\nreturn msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","x":390,"y":120,"wires":[["eb60e72.20a4f18","d8ea6a70.2b1c08"]]},{"id":"eb60e72.20a4f18","type":"file","z":"bbcc4858.3393b8","name":"Save file","filename":"","appendNewline":true,"createDir":true,"overwriteFile":"true","encoding":"none","x":600,"y":120,"wires":[[]]},{"id":"fa38873b.8a7b48","type":"debug","z":"bbcc4858.3393b8","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":390,"y":280,"wires":[]},{"id":"d8ea6a70.2b1c08","type":"debug","z":"bbcc4858.3393b8","name":"","active":true,"tosidebar":true,"console":true,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":650,"y":260,"wires":[]}]
  //   // var allSubflow =  localStorage.getItem("workflow_to_nodered");
  //   this.designWorkflowService.createFlow(allSubflow).subscribe(data => {
  //   });
  // }

  // startFlow() {
  //   this.designWorkflowService.startFlow().subscribe(data => {
  //   });
  // }

  // generate new flow
  finalizedDesign() {
    this.designWorkflowService.checkDesign().subscribe(
      (successResponse) => {
        this.workFlow = successResponse[0]
        var sJson = JSON.stringify(successResponse);

        // set workflow to localstorage
        localStorage.setItem("workflow_to_nodered",JSON.stringify (successResponse) );

        // download the workflow
        var element = document.createElement('a');
        element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(sJson));
        element.setAttribute('download', "download_subflow.json");
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click(); // simulate click
        document.body.removeChild(element);
        this.router.navigate(['/runworkflow']);
      },
      (errorResponse) => {
      });
      
      

    // this.useCaseData.url = this.nodeRedConstant.flowURL.DocumentClassification;
    // const useCaseDataList = [];
    // useCaseDataList.push(this.useCaseData);
    // console.log("useCaseDataList",useCaseDataList)
    // this.designWorkflowService.finalizedFlow(useCaseDataList).subscribe(
    //   (successResponse) => {
    //     this.toastService.showSuccess(ToastrCode.DesignedFinalized);
        
    //   },
    //   (errorResponse) => {
    //     this.toastService.showError(ToastrCode.Fatal);
    //   });
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
