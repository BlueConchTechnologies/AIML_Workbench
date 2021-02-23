import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from '@core/services';
import { CaseStudyService } from '../services/case-study.service';
import { ToastrCode, SpinnerService } from '@core';
import { DOCUMENT } from '@angular/common';
import { DesignWorkflowService } from '../services/design-workflow.service';



@Component({
  selector: 'app-runworkflow',
  templateUrl: './runworkflow.component.html',
  styleUrls: ['./runworkflow.component.css']
})
export class RunworkflowComponent implements OnInit {
  [x: string]: any;
  // workflow_name :any;
  constructor(private _caseStudyService: CaseStudyService, private router: Router, private toastService: ToastrService, private spinner: SpinnerService, private formBuilder: FormBuilder,private designWorkflowService: DesignWorkflowService) { }
  workflow_data: any;
  workFlowName:any
  Output_result: any;
  spinnerActive = false;
  display_workflowForm_1 = false;
  display_workflowForm_2 = false;
  display_workflowForm_3 = false;
  display_workflowForm_4 = false;
  display_workflowForm_5 = false;
  display_workflowForm_6 = false;
  display_workflowForm_7 = false;
  display_workflowForm_8 = false;
  display_workflowForm_9 = false;
  runWorkflowForm:FormGroup
  workflowForm_1: FormGroup;
  workflowForm_2: FormGroup;
  workflowForm_3: FormGroup;
  workflowForm_4: FormGroup;
  workflowForm_5: FormGroup;
  workflowForm_6: FormGroup;
  workflowForm_7: FormGroup;
  workflowForm_8: FormGroup;
  workflowForm_9: FormGroup;
  fileToUpload: File = null;
  trainTrackerIdLength = 0
  FirstModelTrainTrackerId:any;
  SecondModelTrainTrackerId:any;
  input_fields_prediction_arr:any;
  firstModel_type:any;


  ngOnInit(): void {
    this.getWorkflowData ()

    this.runWorkflowForm = this.formBuilder.group({
      name: '',
      description:''
    })

    //1] TermsExtraction,2] VoiceClassification, 3]SpeakerDiarization, 4]TextExtraction, 5]InvoiceExtraction,6] InstanceSegmentation,7] VideoAnalytics,8] ObjectDetection, 9]TableExtractor
    this.workflowForm_1 = this.formBuilder.group({
      file: '',
    })

    // 10]Classification ,11]AnamolyDetection
    this.workflowForm_2 = this.formBuilder.group({
      algorithmname: '',
      file: ''
    })

    //12] DocumentClassification
    this.workflowForm_3 = this.formBuilder.group({
      text: '',
    })

    //13] TimeSeries 
    this.workflowForm_4 = this.formBuilder.group({
      algorithmname: '',
      number_of_indexes: ''
    })

    //14] TextSummarization   
    this.workflowForm_5 = this.formBuilder.group({
      text: '',
      ratio:'',
      type_of_summary:''
    })

    // 15]SentimentClassification 
    this.workflowForm_6 = this.formBuilder.group({
      input_text: '',
    })

    //16] QNA-KB 
    this.workflowForm_7 = this.formBuilder.group({
        question:'',
         kb_id:'',
         top_n:''
    })

    //17] TicketClassification 
    this.workflowForm_8 = this.formBuilder.group({
      question:'',
      org:'',
     top_n:''
    })

    //18] NER 
    this.workflowForm_9 = this.formBuilder.group({
      query:'',
      file: ''
    })

  }


/****************************************************************************************************
 *  ********************************************** Get type of data in flow****************************** */

  // get workflowdata from nodered
  getWorkflowData () {
    // get workflowdata from nodered
    this.workflow_data = JSON.parse(localStorage.getItem('workflow_to_nodered'));
    console.log('workflow_data', this.workflow_data);

    // set workflowname to UI
    this.workFlowName = this.workflow_data[0]['label']

    // get trainingrackerId from nodered flow data
    var wire_data;

    for (var i = 0; i < this.workflow_data.length; i++) {
        this.trainTrackerIdLength = this.workflow_data.length - 1

        // get traintrackerId for model and check the wire connected node
          if (this.trainTrackerIdLength <= 1) {
            this.FirstModelTrainTrackerId = this.workflow_data[1].trainingTracker_id  
            this.firstModel_type =  this.workflow_data[1].type 
          } 
          else if (this.workflow_data[i].wires != null) {
              if (this.workflow_data[i].wires[0].length == 0) {
                this.SecondModelTrainTrackerId = this.workflow_data[i].trainingTracker_id   

              }
              else{
                this.FirstModelTrainTrackerId = this.workflow_data[i].trainingTracker_id
                this.firstModel_type =  this.workflow_data[i].type   

              }
          } 
    }
    this.displayFormByModelname ()
  }

  // upload file 
  uploadFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload )
}


//************************************** data assign to workflow***********************
//*********************************************************************************** */ */
// TermsExtraction, VoiceClassification, SpeakerDiarization, TextExtraction, InvoiceExtraction, InstanceSegmentation, VideoAnalytics, ObjectDetection, TableExtractor
runYourWorkflow_1() {
         const formData = new FormData();
          formData.append('trainingTracker_id', this.FirstModelTrainTrackerId);
          formData.append('file', this.fileToUpload);
          this.runworkflowCallApi(formData) 

          console.log("flow 1 works")
          formData.forEach((value,key) => {
           console.log("formdata_new",key+" "+value)
            });
}

// Classification ,AnamolyDetection
runYourWorkflow_2() {
  const formData = new FormData();
   formData.append('trainingTracker_id', this.FirstModelTrainTrackerId);
   formData.append('algorithmname', this.workflowForm_2.value.algorithmname);
   formData.append('file', this.fileToUpload);
   this.runworkflowCallApi(formData) 

   console.log("flow 2 works")
   formData.forEach((value,key) => {
    console.log("formdata_new",key+" "+value)
     });       
}

// DocumentClassification
runYourWorkflow_3() {
  const formData = new FormData();
   formData.append('trainingTracker_id', this.FirstModelTrainTrackerId);
   formData.append('text',this.workflowForm_3.value.text);
   this.runworkflowCallApi(formData) 

   console.log("flow 3 works")
   formData.forEach((value,key) => {
    console.log("formdata_new",key+" "+value)
     });   
}

// TimeSeries 
runYourWorkflow_4() {
  const formData = new FormData();
   formData.append('trainingTracker_id', this.FirstModelTrainTrackerId);
   formData.append('algorithmname',this.workflowForm_4.value.algorithmname);
   formData.append('number_of_indexes',this.workflowForm_4.value.number_of_indexes);
   this.runworkflowCallApi(formData) 

   console.log("flow 4 works")
   formData.forEach((value,key) => {
    console.log("formdata_new",key+" "+value)
     });   
}

// TextSummarization 
runYourWorkflow_5() {
  const formData = new FormData();
   formData.append('trainingTracker_id', this.FirstModelTrainTrackerId);
   formData.append('text',this.workflowForm_5.value.text);
   formData.append('ratio',this.workflowForm_5.value.ratio);
   formData.append('type_of_summary',this.workflowForm_5.value.type_of_summary);
   this.runworkflowCallApi(formData) 

   console.log("flow 5 works")
   formData.forEach((value,key) => {
    console.log("formdata_new",key+" "+value)
     });   
}

// SentimentClassification 
runYourWorkflow_6() {
  const formData = new FormData();
   formData.append('trainingTracker_id', this.FirstModelTrainTrackerId);
   formData.append('input_text',this.workflowForm_6.value.input_text);
   this.runworkflowCallApi(formData) 

   console.log("flow 6 works")
   formData.forEach((value,key) => {
    console.log("formdata_new",key+" "+value)
     });   
}

 // QNA-KB 
runYourWorkflow_7() {
  const formData = new FormData();
   formData.append('trainingTracker_id', this.FirstModelTrainTrackerId);
   formData.append('question',this.workflowForm_7.value.question);
   formData.append('kb_id',this.workflowForm_7.value.kb_id);
   formData.append('top_n',this.workflowForm_7.value.top_n);
   this.runworkflowCallApi(formData) 

   console.log("flow 7 works")
   formData.forEach((value,key) => {
    console.log("formdata_new",key+" "+value)
     });   
}

 // TicketClassification 
runYourWorkflow_8() {
  const formData = new FormData();
   formData.append('trainingTracker_id', this.FirstModelTrainTrackerId);
   formData.append('question',this.workflowForm_8.value.question);
   formData.append('org',this.workflowForm_8.value.org);
   formData.append('top_n',this.workflowForm_8.value.top_n);
   this.runworkflowCallApi(formData) 

   console.log("flow 8 works")
   formData.forEach((value,key) => {
    console.log("formdata_new",key+" "+value)
     });   
}

 // NER 
runYourWorkflow_9() {
  const formData = new FormData();
   formData.append('trainingTracker_id', this.FirstModelTrainTrackerId);
   formData.append('query',this.workflowForm_9.value.query);
   formData.append('file', this.fileToUpload);
   this.runworkflowCallApi(formData) 

   console.log("flow 8 works")
   formData.forEach((value,key) => {
    console.log("formdata_new",key+" "+value)
     });   
}


    //*********************************** */ for one traintrackerId*****************
  // *************************************************************************************//*

  runworkflowCallApi(formData){ 
   
     this.spinnerActive = this.spinner.start();
     this._caseStudyService.runWorkflow(formData)
       .subscribe(
         (successResponse) => {
           const respData = successResponse;
           console.log('successResponse', successResponse)
           if (this.trainTrackerIdLength <= 1) {
           this.Output_result = successResponse
           console.log('this.Output_result',this.Output_result)
           this.toastService.showSuccess(ToastrCode.FlowRunSuccess);
 
           // patch the empty value to from control
           this.runWorkflowForm.patchValue({
             textField: '',
             textArea: '',
             file: ''
           });
 
           this.spinnerActive = this.spinner.stop()
          }
          else{
            this.secondFlow(successResponse.response.text)
          }
         },
         (errorResponse) => {
           this.toastService.showError('Something went wrong');
           console.log('ERROR', errorResponse);
           this.spinnerActive = this.spinner.stop()
 
         });
    
  }

  //*********************************** */ for two traintrackerId*****************
  // *************************************************************************************//*
 //  second flow 
  secondFlow(firstflowResponse) {
       const formData_new = new FormData();
       formData_new.append('trainingTracker_id', this.SecondModelTrainTrackerId);
       formData_new.append('text', firstflowResponse);
       this._caseStudyService.runWorkflow(formData_new)
      .subscribe(
        (successResponse) => {
          this.Output_result = successResponse
          this.toastService.showSuccess(ToastrCode.FlowRunSuccess);
          this.spinnerActive = this.spinner.stop()
        },
        (errorResponse) => {
          this.toastService.showError('Something went wrong');
          console.log('ERROR', errorResponse);
          this.spinnerActive = this.spinner.stop()

        });
  }

 

 /*******************************************************************************************
 ****************************** General section********************************************** */
      displayFormByModelname () {
        console.log('this.firstModel_type',this.firstModel_type)
        if (this.firstModel_type == 'TermsExtraction' || this.firstModel_type == 'VoiceClassification' || this.firstModel_type == 'SpeakerDiarization' 
        || this.firstModel_type == 'TextExtraction'  || this.firstModel_type == 'InvoiceExtraction' || this.firstModel_type == 'InstanceSegmentation' 
        || this.firstModel_type == 'VideoAnalytics' || this.firstModel_type == 'ObjectDetection'   || this.firstModel_type == 'TableExtractor'
        ) {
          this.display_workflowForm_1 = true
        }
        else if (this.firstModel_type == 'Classification' || this.firstModel_type == 'AnamolyDetection' ) {
          this.display_workflowForm_2 = true
        }
        else if (this.firstModel_type == 'DocumentClassification' ) {
          this.display_workflowForm_3 = true
        }
        else if (this.firstModel_type == 'TimeSeries' ) {
          this.display_workflowForm_4 = true
        }
        else if (this.firstModel_type == 'TextSummarization' ) {
          this.display_workflowForm_5 = true
        }
        else if (this.firstModel_type == 'SentimentClassification') {
          this.display_workflowForm_6 = true
        }
        else if (this.firstModel_type == 'QNA-KB' ) {
          this.display_workflowForm_7 = true
        }
        else if (this.firstModel_type == 'TicketClassification' ) {
          this.display_workflowForm_8 = true
        }
        else if (this.firstModel_type == 'NER' ) {
          this.display_workflowForm_9 = true
        }
      }

      editCurrentWorkflow(){
      // add previous flow
      var allSubflow =  localStorage.getItem("workflow_to_nodered");
        this.designWorkflowService.createFlow(allSubflow).subscribe(data => {
        });
        this.router.navigate(['/design-workflow']);
      }
}
