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



@Component({
  selector: 'app-all-use-case',
  templateUrl: './all-use-case.component.html',
  styleUrls: ['./all-use-case.component.css']
})
export class AllUseCaseComponent implements OnInit {

  usecaseList:any;
  usecaseID:any;
  
  constructor(private _caseStudyService: CaseStudyService, private router: Router,private toastService: ToastrService,private designWorkflowService: DesignWorkflowService) { 
  }

  ngOnInit(): void {
    this._caseStudyService.getAllUseCases().subscribe(resp => {
      this.usecaseList = resp.records;
      console.log('usecaseList',this.usecaseList)
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
