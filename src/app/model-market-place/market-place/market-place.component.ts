import { Component, OnInit, Input } from "@angular/core";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { ToastrService } from "@core/services";
import { SpinnerService } from '@core'

import { ModelDataService } from "@shared/services/model-data.service";
import { MarketmodelDataService } from "@shared/services/marketplace-data.service";
import { environment } from '@env';
import * as request from "request";
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

declare var $: any;


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
  trainable_model:any;
  non_trainable_model:any;
  modelFormData:any;
  // showModelDetailPopup = false
  modelDetailsForm:FormGroup
  trainableCheckoutData = []
  nonTrainableCheckoutData = []
  checkedoutModelList :any
  spinnerActive = false;
  // modelCheckList:any
  isErrorAvailable = false
  errMessage = '';
  loggedUser:any

  constructor(
    private modelDataService: ModelDataService,
    private modelService: MarketmodelDataService,
    private router: Router,
    private toastService: ToastrService,
    private formBuilder: FormBuilder,
    private spinner: SpinnerService
  ) {
    this.masterSelected = false;
    this.config = {
      itemsPerPage: 6,
      currentPage: 1,
    };
   
  }

  ngOnInit(): void {
    this.loggedUser = localStorage.getItem('logedInUsername')
    this.getModelsData();
    
    //runWorkflowForm form validation
    this.modelDetailsForm = this.formBuilder.group({
      user_id:'',
      _id:'',
      model_name: '',
      model_description: '',
      original_model_name:'',
      trainable:'',
      prediction_params:'',
      training_params:''

    });
  }

  // modelCheckout() {
  //   // removed _id from checkedModelData array
  //   let checkoutModelList = this.checkedModelData.map(({_id,...rest}) => rest)
  //   console.log("checkoutModelList",checkoutModelList); 
    
  //   // api integration
  //   this.modelDataService.selectedModels(checkoutModelList).subscribe(
  //     (successResponse) => {
  //       console.log("SUCCESS", successResponse);
  //       this.router.navigate(["/model-list"]);
  //     },
  //     (errorResponse) => {
  //       console.log("ERROR", errorResponse);
  //     }
  //   );
  // }

  pageChanged_trainable_model(event: any) {
    this.config.currentPage = event;
  }
  pageChanged_nontrainable_model(event: any) {
    this.config.currentPage = event;
  }
  getModelsData() {
    this.spinnerActive = this.spinner.start() 
    this.modelService.showData().subscribe(( marketmodeldata : any) => {
      this.marketshowdata = marketmodeldata;
    this.checklist=marketmodeldata.records;
    console.log("model data maket palce",this.checklist);
    let trainable = [];
    let non_trainable = [];

    // new property added to picked the model
    for (var i = 0; i < this.checklist.length; i++) {
      this.checklist[i].checkedStatus = false;
      if (this.checklist[i].trainable === true){
        trainable.push(this.checklist[i]) 
      
      }
      else{
        non_trainable.push(this.checklist[i]) 
        
      }
    }
    this.trainable_model = trainable
    this.non_trainable_model = non_trainable
    this.isErrorAvailable = false;


     console.log ("trainable-model",this.trainable_model)
    console.log ("non-trainable-model",this.non_trainable_model)
    this.disableCheckBtnNonTrainableModel ();
    this.spinnerActive = this.spinner.stop() 


    },
    (errorResponse) => {
      this.isErrorAvailable = true;
      this.errMessage = 'Server Error, Please contact system administrator';
      this.spinnerActive = this.spinner.stop()
      console.log(errorResponse)
    });

  }

  /*************************checkout trainable mode***********************
   * ******************************************************************** */
            // display trainable model Details on popup
            pickTrainableModel(getData: object): void {
                  this.modelFormData = getData
                  this.modelDetailsForm.get('user_id').setValue(this.loggedUser);
                  this.modelDetailsForm.get('_id').setValue(this.modelFormData._id);
                  this.modelDetailsForm.get('model_name').setValue(this.modelFormData.original_model_name);
                  this.modelDetailsForm.get('model_description').setValue(this.modelFormData.model_description);
                  this.modelDetailsForm.get('original_model_name').setValue(this.modelFormData.original_model_name);
                  this.modelDetailsForm.get('trainable').setValue(this.modelFormData.trainable);
                  this.modelDetailsForm.get('prediction_params').setValue(this.modelFormData.prediction_params);
                  this.modelDetailsForm.get('training_params').setValue(this.modelFormData.training_params);
                  $("#displayModelDetails").modal("show");
                  console.log ("piched Data",getData)

            }

            // trainable model checkout
            trainableModelCheckout () {
                  this.trainableCheckoutData.push(this.modelDetailsForm.value)
                  // removed _id from checkedModelData array
                  let checkoutTrainableModelList = this.trainableCheckoutData.map(({_id,...rest}) => rest)
                  console.log("checkoutTrainableModelList",checkoutTrainableModelList); 
                  
                  // api integration
                  this.modelDataService.selectedModels(checkoutTrainableModelList).subscribe(
                    (successResponse) => {
                      console.log("SUCCESS", successResponse);
                      this.router.navigate(["/model-list"]);
                    },
                    (errorResponse) => {
                      console.log("ERROR", errorResponse);
                    }
                  );

                  $("#displayModelDetails").modal("hide"); 
            }

     /*********************************non trainable model checkout***************
      * ***************************************************************************** */  

          pickNontrainblekModel(getData: object): void {
                this.modelFormData = getData
                this.modelDetailsForm.get('user_id').setValue(this.loggedUser);
                this.modelDetailsForm.get('_id').setValue(this.modelFormData._id);
                this.modelDetailsForm.get('model_name').setValue(this.modelFormData.original_model_name);
                this.modelDetailsForm.get('model_description').setValue(this.modelFormData.model_description);
                this.modelDetailsForm.get('original_model_name').setValue(this.modelFormData.original_model_name);
                this.modelDetailsForm.get('trainable').setValue(this.modelFormData.trainable);
                this.modelDetailsForm.get('prediction_params').setValue(this.modelFormData.prediction_params);
                this.modelDetailsForm.get('training_params').setValue(this.modelFormData.training_params);

                // add non trainable mode data in array
                this.nonTrainableCheckoutData.push(this.modelDetailsForm.value)
                console.log ("non trainable model Data",this.nonTrainableCheckoutData)

                // change the status of non trainable model
                for (var i = 0; i < this.checklist.length; i++) {
                  if (this.checklist[i]._id === this.modelDetailsForm.value._id){
                      this.checklist[i].checkedStatus = true;
                  }
                  }
                  // checkcount status 
                  this.checkedCount = this.nonTrainableCheckoutData.length;
          }

            // unpick Nontrainable model
            unPickNontrainbleModel (getData: object) {
                for (var i = 0; i <  this.nonTrainableCheckoutData.length; i++) {
                  if ( getData['_id'] ===  this.nonTrainableCheckoutData[i]._id ) {
                    this.nonTrainableCheckoutData.splice(i, 1);
                  }
                }
                 // trainable model
                 for (var i = 0; i < this.non_trainable_model.length; i++) {
                    if (this.non_trainable_model[i]._id === getData['_id']) {
                      this.non_trainable_model[i].checkedStatus = false
                      console.log(this.non_trainable_model[i])
                    }
                } 
                console.log(" this.nonTrainableCheckoutData", this.nonTrainableCheckoutData)

              // checkcount status 
              this.checkedCount = this.nonTrainableCheckoutData.length;

              }

              nonTrainableModelCheckout () {
                // removed _id from checkedModelData array
                let checkoutNonTrainableModelList = this.nonTrainableCheckoutData.map(({_id,...rest}) => rest)
                console.log("checkoutTrainableModelList",checkoutNonTrainableModelList); 
                
                // api integration
                this.modelDataService.selectedModels(checkoutNonTrainableModelList).subscribe(
                  (successResponse) => {
                    console.log("SUCCESS", successResponse);
                    this.router.navigate(["/model-list"]);
                  },
                  (errorResponse) => {
                    console.log("ERROR", errorResponse);
                  }
                );
              }

      /*******************************************************************************
       **************** disable check button of nontrainable model*******************
       * ************************************************************************** */  
      disableCheckBtnNonTrainableModel () {
        this.spinnerActive = this.spinner.start() 

        // add property activeInChecklist
        for ( var i = 0; i < this.non_trainable_model.length; i++ ) {
          this.non_trainable_model[i].activeInChecklist = false
        }

         this.modelDataService.getModelList(this.loggedUser).subscribe((response: any) => {
              this.checkedoutModelList = response.records;
              for (var i = 0; i < this.non_trainable_model.length; i++) {
                 for (var j = 0; j < this.checkedoutModelList.length; j++) {
                           if (this.non_trainable_model[i].original_model_name == this.checkedoutModelList[j].original_model_name) {    
                            this.non_trainable_model[i].checkedStatus = true
                            this.non_trainable_model[i].activeInChecklist = true
                         }
                 }
              }  
           
          }
         )
        this.spinnerActive = this.spinner.stop()

      }      
  

 
}
