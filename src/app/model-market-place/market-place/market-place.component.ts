import { Component, OnInit, Input } from "@angular/core";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { ToastrService } from "@core/services";

import { ModelDataService } from "@shared/services/model-data.service";
import { MarketmodelDataService } from "@shared/services/marketplace-data.service";
import { environment } from '@env';
import * as request from "request";


@Component({
  selector: "app-market-place",
  templateUrl: "./market-place.component.html",
  styleUrls: ["./market-place.component.css"],
})
export class MarketPlaceComponent implements OnInit {
  searchText: string = "";
  modelData = [];
  showmarketdata = [];
  modelservice: MarketmodelDataService;
  masterSelected: boolean;
  checklist: any;
  marketshowdata:any
  checkedCount: number;
  checkedList: any;
  checkedStatus: string;
  config: any;
  checked = false;
 

  constructor(
    private modelDataService: ModelDataService,
    private modelService: MarketmodelDataService,
    private router: Router,
    private toastService: ToastrService
  ) {
    this.masterSelected = false;
  
    // this.getCheckedItemList();
    //this.getModelsData();
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
     // totalItems: this.checklist.length,
    };
  }

  ngOnInit(): void {
    // this.modelData = this.modelDataService.modelData;
    this.getModelsData();
  }

  isAllSelected() {
    this.masterSelected = this.checklist.every(function (item: any) {
      return item.trainable === true;
    });
     // this.getModelsData();
  //  this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.checkedList = [];
    for (var i = 0; i < this.checklist.length; i++) {
      var modelDescription = (this.checklist[i].model_description == undefined) ? '' : this.checklist[i].model_description;
      var ModelName = (this.checklist[i].model_name == undefined) ? this.checklist[i].original_model_name : this.checklist[i].model_name;
      if (this.checklist[i].trainable) {
        const data = {
          user_id: environment.testUserId,
          model_description: modelDescription,
          model_name: ModelName,
          original_model_name: this.checklist[i].original_model_name,
          trainable:this.checklist[i].trainable
        };
        this.checkedList.push(data);
        console.log("**************************trainable")
      }
      
    }
    console.log("picked model list",this.checkedList)
    this.checkedCount = this.checkedList.length;
  }

  modelCheckout() {
    console.log("picked model list",this.checkedList)
    this.modelDataService.selectedModels(this.checkedList).subscribe(
      (successResponse) => {
        console.log("SUCCESS", successResponse);
        this.router.navigate(["/model-list"]);
      },
      (errorResponse) => {
        console.log("ERROR", errorResponse);
      }
    );
  }

  pageChanged(event: any) {
    this.config.currentPage = event;
  }
  getModelsData() {
    this.modelService.showData().subscribe(( marketmodeldata : any) => {
      console.log("model data maket palce",marketmodeldata);
      this.marketshowdata = marketmodeldata;
    this.checklist=marketmodeldata.records;
    for (var i = 0; i < this.checklist.length; i++) {
      this.checklist[i].trainable = false;
    }
    });
  }
}
