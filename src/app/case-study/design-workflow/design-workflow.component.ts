import { Component, OnInit } from '@angular/core';
import { NodeRedConstants } from '../../../core-module/infrastructure/node-red-contant';
import { ToastrService } from '@core/services';
import { ToastrCode } from '@core';
import { DesignWorkflowService } from '../services/design-workflow.service';
import { environment } from '@env';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-design-workflow',
  templateUrl: './design-workflow.component.html',
  styleUrls: ['./design-workflow.component.css']
})
export class DesignWorkflowComponent implements OnInit {

  nodeRedConstant = NodeRedConstants;
  nodeRedUrl = environment.nodeRedUrl;
  useCaseData: any = {};
  url: string = environment.nodeRedUrl;
  urlSafe: SafeResourceUrl;

  constructor(private designWorkflowService: DesignWorkflowService, private toastService: ToastrService,
    private router: Router, private dataRoute: ActivatedRoute, public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.createNode();
    const data = history.state;
    this.useCaseData = data[0];
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
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
}
