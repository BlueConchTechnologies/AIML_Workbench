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
  constructor(private _caseStudyService: CaseStudyService, private router: Router,private designWorkflowService: DesignWorkflowService, private toastService: ToastrService, private spinner: SpinnerService) { 
  }

  ngOnInit(): void {
    // this._caseStudyService.getAllUseCases().subscribe(resp => {
    //   this.usecaseList = resp.records;
    //   console.log('usecaseList',this.usecaseList)
    // });
    
    this.getPrebuiltUsecases()
    this.getMyUsecases()
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
      console.log(errorResponse)
    });
  }

  createUseCase(){
    // set empty workflow to localstorage
    var workFlow = [{"id":"5750b22f.6cdecc","type":"tab","label":"Flow 1","disabled":false,"info":""}]
    localStorage.setItem("workflow_to_nodered",JSON.stringify (workFlow) );
    this.router.navigate(['design-workflow']);

    // add empty flow to nodered
     var allSubflow = [{"id":"5750b22f.6cdecc","type":"tab","label":"Flow 1","disabled":false,"info":""}]
    this.designWorkflowService.createFlow(allSubflow).subscribe(data => {
    });

  }

  editUsecase(event): void {
    console.log("*************************")
    var idAttr = event.srcElement.attributes.id;
    this.usecaseID = idAttr.nodeValue;
    // this.usecaseID = id;
    window.localStorage.removeItem("usecaseID");
    window.localStorage.setItem("usecaseID", this.usecaseID);
    // this.router.navigate(['create-usecase']);
    this.router.navigate(['design-workflow']);
    console.log('this.usecaseID',this.usecaseID)
  };

 

}
