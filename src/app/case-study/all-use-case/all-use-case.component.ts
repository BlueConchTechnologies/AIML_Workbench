import { Component, OnInit } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { ToastrService } from '@core/services';
import { CaseStudyService } from '../services/case-study.service';
import { DesignWorkflowService } from '../services/design-workflow.service';
import { ToastrCode, SpinnerService } from '@core';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { environment } from '@env';
import { ModelDataService } from '@shared/services/model-data.service';

@Component({
  selector: 'app-all-use-case',
  templateUrl: './all-use-case.component.html',
  styleUrls: ['./all-use-case.component.css']
})
export class AllUseCaseComponent implements OnInit {
  prebuiltusecase: boolean = true;
  myusecase: boolean = true;
  usecaseList: any;
  usecaseID: any;
  preBuiltUsecases: any;
  mytUsecases: any;
  spinnerActive = false;
  displayworkflowForm: FormGroup;
  display_prebuiltUseCase = true
  display_myUseCase = true
  pinToHomeArray = []
  title_prebuiltUseCase = '';
  title_myUseCase = '';
  isErrorAvailable = false
  errMessage = ''
  checkoutModel: any
  mytUsecasesId = [];
  trainingTrackerId = []
  result: any;
  checkoutNonTrainableModelList = [];

  constructor(private modelDataService: ModelDataService, private _caseStudyService: CaseStudyService, private router: Router, private designWorkflowService: DesignWorkflowService, private toastService: ToastrService, private spinner: SpinnerService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.checkoutModel = localStorage.getItem('CheckoutModelItem');
    if (this.checkoutModel == null) { this.checkoutModel = 'null' }
    console.log("this.checkoutModel", this.checkoutModel)
    this.displayworkflowForm = this.formBuilder.group({
      display_prebuiltUsecase: true,
      display_myUsecase: true
    })

    this.getPrebuiltUsecases()
    this.getMyUsecases()
  }


  getPrebuiltUsecases() {
    console.log('all case component')
    var preBuilt_usecaseId = environment.admin_username;
    this.spinnerActive = this.spinner.start()
    this._caseStudyService.getPrebuiltUseCases(preBuilt_usecaseId).subscribe(resp => {
      this.preBuiltUsecases = resp.records;
      console.log('preBuiltusecaseList', this.preBuiltUsecases)
      console.log('all case component')
      this.title_prebuiltUseCase = 'Pre-Built Use Cases'
      this.isErrorAvailable = false;
      this.spinnerActive = this.spinner.stop()

      // set prebuilt usecases to home screen
      //this.pinTpHomeScreenPreBuiltUsecase ()
    },
      (errorResponse) => {
        this.isErrorAvailable = true;
        this.errMessage = 'Server Error, Please contact system administrator';
        this.spinnerActive = this.spinner.stop()
        console.log(errorResponse)
        if (errorResponse.error.message == 'No record found') {
          this.errMessage = '';
        }
      });

  }

  getMyUsecases() {
    var my_usecaseId = localStorage.getItem('logedInUsername')
    this.spinnerActive = this.spinner.start()
    this._caseStudyService.getPrebuiltUseCases(my_usecaseId).subscribe(resp => {

      this.mytUsecases = resp.records;
      console.log('MyusecaseList', this.mytUsecases)
      this.title_myUseCase = 'My Use Cases';
      this.isErrorAvailable = false;
      this.spinnerActive = this.spinner.stop()
    },
      (errorResponse) => {
        this.isErrorAvailable = true;
        this.errMessage = 'Server Error, Please contact system administrator';
        this.spinnerActive = this.spinner.stop()
        console.log(errorResponse)
        if (errorResponse.error.message == 'No record found') {
          this.errMessage = '';
        }


      });
  }

  createUseCase() {
    // set empty workflow to localstorage
    var workFlow = [{ "id": "5750b22f.6cdecc", "type": "tab", "label": "Flow 1", "disabled": false, "info": "" }]
    localStorage.setItem("workflow_to_nodered", JSON.stringify(workFlow));
    localStorage.setItem("usecaseId", null);
    this.router.navigate(['design-workflow']);

    // add empty flow to nodered
    var allSubflow = [{ "id": "5750b22f.6cdecc", "type": "tab", "label": "Flow 1", "disabled": false, "info": "" }]
    this.designWorkflowService.createFlow(allSubflow).subscribe(data => {
    });

  }

  editPrebuiltUsecase(event): void {
    var idAttr = event.srcElement.attributes.id;
    this.usecaseID = idAttr.nodeValue;
    for (var i = 0; i < this.preBuiltUsecases.length; i++) {
      if (this.preBuiltUsecases[i]._id == this.usecaseID) {
        var flow = this.preBuiltUsecases[i].flow
        var usecaseUserId = this.preBuiltUsecases[i].user_id
        // set workflow to localstorage
        localStorage.setItem("usecaseId", this.usecaseID);
        localStorage.setItem('usecaseUserId', usecaseUserId)
        localStorage.setItem("workflow_to_nodered", JSON.stringify(flow));
        // add flow to nodered
        this.designWorkflowService.createFlow(flow).subscribe(data => {
        });
        this.router.navigate(['design-workflow']);
      }
    }
    if (this.mytUsecases !== undefined) {
      for (let i = 0; i < this.mytUsecases.length; i++) {
        this.mytUsecasesId.push(this.mytUsecases[i]._id)
      }
    }
    for (let i = 0; i < flow.length; i++) {
      if (this.mytUsecasesId.includes('flow[i].trainingTracker_id')) {
        console.log("ok....")
      } else {
        if (flow[i].trainingTracker_id !== undefined) {
          this.modelDataService.getModelDetails(flow[i].original_model_name).subscribe(
            (response: any) => {
              this.result = response.records;
              var flow1 = flow[i]
              var user_id = this.mytUsecases[0].user_id;
              var model_description = this.result[0].model_description;
              var model_name = this.result[0].original_model_name;
              var original_model_name = this.result[0].original_model_name;
              var prediction_params = this.result[0].prediction_params;
              var trainable = this.result[0].trainable;
              var training_params = this.result[0].training_params;

              this.checkoutNonTrainableModelList.push({
                user_id: user_id,
                model_description: model_description,
                model_name: model_name,
                original_model_name: original_model_name,
                prediction_params: prediction_params,
                trainable: trainable,
                training_params: training_params
              });

              // set workflow to localstorage
              localStorage.setItem("usecaseId", this.usecaseID);
              localStorage.setItem('usecaseUserId', user_id)
              localStorage.setItem("workflow_to_nodered", JSON.stringify(flow1));
              this.modelDataService.selectedModels(this.checkoutNonTrainableModelList).subscribe(
                (successResponse) => {
                  console.log("successResponse....", successResponse)
                });
              // add flow to nodered
              this.designWorkflowService.createFlow(flow1).subscribe(data => {
                console.log("Data= ", data)
              });

              this.router.navigate(['design-workflow']);

            }, (errorResponse) => {
            });
        }
      }
    }


  };

  editMyUsecase(event): void {
    var idAttr = event.srcElement.attributes.id;
    this.usecaseID = idAttr.nodeValue;
    console.log('this.usecaseID', this.usecaseID)
    for (var i = 0; i < this.mytUsecases.length; i++) {
      if (this.mytUsecases[i]._id == this.usecaseID) {
        console.log("use case flow", this.mytUsecases[i])
        var flow = this.mytUsecases[i].flow
        var usecaseUserId = this.mytUsecases[i].user_id
        // set workflow to localstorage
        localStorage.setItem("usecaseId", this.usecaseID);
        localStorage.setItem('usecaseUserId', usecaseUserId)
        localStorage.setItem("workflow_to_nodered", JSON.stringify(flow));
        // add flow to nodered
        this.designWorkflowService.createFlow(flow).subscribe(data => {
        });
        this.router.navigate(['design-workflow']);
      }
    }
  }


  runMyUsecase(event) {
    var idAttr = event.srcElement.attributes.id;
    this.usecaseID = idAttr.nodeValue;
    console.log('this.usecaseID', this.usecaseID)
    for (var i = 0; i < this.mytUsecases.length; i++) {
      if (this.mytUsecases[i]._id == this.usecaseID) {
        console.log("use case flow", this.mytUsecases[i]);
        this.display_myUseCase = false;
        this.display_prebuiltUseCase = false;
        var flow = this.mytUsecases[i].flow
        var usecaseUserId = this.mytUsecases[i].user_id
        // set workflow to localstorage
        localStorage.setItem("usecaseId", this.usecaseID);
        localStorage.setItem('usecaseUserId', usecaseUserId)
        localStorage.setItem("workflow_to_nodered", JSON.stringify(flow));
        // add flow to nodered
        this.designWorkflowService.createFlow(flow).subscribe(data => {
        });
      }
    }
  }

  runPrebuiltUsecase(event) {
    var idAttr = event.srcElement.attributes.id;
    this.usecaseID = idAttr.nodeValue;
    console.log('this.usecaseID', this.usecaseID)
    for (var i = 0; i < this.preBuiltUsecases.length; i++) {
      if (this.preBuiltUsecases[i]._id == this.usecaseID) {
        console.log("use case flow", this.preBuiltUsecases[i])
        var flow = this.preBuiltUsecases[i].flow
        // set workflow to localstorage
        localStorage.setItem("workflow_to_nodered", JSON.stringify(flow));
        // this.router.navigate(['/runworkflow']);
        this.router.navigate(['/displayWorkflow']);
      }
    }
  }

  // display prebuilt use case item
  displayPrebuiltusecaseChange(values: any): void {
    console.log(values.currentTarget.checked);
    this.display_prebuiltUseCase = values.currentTarget.checked
  }

  // display my use case item
  displayMyusecaseChange(values: any): void {
    console.log(values.currentTarget.checked);
    this.display_myUseCase = values.currentTarget.checked
  }

  //pre-built use cases pin to home screen by click action
  // pinTpHomeScreenPreBuiltUsecase (event) {
  //   var idAttr = event.srcElement.attributes.id;
  //   var usecaseid = idAttr.nodeValue;
  //   this.pinToHomeArray = JSON.parse(localStorage.getItem("pinToHomeArray"))
  //   for (var i = 0; i < this.preBuiltUsecases.length; i++) {
  //     if (this.preBuiltUsecases[i]._id == usecaseid) {
  //       this.pinToHomeArray.push(this.preBuiltUsecases[i]) 
  //     }
  //   }
  //   console.log ("pre built use case flow",this.pinToHomeArray)
  //   localStorage.setItem("pinToHomeArray",JSON.stringify(this.pinToHomeArray))
  //   this.router.navigate(['home']);
  // }

  //pre-built use cases pin to home screen by onload
  pinTpHomeScreenPreBuiltUsecase() {
    console.log('all case component')
    this.pinToHomeArray = JSON.parse(localStorage.getItem("pinToHomeArray"))
    for (var i = 0; i < this.preBuiltUsecases.length; i++) {
      this.pinToHomeArray.push(this.preBuiltUsecases[i])
      console.log('all case component')
      this.pinToHomeArray = JSON.parse(localStorage.getItem("pinToHomeArray"))
      for (var i = 0; i < this.preBuiltUsecases.length; i++) {
        this.pinToHomeArray.push(this.preBuiltUsecases[i])
        console.log('all case component')
      }
      console.log("pre built use case flow", this.pinToHomeArray)
      localStorage.setItem("pinToHomeArray", JSON.stringify(this.pinToHomeArray))
    }
  }


  //my use cases pin to home screen
  pinTpHomeScreenMyUsecase(event) {
    var idAttr = event.srcElement.attributes.id;
    var usecaseid = idAttr.nodeValue;
    this.pinToHomeArray = JSON.parse(localStorage.getItem("pinToHomeArray"))
    for (var i = 0; i < this.mytUsecases.length; i++) {
      if (this.mytUsecases[i]._id == usecaseid) {
        this.pinToHomeArray.push(this.mytUsecases[i])
      }
    }
    console.log("pre built use case flow", this.pinToHomeArray)
    localStorage.setItem("pinToHomeArray", JSON.stringify(this.pinToHomeArray))
    this.router.navigate(['home']);
  }
}
