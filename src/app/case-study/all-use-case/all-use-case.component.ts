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

  // editPrebuiltUsecase(event): void {
  //   var idAttr = event.srcElement.attributes.id;
  //   this.usecaseID = idAttr.nodeValue;
  //   console.log('this.usecaseID',this.usecaseID)
  //   for (var i = 0; i < this.preBuiltUsecases.length; i++) {
  //     if (this.preBuiltUsecases[i]._id == this.usecaseID) {
  //       console.log ("use case flow",this.preBuiltUsecases[i])
  //       var flow = this.preBuiltUsecases[i].flow
  //       var usecaseUserId = this.preBuiltUsecases[i].user_id
  //       // set workflow to localstorage
  //       localStorage.setItem("usecaseId",this.usecaseID );
  //       localStorage.setItem('usecaseUserId',usecaseUserId)
  //       localStorage.setItem("workflow_to_nodered",JSON.stringify (flow) );
  //        // add flow to nodered
  //        this.designWorkflowService.createFlow(flow).subscribe(data => {
  //       });
  //       this.router.navigate(['design-workflow']); 
  //     }
  //   }
  // };

  editPrebuiltUsecase(event): void {
    var idAttr = event.srcElement.attributes.id;
    this.usecaseID = idAttr.nodeValue;

    console.log('this.usecaseID', this.usecaseID)
    for (var i = 0; i < this.preBuiltUsecases.length; i++) {
      if (this.preBuiltUsecases[i]._id == this.usecaseID) {
        console.log("use case flow", this.preBuiltUsecases[i])
        var flow = this.preBuiltUsecases[i].flow
        var usecaseUserId = this.preBuiltUsecases[i].user_id


        // set workflow to localstorage
        localStorage.setItem("usecaseId", this.usecaseID);
        localStorage.setItem('usecaseUserId', usecaseUserId)
        localStorage.setItem("workflow_to_nodered", JSON.stringify(flow));
        // add flow to nodered
      }
    }
    // for (let i = 0; i < flow.length; i++) {
    //   for (var j = 0; j < this.mytUsecases.length; j++) {
    //     if (this.mytUsecases[j]._id === flow[i].trainingTracker_id && flow[i].trainingTracker_id === undefined) {
    //       console.log("ok.................")
    //     } else {
    // this.modelDataService.getModelDetail(flow[i].trainingTracker_id).subscribe(
    //   (response: any) => {
    //     console.log("sajdf asdjfh.............", response)
    //   },
    //   (errorResponse) => {
    //   });

    //     }
    //   }
    // }
    if (this.mytUsecases !== undefined) {
      for (let i = 0; i < this.mytUsecases.length; i++) {
        this.mytUsecasesId.push(this.mytUsecases[i]._id)
      }
    }
    console.log("my usecase id = ", this.mytUsecasesId)

    for (let i = 0; i < flow.length; i++) {
      if (this.mytUsecasesId.includes('flow[i].trainingTracker_id')) {
        console.log("ok....")
      } else {
        console.log("trin id ================== ", flow[i].trainingTracker_id)
        if (flow[i].trainingTracker_id !== undefined) {
          this.modelDataService.getModelData(flow[i].trainingTracker_id).subscribe(
            (response: any) => {
              this.result = response.records;
              console.log("*****************", this.result)
              
            },
            (errorResponse) => {
            });
        }
      }
    }

    this.designWorkflowService.createFlow(flow).subscribe(data => {
    });
    this.router.navigate(['design-workflow']);
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

  runMyUsecase(event) {
    var idAttr = event.srcElement.attributes.id;
    this.usecaseID = idAttr.nodeValue;
    console.log('this.usecaseID', this.usecaseID)
    for (var i = 0; i < this.mytUsecases.length; i++) {
      if (this.mytUsecases[i]._id == this.usecaseID) {
        console.log("use case flow", this.mytUsecases[i])
        var flow = this.mytUsecases[i].flow
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
    }
    console.log("pre built use case flow", this.pinToHomeArray)
    localStorage.setItem("pinToHomeArray", JSON.stringify(this.pinToHomeArray))
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
