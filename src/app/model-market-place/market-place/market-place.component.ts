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

@Component({
  selector: "app-market-place",
  templateUrl: "./market-place.component.html",
  styleUrls: ["./market-place.component.css"],
})
export class MarketPlaceComponent implements OnInit {
  // jsonData = {
  //   name: "Document Classification API",

  //   request: {
  //     method: "POST",


  //     header: [],

  //     body: {
  //       mode: "formdata",

  //       formdata: [
  //         {
  //           key: "text",

  //           value:
  //             "Addendum No.1 To Master Services Agreement  This Addendum Number 1 (this  'Addendum ') is made and entered into as of July 2, 2012, by and between Wolters Kluwer United States, Inc. (  WKUS ) of 2700 Lake Cook Road, Riverwoods, Illinois 60015, U.S.A and Impelsys Inc, a New York corporation ( Service Provider ).  WHEREAS, the parties hereto have entered into a Master Consulting Services Agreement dated as of May 27, 2011 (the  Agreement  );",

  //           type: "text",
  //         },
  //       ],

  //       options: {
  //         raw: {
  //           language: "json",
  //         },
  //       },
  //     },

  //     url: {
  //       raw:
  //         "http://172.30.24.118:8080/api/DocumentClassification/predict_class",

  //       protocol: "http",

  //       host: ["172", "30", "24", "118"],

  //       port: "8080",

  //       path: ["api", "DocumentClassification", "predict_class"],
  //     },

    
  //   this.checklist =[{
  //       id:1,"model_name":"Text Summarization","model_description":"Text summarization refers to the technique of shortening long pieces of text. The intention is to create a coherent and fluent summary having only in the document.","original_model_name": "TextSummarization",isSelected:false, trainable: true
  //     },{
  //       id:2,"model_name":"Anomaly Detection","model_description":"Anomaly detection/ outlier analysis is a step-in data mining that identifies data points, events, and/or observations that deviate from a dataset's normal behavior.","original_model_name": "AnamolyDetection",isSelected:false, trainable: true
  //     },{
  //       id:3,"model_name":"Documents Classification","model_description":"The task is to assign a document to one or more classes or categories. An AI-based automated document classification and content extraction from different organizational documents","original_model_name": "DocumentClassification",isSelected:false, trainable: true
  //     },{
  //       id:4,"model_name":"Data Extraction","model_description":"Extract data from image/file using Tesseract, Tika & custom model","original_model_name": "Fourth Component",isSelected:false
  //     },{
  //       id:5,"model_name":"Table Extraction","model_description":"To extract tabular data from the image/document/pdf. Table extraction is useful in various areas. E.g. Personal use cases: - Scanning bills from the phone, documents to HTML","original_model_name": "Fifth Component",isSelected:false
  //     },{
  //       id:6,"model_name":"Sixth Component","model_description":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard","original_model_name": "Sixth Component",isSelected:false
  //     },{
  //       id:7,"model_name":"Seventh Component","model_description":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard","original_model_name": "Seventh Component",isSelected:false
  //     },{
  //       id:8,"model_name":"Eighth Component","model_description":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard","original_model_name": "Eight Component", isSelected:false
  //     },{
  //       id:9,"model_name":"Nineth Component","model_description":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard","original_model_name": "Nineth Component", isSelected:false
  //     },{
  //       id:10,"model_name":"Tenth Component","model_description":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard","original_model_name": "Tenth Component", isSelected:false
  //     },{
  //       id:11,"model_name":"Eleventh Component","model_description":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard","original_model_name": "Eleventh Component", isSelected:false
  //     },{
  //       id:12,"model_name":"Twelfth Component","model_description":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard","original_model_name": "Twelfth Component", isSelected:false
  //     },{
  //       id:13,"model_name":"Thirteenth Component","model_description":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard","original_model_name": "Thirteenth Component", isSelected:false
  //     },{
  //       id:14,"model_name":"Fourteenth Component","model_description":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard","original_model_name": "Fourteenth Component", isSelected:false
  //     },{
  //       id:15,"model_name":"Fifteenth Component","model_description":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard","original_model_name": "Fifteenth Component", isSelected:false
  //     }]


     
  //   },

  //   response: [],
  // };
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
   this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.checkedList = [];
    for (var i = 0; i < this.checklist.length; i++) {
      if (this.checklist[i].trainable) {
        const data = {
          user_id: "sachin",
          model_description: this.checklist[i].model_description,
          model_name: this.checklist[i].model_name,
          Ori_modelname: this.checklist[i].original_model_name,
        };
        this.checkedList.push(data);
      }
    }
    this.checkedCount = this.checkedList.length;
  }

  modelCheckout() {
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

  // getModelsData() {

  //   this.modelService.showData();
  //  console.log("data show");
  // }

  // getModelsData() {
  //   //this.showmarketdata = [];
  //   //console.log(this.showmarketdata);
  //   this.modelService.showData().subscribe((showmarketdata) => {
  //     console.log(this.showmarketdata);
  //     for (const d of this.showmarketdata) {
  //         this.showmarketdata.push({
  //         _id: d._id,
  //         original_model_name: d.original_model_name,
  //         docker_image_name: d.docker_image_name,
  //         docker_training_endpoint: d.docker_training_endpoint,
  //         docker_prediction_endpoint: d.docker_prediction_endpoint,
  //         trainable: d.trainable,
  //         container_model_map_path: d.container_model_map_path,
  //         training_params: d.training_params,
  //         prediction_params: d.prediction_params,
  //         created_date_time: d.created_date_time,
  //         updated_date_time: d.updated_date_time,
  //         request_json: d.request_json,
  //         response_json: d.response_json,
  //         model_description: d.model_description,
  //       });
  //     }
  //     console.log(this.modelData);
  //   });
  // }

  getModelsData() {
    this.modelService.showData()
    .subscribe(( marketmodeldata : any) => {
      console.log(marketmodeldata);
      this.marketshowdata = marketmodeldata;
    this.checklist=marketmodeldata.records;
    });
  }
}
