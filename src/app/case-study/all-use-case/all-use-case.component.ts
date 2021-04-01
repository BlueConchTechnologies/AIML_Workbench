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

@Component({
  selector: 'app-all-use-case',
  templateUrl: './all-use-case.component.html',
  styleUrls: ['./all-use-case.component.css']
})
export class AllUseCaseComponent implements OnInit {

  usecaseList:any;
  usecaseID:any;
  preBuiltUsecases:any;
  mytUsecases:any;
  spinnerActive = false;
  displayworkflowForm: FormGroup;
  display_prebuiltUseCase = true
  display_myUseCase = true
 pinToHomeArray = []
  constructor(private _caseStudyService: CaseStudyService, private router: Router,private designWorkflowService: DesignWorkflowService, private toastService: ToastrService, private spinner: SpinnerService,private formBuilder: FormBuilder) { 
  }

  ngOnInit(): void {
    // this._caseStudyService.getAllUseCases().subscribe(resp => {
    //   this.usecaseList = resp.records;
    //   console.log('usecaseList',this.usecaseList)
    // });
    this.displayworkflowForm = this.formBuilder.group({
      display_prebuiltUsecase: true,
      display_myUsecase: true
    })
    
    this.getPrebuiltUsecases()
    this.getMyUsecases()

    // set empty pinToHomeArray to localstorage
    // var pinToHomeArray = 
    if (JSON.parse(localStorage.getItem("pinToHomeArray")) == null) {
      var emptyArray = []
      localStorage.setItem("pinToHomeArray",JSON.stringify(emptyArray))
    }
    
  }


  getPrebuiltUsecases(){
    var preBuilt_usecaseId = "xpanxion"
    this.spinnerActive = this.spinner.start() 
    this._caseStudyService.getPrebuiltUseCases(preBuilt_usecaseId).subscribe(resp => {
      this.spinnerActive = this.spinner.stop()
      this.preBuiltUsecases = resp.records;
      console.log('preBuiltusecaseList',this.preBuiltUsecases)
    },
    (errorResponse) => {
      this.spinnerActive = this.spinner.stop()
      console.log(errorResponse)
    });
    
  }

  getMyUsecases(){
    var my_usecaseId = localStorage.getItem('logedInUsername')
    this.spinnerActive = this.spinner.start() 
    this._caseStudyService.getPrebuiltUseCases(my_usecaseId).subscribe(resp => {
      this.spinnerActive = this.spinner.stop()
      this.mytUsecases = resp.records;
      console.log('MyusecaseList',this.mytUsecases)
    },
    (errorResponse) => {
      this.spinnerActive = this.spinner.stop()
      console.log(errorResponse)
    });
  }

  createUseCase(){
    // set empty workflow to localstorage
    var workFlow = [{"id":"5750b22f.6cdecc","type":"tab","label":"Flow 1","disabled":false,"info":""}]
    localStorage.setItem("workflow_to_nodered",JSON.stringify (workFlow) );
    localStorage.setItem("usecaseId",null );
    this.router.navigate(['design-workflow']);

    // add empty flow to nodered
     var allSubflow = [{"id":"5750b22f.6cdecc","type":"tab","label":"Flow 1","disabled":false,"info":""}]
    this.designWorkflowService.createFlow(allSubflow).subscribe(data => {
    });

  }

  editPrebuiltUsecase(event): void {
    var idAttr = event.srcElement.attributes.id;
    this.usecaseID = idAttr.nodeValue;
    console.log('this.usecaseID',this.usecaseID)
    for (var i = 0; i < this.preBuiltUsecases.length; i++) {
      if (this.preBuiltUsecases[i]._id == this.usecaseID) {
        console.log ("use case flow",this.preBuiltUsecases[i])
        var flow = this.preBuiltUsecases[i].flow
        var usecaseUserId = this.preBuiltUsecases[i].user_id
        // set workflow to localstorage
        localStorage.setItem("usecaseId",this.usecaseID );
        localStorage.setItem('usecaseUserId',usecaseUserId)
        localStorage.setItem("workflow_to_nodered",JSON.stringify (flow) );
         // add flow to nodered
         this.designWorkflowService.createFlow(flow).subscribe(data => {
        });
        this.router.navigate(['design-workflow']); 
      }
    }
  };

  editMyUsecase (event): void{
    var idAttr = event.srcElement.attributes.id;
    this.usecaseID = idAttr.nodeValue;
    console.log('this.usecaseID',this.usecaseID)
    for (var i = 0; i < this.mytUsecases.length; i++) {
      if (this.mytUsecases[i]._id == this.usecaseID) {
        console.log ("use case flow",this.mytUsecases[i])
        var flow = this.mytUsecases[i].flow
        var usecaseUserId = this.mytUsecases[i].user_id
        // set workflow to localstorage
        localStorage.setItem("usecaseId",this.usecaseID );
        localStorage.setItem('usecaseUserId',usecaseUserId)
        localStorage.setItem("workflow_to_nodered",JSON.stringify (flow) );
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
  console.log('this.usecaseID',this.usecaseID)
  for (var i = 0; i < this.preBuiltUsecases.length; i++) {
    if (this.preBuiltUsecases[i]._id == this.usecaseID) {
      console.log ("use case flow",this.preBuiltUsecases[i])
      var flow = this.preBuiltUsecases[i].flow
      // set workflow to localstorage
      localStorage.setItem("workflow_to_nodered",JSON.stringify (flow) );
      // this.router.navigate(['/runworkflow']);
      this.router.navigate(['/displayWorkflow']);
    }
  }
 }

 runMyUsecase(event) {
  var idAttr = event.srcElement.attributes.id;
  this.usecaseID = idAttr.nodeValue;
  console.log('this.usecaseID',this.usecaseID)
  for (var i = 0; i < this.mytUsecases.length; i++) {
    if (this.mytUsecases[i]._id == this.usecaseID) {
      console.log ("use case flow",this.mytUsecases[i])
      var flow = this.mytUsecases[i].flow
      // set workflow to localstorage
      localStorage.setItem("workflow_to_nodered",JSON.stringify (flow) );
      // this.router.navigate(['/runworkflow']);
      this.router.navigate(['/displayWorkflow']);
    }
  }
 }

 // display prebuilt use case item
 displayPrebuiltusecaseChange(values:any):void {
  console.log(values.currentTarget.checked);
  this.display_prebuiltUseCase = values.currentTarget.checked
}

// display my use case item
displayMyusecaseChange(values:any):void {
  console.log(values.currentTarget.checked);
  this.display_myUseCase = values.currentTarget.checked
}

//pre-built use cases pin to home screen
pinTpHomeScreenPreBuiltUsecase (event) {
  var idAttr = event.srcElement.attributes.id;
  var usecaseid = idAttr.nodeValue;
  this.pinToHomeArray = JSON.parse(localStorage.getItem("pinToHomeArray"))
  for (var i = 0; i < this.preBuiltUsecases.length; i++) {
    if (this.preBuiltUsecases[i]._id == usecaseid) {
      this.pinToHomeArray.push(this.preBuiltUsecases[i]) 
    }
  }
  console.log ("pre built use case flow",this.pinToHomeArray)
  localStorage.setItem("pinToHomeArray",JSON.stringify(this.pinToHomeArray))
  this.router.navigate(['home']);
}

//my use cases pin to home screen
pinTpHomeScreenMyUsecase (event) {
  var idAttr = event.srcElement.attributes.id;
  var usecaseid = idAttr.nodeValue;
  this.pinToHomeArray = JSON.parse(localStorage.getItem("pinToHomeArray"))
  for (var i = 0; i < this.mytUsecases.length; i++) {
    if (this.mytUsecases[i]._id == usecaseid) { 
      this.pinToHomeArray.push(this.mytUsecases[i]) 
    }
  }
  console.log ("pre built use case flow",this.pinToHomeArray)
  localStorage.setItem("pinToHomeArray",JSON.stringify(this.pinToHomeArray))
  this.router.navigate(['home']);
}
 
 
}
